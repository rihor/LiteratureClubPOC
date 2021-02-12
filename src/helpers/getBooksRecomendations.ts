import { Collection, Client, Message, TextChannel } from "discord.js"

import findChannelOnGuild from "./findChannel"
import findGuild from "./findGuild"

const getBooksRecomendations = async (
  client: Client
): Promise<Collection<string, Message> | undefined> => {
  const guild = findGuild(client, "TESTES")

  if (!guild) return

  const channel = findChannelOnGuild(guild, "recomendações") as TextChannel

  const messages = await channel.messages.fetch()

  return messages
}

export default getBooksRecomendations
