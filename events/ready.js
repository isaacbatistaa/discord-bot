const { Events } = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Estou logado como ${client.user.tag}`)
    }
}
