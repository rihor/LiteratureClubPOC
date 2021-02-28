import "dotenv/config"
import Discord from "discord.js"

import onReady from "./events/onReady"

const token = process.env.TOKEN

const client = new Discord.Client()

client.on("ready", async () => {
  onReady(client)
})

client.login(token)
