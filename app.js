const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")
// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

// client.on("messageCreate", (message) => {
//     if (message.content == "hello" || message.content == "Hi" || message.content == "hi"  ){
//         message.reply("Hello Welcome to Newton School Sever!!")
//     }
// })

client.on("messageCreate", (message) => {
    if (message.content == "how to get Newton Apples"  ){
        message.reply("Be active in server and participated in events!!")
    }
})

const welcomeChannelId = "988438040219361280"
// for testing server : 979755638647320716
// for main server : 988431427118968843
client.on("guildMemberAdd", async (member) => {
   
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the Newton School's server!!`,
        files: [img]
    })
})
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
client.login(process.env.TOKEN)