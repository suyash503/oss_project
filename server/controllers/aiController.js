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