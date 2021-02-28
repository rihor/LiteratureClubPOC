import { Collection, Client, Message, TextChannel } from "discord.js"

import findChannelOnGuild from "../../helpers/findChannel"
import findGuild from "../../helpers/findGuild"

type Args = {
  client: Client
  startFromMessageId?: string
  guildName: string
  channelName: string
}

const getBooksRecomendations = async ({
  client,
  startFromMessageId,
  guildName,
  channelName,
}: Args): Promise<Collection<string, Message> | undefined> => {
  const guild = findGuild(client, guildName)

  if (!guild) return

  const channel = findChannelOnGuild(guild, channelName) as TextChannel

  const messages = await channel.messages.fetch({
    after: startFromMessageId,
  })

  return messages
}

export default getBooksRecomendations
