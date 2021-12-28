import axios from 'axios';

const AIchat = async (message) => {
    if (!message.content) return `I can only response to messages`;
    let options = {
        method: 'GET',
        url: 'https://acobot-brainshop-ai-v1.p.rapidapi.com/get',
        params: { bid: '178', key: 'sX5A2PcYZbsN5EY6', uid: 'mashape', msg: message.content },
        headers: {
            'x-rapidapi-host': 'acobot-brainshop-ai-v1.p.rapidapi.com',
            'x-rapidapi-key': 'd618d9259amshf1a2b9c8aec2f3cp1d2fc0jsn2fbc3a353a10'
        }
    };
    await axios.request(options).then((response) => {
        return message.reply({
            content: response.data.cnt,
            allowedMentions: { repliedUser: false }
        });
    }).catch((error) => {
        return message.reply({
            content: 'I can\'t response to your message right now',
            allowedMentions: { repliedUser: false }
        });
    });
}

export default AIchat;