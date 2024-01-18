const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Manda foto de um gato.'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search')
            const data = response.data[0].url
            await interaction.reply(data)
        } catch {
            console.error('Erro ao acessar a API', error)
            await interaction.reply('Erro ao acessar a API.')
        }
    }
}
