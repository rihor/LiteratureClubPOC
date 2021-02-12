import "dotenv/config"
import Discord from "discord.js"

import onMessage from "./events/onMessage"
import onReady from "./events/onReady"

const token = process.env.TOKEN
const client = new Discord.Client()

// quando ligar o bot
client.on("ready", async () => {
  onReady(client)
})

// quando qualquer mensagem na guild
client.on("message", (message) => {
  onMessage(message)
})

client.login(token)
