// C:\Users\Suyash Singh\Documents\oss_project\server\services\openRouter.js

const axios = require('axios');

exports.callOpenRouter = async (prompt) => {
    // FIX: Added a try...catch block to handle API or network errors.
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                // FIX: You can move this model to a .env variable for easier configuration.
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // FIX: Use optional chaining to prevent crashes on unexpected API responses.
        const reply = res.data?.choices?.[0]?.message?.content;

        if (!reply) {
            // FIX: If we get a 200 OK response but no content, throw an error.
            throw new Error("Received an empty or invalid reply from the AI service.");
        }

        return reply;

    } catch (error) {
        // Log the detailed error and re-throw it so the controller can handle it.
        console.error("Error in callOpenRouter service:", error.message);
        throw error; // This is important!
    }
};