import { Client } from 'discord.js';
import findChannel from "../helpers/findChannel";

const onReady = (client: Client) => {
  console.log("Conectado nos servidores:");
  console.log(` - ${client.guilds.map((guild) => guild.name)}`);
  const channel = findChannel(client, "recomendações");

  // channel.messages.fetch()
  // 	.then(messages => console.log(`${messages.filter(m => m.author.id).size} messages`))
  // 	.catch(console.error);
  // console.log(channel);
};

export default onReady
