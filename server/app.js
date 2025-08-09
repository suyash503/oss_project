const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios'); // Ensure axios is installed (npm install axios)

// Load environment variables from .env file
dotenv.config();

// Log API Key status for debugging
console.log("API Key:", process.env.OPENROUTER_API_KEY ? "Loaded ✅" : "❌ Missing. Please set OPENROUTER_API_KEY in your .env file.");

const app = express();

// Enable CORS for all origins (you might want to restrict this in production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Chat endpoint
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        console.log("Incoming message from client:", message);

        // --- Start of added/modified validation and error handling ---

        // 1. Validate API Key presence before making the external call
        if (!process.env.OPENROUTER_API_KEY) {
            console.error("Configuration Error: OPENROUTER_API_KEY is not defined in .env.");
            return res.status(500).json({ error: "Server configuration error: AI service API key is missing." });
        }

        // Validate incoming message: check if it's a non-empty string
        if (typeof message !== "string" || message.trim() === "") {
            return res.status(400).json({ error: "Invalid message: request body must contain a non-empty 'message' string." });
        }

        // Make the POST request to OpenRouter API
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "gpt-4o-mini", // Correct model name, good!
                messages: [
                    { role: "system", content: "You are a helpful AI assistant." },
                    { role: "user", content: message }
                ]
            },
            {
                headers: {
                    // Authorization header with Bearer token from environment variable
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json" // Specify content type
                }
            }
        );

        // Safely access the reply content using optional chaining
        // This prevents errors if 'choices', '0', or 'message' are undefined/null
        const replyContent = response.data?.choices?.[0]?.message?.content;

        // Check if the reply content was successfully extracted
        if (replyContent === undefined || replyContent === null) {
            console.error("OpenRouter API returned an unexpected structure or empty content:", JSON.stringify(response.data, null, 2));
            return res.status(500).json({ error: "Failed to get a valid reply from the AI service. Unexpected response format." });
        }

        // Send the extracted reply back to the client
        res.json({ reply: replyContent });

    } catch (error) {
        // --- Enhanced error handling for different Axios error types ---
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("OpenRouter API Error (Response received):", error.response.status, error.response.statusText);
            console.error("Error details:", JSON.stringify(error.response.data, null, 2));
            // Forward OpenRouter's specific error details to the client for better debugging
            res.status(error.response.status).json({
                error: error.response.data.error || "OpenRouter API request failed",
                details: error.response.data // Provide full details for debugging on client side
            });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an http.ClientRequest in node.js
            console.error("Network Error (No response from API):", error.message);
            res.status(503).json({ error: "Could not reach the AI service. Please check your network connection or try again later.", details: error.message });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request Setup Error:", error.message);
            res.status(500).json({ error: "An unexpected error occurred on the server while setting up the request.", details: error.message });
        }
    }
});

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

