const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Providencia informações do usuario'),
    async execute(interaction) {
        await interaction.reply(`Comando executado por ${interaction.user.username}, que entrou no derver dia ${interaction.member.joinedAt}`)
    }
}
