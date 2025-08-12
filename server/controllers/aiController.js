// C:\Users\Suyash Singh\Documents\oss_project\server\controllers\aiController.js

const { callOpenRouter } = require('../services/openRouter');
const logger = require('../utils/logger');

// FIX: This is the single, complete, and exported controller function.
exports.chatController = async (req, res) => {
    const { message } = req.body;

    // FIX: Proper validation that returns an error response.
    if (typeof message !== "string" || message.trim() === "") {
        logger.warn("Invalid message received: not a non-empty string");
        return res.status(400).json({ error: "Message must be a non-empty string." });
    }

    logger.info("Processing message with AI:", { message });

    // FIX: A try...catch block to handle errors from the service layer.
    try {
        const reply = await callOpenRouter(message);
        res.json({ reply: reply });
    } catch (error) {
        logger.error("Failed to get AI response", { errorMessage: error.message });
        res.status(500).json({ error: 'Failed to communicate with the AI service.' });
    }
};