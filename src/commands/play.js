const ytdl = require('ytdl-core');

/*
	recebe:
	commandOptions: array das coisas que foram escritas depois do comando
	message: método que faz parte do Client do discord
	mapQueue: Map de todas as possiveis filas do bot
*/
const play = async (commandOptions, message, mapQueue) => {
	const guildId = message.guild.id;
	const voiceChannel = message.member.voiceChannel;

	// caso o membro não esteja em um canal de voz
	if (!voiceChannel) {
		message.reply('entre em um canal de voz!');
	}

	// filtra o resto do comando
	const [musicUrl, ...otherOptions] = commandOptions;

	// caso não tenha passado uma url
	if (!musicUrl) {
		message.reply('passe uma url!');
		return;
	}

	// caso a url passada não seja válida
	if (musicUrl.indexOf('youtu') < 0) {
		message.reply('passe uma url válida');
		return;
	}

	// retorna caso exista outras opções
	if (otherOptions.length > 0) {
		message.reply(
			'No momento não foi implementado opções para o vídeo\nPor favor passe o comando sem opções'
		);
		return;
	}

	// pega a fila de músicas do server em questão
	const guildQueue = mapQueue.get(guildId);

	// caso o server não tenha nenhuma playlist, cria uma
	if (!guildQueue) {
		const queue = {
			// textChannel: message.channel,
			// voiceChannel,
			// playing: true
			connection: null,
			musics: [],
		};
		mapQueue.set(guildId, queue);
		queue.musics.push(musicUrl);

		try {
			queue.connection = await voiceChannel.join();
			playMusic(queue.musics[0], queue);
		} catch (error) {
			console.log(error);
			return;
		}
	} else {
		guildQueue.musics.push(musicUrl);
	}
};

function playMusic(musicUrl, queue) {
	// faz download de um vídeo do youtube
	const stream = ytdl(musicUrl, {
		filter: 'audioonly',
		highWaterMark: 1024 * 1024 * 10
	});
	// conecta no canal de voz e roda a stream
	const dispatcher = queue.connection.playStream(stream, {
		seek: 0,
		volume: 0.5
	});
	// toca a próxima música assim que acabar a que está tocando
	dispatcher.on('end', () => {
		queue.musics.shift();
		playMusic(queue.musics[0], queue);
	});
}

module.exports = play;
