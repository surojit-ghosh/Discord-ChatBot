import { Client, Collection } from 'discord.js';
const client = new Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] });
import config from './config.js';
import db from 'quick.db';
import express from 'express';
const app = express();
import chalk from 'chalk';
import { readdirSync } from 'fs';
import axios from 'axios';

client.commands = new Collection();
client.aliases = new Collection();
client.config = config;
client.db = db;

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
            content: response.data.cnt
        });
    }).catch((error) => {
        return message.reply({
            content: 'I can\'t response to your message right now'
        });
    });
}

const commands = readdirSync('./commands');
commands.forEach((file) => {
    import(`./commands/${file}`).then((command) => {
        let cmd = command.default;
        cmd.name = cmd.name || file.replace('.js', '');
        if (!cmd.run) return console.log(chalk.redBright(`Unable to load - ${file}! For support join - https://discord.gg/bN6ACTdWTY`));
        else {
            client.commands.set(cmd.name, cmd);
            console.log(chalk.greenBright('Successfully loaded command - ' + file));
        }
        if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    });
});

client.on('ready', async () => {
    console.log(chalk.greenBright(client.user.username + ' is ready! For support join - https://discord.gg/bN6ACTdWTY'));
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild || message.webhookId) return;
    let channel = await db.get(`channel_${message.guild.id}`);
    if (!message.content.startsWith(config.prefix) && channel && message.channel.id == channel) await AIchat(message);
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message);

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command) command.run(client, message, args);
});

client.login(config.token).catch(() => console.log(chalk.redBright(`Error - Invalid Token! For support join - https://discord.gg/bN6ACTdWTY`)));

app.get('/', (req, res) => res.send('Hosting is ready! For support join - https://discord.gg/bN6ACTdWTY'));
app.listen((3000), () => console.log(chalk.greenBright('Hosting is Ready! For support join - https://discord.gg/bN6ACTdWTY')));