const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Informações do server'),
    async execute(interaction) {
        await interaction.reply(`O server se chama: ${interaction.guild.name} e tem ${interaction.guild.memberCount} membros`)
    }
}
