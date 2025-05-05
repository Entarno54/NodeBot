const client = require("../index.js")
const path = require("path")
const {createAudioResource, createAudioPlayer, joinVoiceChannel, StreamType, VoiceConnectionStatus} = require("@discordjs/voice")
const {createReadStream} = require("fs")
const {Message, GuildMember} = require("discord.js")
const { create } = require("domain")

module.exports = [
    {
        Name: "play",
        Command: (message, arguments) => {
            console.log("Started")
            const link = arguments[0]

            const author = message.author

            message.guild.members.fetch(author.id).then(member => {
                console.log(`Got member ${member}`)

                const channel = member.voice.channel
    
                if (!channel) {
                    return console.log("No channel")
                }
                console.log(`Got channel ${channel}`)
    
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: message.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                });
                
                connection.once(VoiceConnectionStatus.Ready, () => {
                    console.log(`Made connection`)
    
                    const resource = createAudioResource("/home/entar/NodeBot/music/sunburn.mp3")
                    console.log(`Made resource`)
        
                    const player = createAudioPlayer()
                    console.log(`Made player`)
        
        
        
                    player.play(resource)
                    console.log(`Started playing`)
        
                    const subscription = connection.subscribe(player)
                    console.log(`Subscribed player`)
                })
            })
            
        }
    }
]