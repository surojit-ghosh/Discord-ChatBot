import dotenv from 'dotenv';
dotenv.config();

export default {
    token: process.env.token || 'TOKEN',
    prefix: 'PREFIX'
}
