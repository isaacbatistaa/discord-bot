const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('clear')
            .setDescription('Apaga as mensagens'),
        async execute(interaction) {
            const channel = interaction.channel
            channel.messages.fetch({ limit:100 })
                .then(messages => {
                    channel.bulkDelete(messages)
                })
                .catch(error => console.error('Erro ao apagar mensagens:', error))
            await interaction.reply('Apagou')
        }
}