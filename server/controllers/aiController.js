const { callOpenRouter } = require('../services/openRouter');

exports.getAIResponse = async (requestAnimationFrame, res) => {
    const { prompt } = req.body;
    try {
        const response = await callOpenRouter(prompt);
        res.json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
const openRouterService = require('../services/openRouter');
const logger = require('../utils/logger');

async function chatController(req, res) {

const {message} = req.body;
    logger.info("incoming message for ai processing:", { message });

    if(typeof message !== "string" || message.trim() === ""){
        logger.warn("invalid message received: not a non empty string"))
})