import { Guild, GuildChannel } from "discord.js"

const findChannelOnGuild = (
  guild: Guild,
  channelName: string
): GuildChannel | undefined => {
  if (!guild.available) {
    return
  }

  const guildChannel = guild.channels.cache.find(
    (channel) => channel.name === channelName
  )

  return guildChannel
}

export default findChannelOnGuild
