const roll = require('../commands/roll');
const play = require('../commands/play');
const prefix = '!';

const onMessage = (message, mapQueue) => {
	// não responde bot
	if (message.author.bot) return;
	// ignora mensagem que não começa com "!"
	if (message.content.indexOf(prefix) !== 0) return;

	// remove o prefixo do content, pois não será mais necessário
	message.content = message.content.slice(1);

	// separa a primeira parte da mensagem como o comando e o resto como opções
	const [command, ...commandOptions] = message.content
		.trim()		
		.split(' ');

	switch (command) {
	case 'roll':
		roll(commandOptions, message);
		break;
	case 'play':
		play(commandOptions, message, mapQueue);
		break;
	}
};

module.exports = onMessage;
