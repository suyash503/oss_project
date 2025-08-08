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
                Authorization: `Bearer ${process.env.sk - or - v1 - b7aab61449f4b4a0412f87f43cf413750c738c92f51ff1de225921150906935f}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return res.data.choices[0].message.content;

}