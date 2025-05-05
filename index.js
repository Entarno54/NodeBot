// Main imports
const { Client, GatewayIntentBits, Partials } = require("discord.js")
const fs = require("fs")
const env = require("dotenv")

// Creating the client itself
const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

module.exports = client // This is for evil stuff (cogs)

// Reading the ./events directory and getting all the js files
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

// Requiring the event files
for (const file of eventFiles) {
    require("./events/"+file)

    console.log(`Loaded event ${file}`)
}

// Defining the Array i will put all the commands into
var commands = []

// Reading the ./commands directory and getting all the js files
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// Requiring the command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command)

    console.log(`Loaded command ${file}`)
}

function getCommand(commandName) {
    var command;
    commands.forEach(commandList => {
        commandList.forEach(commandArray => {
            if (commandArray.Name == commandName) {
                command = commandArray
            } 
        })
    })
    return command;
}

// Parsing commands on message create
client.on("messageCreate", async message => {
    var content = message.content
    if (!content.startsWith('!')) {
        return
    }

    content = content.slice(1, content.length)

    const parsed = content.split(" ")

    const command = parsed[0]

    const args = parsed.filter(value => {return value != command})

    const realCommand = getCommand(command)

    if (!realCommand) {
        return
    }

    realCommand.Command(message, args)
})

client.login(process.env.TOKEN)