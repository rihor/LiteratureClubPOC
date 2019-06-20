const onReady = client => {
	console.log('Conectado nos servidores:');
	console.log(` - ${client.guilds.map(guild => guild.name)}`);	
};

module.exports = onReady;
