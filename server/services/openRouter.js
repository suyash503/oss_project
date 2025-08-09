const axios = require('axios');

exports.callOpenRouter = async (prompt) => {
    const res = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            model: "mistral/mistral-7b-instruct",
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return res.data.choices[0].message.content;

}