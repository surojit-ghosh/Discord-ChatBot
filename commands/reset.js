export default {
    name: 'reset',
    usage: 'reset',
    aliases: ['delete'],
    description: 'Delete chat bot schannel',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({
            content: '❌ | You need `ADMINISTRATOR` permission to run this command',
            allowedMentions: { repliedUser: false }
        });
        client.db.delete(`channel_${message.guild.id}`);
        return message.reply({
            content: '✅ | Successfully reset chatbot settings',
            allowedMentions: { repliedUser: false }
        });
    }
}