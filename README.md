<h1 align="center">Chatbot for Discord Servers</h1>
<p align="center">This is an open source a chat bot for discord servers. This bot is using Discord.js v13 and <a href="https://brainshop.ai">Brainshop</a>. Give this repo a ⭐ if you like it</p>

<br>

### Change 
```js
import dotenv from 'dotenv';
dotenv.config();

export default {
    token: process.env.token || 'TOKEN'
    prefix: 'PREFIX'
}
```

```
npm init -y && npm i --save-dev node@16.6.0 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
```
