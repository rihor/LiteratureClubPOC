import { Collection, Client, Message, TextChannel } from "discord.js"

import { guildName, channelName } from "../configs/discord"
import findChannelOnGuild from "./findChannel"
import findGuild from "./findGuild"

const getBooksRecomendations = async (
  client: Client,
  startFromMessageId?: string
): Promise<Collection<string, Message> | undefined> => {
  const guild = findGuild(client, guildName)

  if (!guild) return

  const channel = findChannelOnGuild(guild, channelName) as TextChannel

  const messages = await channel.messages.fetch({
    after: startFromMessageId,
  })

  return messages
}

export default getBooksRecomendations
