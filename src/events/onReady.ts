import { Client } from "discord.js"

// import findChannel from "../helpers/findChannel"
// import findGuild from "../helpers/findGuild"
import sheets from "../sheets"

const onReady = (client: Client): void => {
  // const guild = findGuild(client, "TESTES")

  // if (!guild) {
  //   return
  // } else {
  //   console.log(`Guild found! -> ${guild.name}`)
  // }

  // const channel = findChannel(guild, "recomendações")

  // if (channel) {
  //   console.log(`Channel found! -> ${channel.name}`)
  // }

  sheets()
}

export default onReady
