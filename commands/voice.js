const client = require("../index.js")
const path = require("path")
const {createAudioResource, createAudioPlayer, joinVoiceChannel, StreamType} = require("@discordjs/voice")
const {createReadStream} = require("fs")
const {Message, GuildMember} = require("discord.js")
const { create } = require("domain")

module.exports = [
    {
        Name: "play",
        Command: async (message, arguments) => {
            const link = arguments[0]

            const author = message.author
            
            

            var member = await message.guild.members.fetch(author.id)

            const channel = member.voice.channel

            if (!channel) {
                return console.log("No channel")
            }

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });

            const resource = createAudioResource("../music/sunburn.mp3")

            const player = createAudioPlayer({
                
            })

            player.play(resource)

            connection.subscribe(player)
        }
    }
]