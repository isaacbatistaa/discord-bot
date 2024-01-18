const { REST, Routes } = require ('discord.js')
require('dotenv').config()
//reduzir isso dps
const TOKEN = process.env.TOKEN
const GUILD_ID = process.env.GUILD_ID
const CLIENT_ID = process.env.CLIENT_ID
const fs = require('node:fs')
const path = require('node:path')

const commands = []

// pegar os comandos
const foldersPath= path.join(__dirname, 'commands')
const commandFolders= fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    //pegar todos os arquivos de commands/
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith('.js'))
    //Pega a saida de comandos SlashCommandBuilder#toJSON()
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[ERROR] o comando ${filePath} nao tem o 'data' ou 'execute'`);
		}
    }
}
// constroi e repara a instancia do modulo REST
const rest = new REST().setToken(TOKEN);

//e fala seu comandos
(async () => {
    try {
        console.log(`Começou a atualizar ${commands.length} comandos de aplicações(/)`)

        // COLOCA OS COMANDOS NO SERVIDOR ESCOLHIDO
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        )
        console.log(`Sucesso ao atualizar ${data.length} comandos de aplicações(/) `)
    } catch (error) {
        console.error(error)
    }
})()
