import Discord from "discord.js";
import onReady from "./events/onReady";

const client = new Discord.Client();

const { token } = require("./auth.json");

// quando ligar o bot
client.on("ready", () => {
  onReady(client);

});

// quando qualquer mensagem na guild
// client.on('message', message => {
// 	onMessage(message, mapQueue);
// });

client.login(token);
