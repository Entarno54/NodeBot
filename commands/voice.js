const client = require("../index.js")
const path = require("path")
const {createAudioResource, createAudioPlayer, joinVoiceChannel, StreamType, VoiceConnectionStatus} = require("@discordjs/voice")
const {createReadStream} = require("fs")
const {Message, GuildMember} = require("discord.js")
const { create } = require("domain")
const {YtDlp} = require("ytdlp-nodejs")

const yt = new YtDlp({
    binaryPath: "/home/entar/NodeBot/yt-dlp"
})

function downloadVideo(link) {
    try {
        const output = yt.exec(link, {
            output: "evil.mp3"
        })
        console.log(output)
    } catch {}
}

var Playing = false;

module.exports = [
    {
        Name: "play",
        Command: (message, arguments) => {
            console.log("Started")
            const link = arguments[0]
            if (!link) {
                return message.reply("No link")
            }
            if (Playing) {
                return message.reply("Already playing audio")
            }

            const author = message.author

            message.guild.members.fetch(author.id).then(member => {
                console.log(`Got member ${member}`)

                const channel = member.voice.channel
    
                if (!channel) {
                    return message.reply("You aren't in a voice channel.")
                }
                console.log(`Got channel ${channel}`)
    
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: message.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                });
                
                connection.once(VoiceConnectionStatus.Ready, () => {
                    console.log(`Made connection`)
    
                    yt.getFileAsync(link, {
                        format: {
                            filter: "audioonly",
                            type: "mp3",
                            quality: "lowest"
                        },
                        filename: "evil.mp3"
                    }).then(Evil => {
                        console.log(Evil)
                        const resource = createAudioResource(Evil.path)
                        console.log(`Made resource`)
            
                        const player = createAudioPlayer()
                        console.log(`Made player`)
            
                        player.play(resource)
                        console.log(`Started playing`)
            
                        const subscription = connection.subscribe(player)
                        console.log(`Subscribed player`)
                    })
                })
            })
            
        }
    }
]