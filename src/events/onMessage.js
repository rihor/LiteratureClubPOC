const roll = require('../commands/roll');
const prefix = '!';

const onMessage = message => {
	// não responde bot
	if (message.author.bot) return;
	// ignora mensagem que não começa com "!"
	if (message.content.indexOf(prefix) !== 0) return;

	// remove o prefixo do content, pois não será mais necessário
	message.content = message.content.slice(1);

	// separa a primeira parte da mensagem como o comando e o resto como opções
	const [command, ...commandOptions] = message.content
		.trim()
		.toLowerCase()
		.split(' ');

	switch (command) {
	case 'roll':
		roll(commandOptions, message);
		break;
	}
};

module.exports = onMessage;
