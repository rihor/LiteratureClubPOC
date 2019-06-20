const Discord = require('discord.js');
const client = new Discord.Client();

const token = require("./auth.json").token;


client.on('ready', () => {
  console.log("Conectado nos servidores:");
  // pega todas as guildas conectadas
  client.guilds.forEach(guild => {
    console.log(` - ${guild.name}`);
  });
});

client.login(token);