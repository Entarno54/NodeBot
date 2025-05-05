const client = require("../index.js")

module.exports = [
    {
        Name: "ping",
        Command: (message, arguments) => {
            message.reply(`Pong! ${arguments}`)
        }
    }
]