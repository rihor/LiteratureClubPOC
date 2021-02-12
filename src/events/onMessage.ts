import { Message } from "discord.js"

import saveMessages from "../commands/saveMessages"

const prefix = "!"

const onMessage = (message: Message): void => {
  // não responde bot
  if (message.author.bot) return
  // ignora mensagem que não começa com "!"
  if (message.content.indexOf(prefix) !== 0) return

  // remove o prefixo do content, pois não será mais necessário
  message.content = message.content.slice(1)

  // separa a primeira parte da mensagem como o comando e o resto como opções
  const [command] = message.content.trim().split(" ")

  switch (command) {
    case "get":
      saveMessages(message)
      break
  }
}

export default onMessage
