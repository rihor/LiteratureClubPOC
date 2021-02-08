import { Client, Guild } from "discord.js"

const findGuild = (client: Client, guildName: string): Guild | undefined => {
  return client.guilds.cache.find((g) => g.name === guildName)
}

export default findGuild
