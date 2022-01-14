import { MessageEmbed } from 'discord.js';

export default {
    name: 'help',
    usage: 'help',
    aliases: ['h'],
    description: 'Show all avalable commands',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
            .setColor('00FFFF')
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription('Commands list of `' + client.user.username + '`. Prefix: `' + client.config.prefix + '`')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }));

        let commands = client.commands.map((cmd) => cmd);

        [...commands].forEach((c) => {
            embed.addField(client.config.prefix + c.name, '```\n' + c.description + '\n```')
        });

        message.reply({ embeds: [embed] });
    }
}