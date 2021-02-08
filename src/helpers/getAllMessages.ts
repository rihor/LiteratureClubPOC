import { GuildChannel } from "discord.js"

const getAllMessages = (channel: GuildChannel): unknown[] => {
  if (channel.type !== "text") {
    return []
  }

  return []
}

export default getAllMessages
