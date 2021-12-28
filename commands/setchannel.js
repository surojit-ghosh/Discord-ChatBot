export default {
    name: 'setchannel',
    usage: 'setchannel <channel>',
    aliases: ['sc'],
    description: 'Set the chat bot channel',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({
            content: '❌ | You need `ADMINISTRATOR` permission to run this command',
            allowedMentions: { repliedUser: false }
        });
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply({
            content: '❌ | Please provide the channel. Use: `' + client.config.prefix + 'setchannel <channel>`',
            allowedMentions: { repliedUser: false }
        });
        client.db.set(`channel_${message.guild.id}`, channel.id);
        return message.reply({
            content: '✅ | Successfully set <#' + channel.id + '> for chatbot',
            allowedMentions: { repliedUser: false }
        });
    }
}