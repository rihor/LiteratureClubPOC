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
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			musics: [],
			volume: 5,
			playing: true
		};
		mapQueue.set(guildId, queue);
		// queue.musics.push(music);
		queue.musics.push(musicUrl);

		try {
			const connection = await voiceChannel.join();
			queue.connection = connection;
			console.log(queue.musics);
			playMusic(message.guild, queue.musics[0], mapQueue);
		} catch (error) {
			// queue.delete(guildId);
			return message.guild.send(error);
		}
	} else {
		guildQueue.musics.push(musicUrl);
		// console.log(mapQueue);
	}
};

function playMusic(guild, musicUrl, mapQueue) {
	const serverQueue = mapQueue.get(guild.id);
	const stream = ytdl(musicUrl, {
		filter: 'audioonly',
		highWaterMark: 1024 * 1024 * 10
	});
	const dispatcher = serverQueue.connection.playStream(stream, {
		seek: 0,
		volume: 0.5
	});
	dispatcher.on('end', () => {
		console.log('Musica acabou!');
		serverQueue.musics.shift();
		playMusic(guild, serverQueue.musics[0], mapQueue);
	});
}

module.exports = play;
