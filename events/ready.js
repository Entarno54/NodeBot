const client = require("../index");

client.on("ready", ()=>{
    console.log(`Ready as ${client.user.username}`)
})