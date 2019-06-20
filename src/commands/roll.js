const rollExample = 'Exemplo de rolagem: `!roll 2d6`';
const errMsg = 'Rolagem não aceita!';

const rollCommand = (commandOptions, message) => {
	let [roll, ...otherOptions] = commandOptions;

	// retorna caso tiver passado outros comandos
	if (otherOptions.length > 0) {
		message.reply(
			`${errMsg}\n**Não passe outras opções na rolagem, por favor.**\n${rollExample}`
		);
		return;
	}

	/** caso a rolagem contenha o 'd' na posição errada
	 *  exemplo: 	!roll d20
	 *  */
	if (roll.indexOf('d') <= 0) {
		message.reply(
			`${errMsg}\nInsira um **d** na posição certa!\n${rollExample}`
		);
		return;
	}

	let [numberOfRolls, diceType] = roll.split('d');
	numberOfRolls = Number(numberOfRolls);
	diceType = Number(diceType);

	/**
	 * Caso o número dados não seja um número
	 * 		Exemplo: !roll doisd20
	 * Caso o número seja menor ou igual a zero
	 * 		Exemplo: !roll -1d20
	 */
	if (numberOfRolls <= 0 || isNaN(numberOfRolls)) {
		message.reply(`${errMsg}\nNúmero de dados inválido!\n${rollExample}`);
		return;
	}

	/** Caso não contenha o tipo de dado
	 * 		Exemplo: !roll 5d
	 *
	 *  Caso contenha um 'd' a mais
	 * 		Exemplo: !roll 2dd20
	 *
	 * 	Caso esteja escrito algo alem de um numero
	 * 		Exemplo: !roll 2dvinte
	 */
	if (diceType <= 0 || isNaN(diceType)) {
		message.reply(`${errMsg}\nTipo de dado inválido!\n${rollExample}`);
		return;
	}

	// gera todos os resultados
	let resultsArray = [];
	for (let i = 1; i <= numberOfRolls; i++) {
		const result = Math.floor(Math.random() * diceType + 1);
		resultsArray.push(result);
	}

	message.reply(
		`rolou:\n\t ${resultsArray.join(', ')} = ${resultsArray.reduce((a, b) => a + b, 0)}`
	);
};

module.exports = rollCommand;
