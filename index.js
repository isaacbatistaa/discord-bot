const { Client, GatewayIntentBits, Collection } = require('discord.js')
//const axios = require('axios')
require('dotenv').config()
const TOKEN = process.env.TOKEN

const fs = require('node:fs')
const path = require('node:path')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
client.cooldowns = new Collection()

const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    //                          so da pasta comando(commandsPath)
    const commandFiles= fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
		const command = require(filePath)
        //setar o comando
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.error(`[ERROR] O commando de ${filePath} nao encontrou a(s) propiedade "data" ou "execute"`)
        }
    }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.login(TOKEN)
