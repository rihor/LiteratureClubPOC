const Discord = require('discord.js');
const client = new Discord.Client();

const token = require('./auth.json').token;
const onMessage = require('./events/onMessage');
const onReady = require('./events/onReady');

var mapQueue = new Map();

// quando ligar o bot
client.on('ready', () => {
	onReady(client);
});

// quando qualquer mensagem na guild
client.on('message', message => {
	onMessage(message, mapQueue);
});

client.login(token);
