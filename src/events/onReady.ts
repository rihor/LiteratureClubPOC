import { Client } from "discord.js"

// import findChannel from "../helpers/findChannel"
// import findGuild from "../helpers/findGuild"
import { saveNewRecommendedBooksToSheet } from "../sheets"

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

  saveNewRecommendedBooksToSheet(client)
}

export default onReady
