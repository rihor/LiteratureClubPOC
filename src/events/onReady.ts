import { Client } from "discord.js"

import findChannel from "../helpers/findChannel"
import findGuild from "../helpers/findGuild"
import getAllMessages from "../helpers/getAllMessages"

const onReady = (client: Client): void => {
  const guild = findGuild(client, "TESTES")

  if (!guild) {
    return
  } else {
    console.log(`Guild found! -> ${guild.name}`)
  }

  const channel = findChannel(guild, "recomendações")

  if (!channel) {
    return
  } else {
    console.log(`Channel found! -> ${channel.name}`)
  }

  const messages = getAllMessages(channel)

  console.log(messages)
}

export default onReady
