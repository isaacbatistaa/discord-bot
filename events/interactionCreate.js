const { Events, Collection } = require('discord.js')
//const { Collection } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return
        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            console.error(`Comando ${interaction.commandName} nao encontrado`)
            return
        }

        const { cooldowns } = interaction.client

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection())
        }

        const now = Date.now()
        const timestamps = cooldowns.get(command.data.name)
        const defaultCooldownDuration = 3
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000)
                return interaction.reply({ content: `Voce precisa <t:${expiredTimestamp}:R> esperar para usar \`${command.data.name}\` novamente`, ephemeral: true })
            }
        }
        
        timestamps.set(interaction.user.id, now)
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true})
            } else {
                await interaction.reply({ content: 'Ocorreu um erro ao executar este comando', ephemeral: true})
            }
        }
    }
}