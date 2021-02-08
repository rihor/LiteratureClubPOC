import Discord from "discord.js"

import { token } from "./auth.json"
import onReady from "./events/onReady"

const client = new Discord.Client()

// quando ligar o bot
client.on("ready", () => {
  onReady(client)
})

// quando qualquer mensagem na guild
// client.on('message', message => {
// 	onMessage(message, mapQueue);
// });

client.login(token)
