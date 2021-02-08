import { Client, GuildChannel } from "discord.js";

const findChannel = (
  client: Client,
  channelName: string
): GuildChannel | null => {
  let channelFound: GuildChannel | null = null;

  client.guilds.map((guild) => {
    if (!guild) {
      return false;
    }

    guild.channels.find((channel) => {
      if (channel.name === channelName) {
        channelFound = channel;
      }

      return channel.name === channelName;
    });

    return true;
  });

  return channelFound;
};

export default findChannel;
