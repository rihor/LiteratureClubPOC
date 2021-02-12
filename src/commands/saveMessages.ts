import { Collection, Message } from "discord.js"

import formatBooksRecomendations from "../helpers/formatBooksRecomendations"
import getBooksRecomendations from "../helpers/getBooksRecomendations"

const saveMessages = async (
  message: Message
): Promise<Collection<string, Message> | undefined> => {
  if (!message.guild) {
    return
  }

  const client = message.client

  const booksRecomendations = await getBooksRecomendations(client)

  if (!booksRecomendations) {
    return
  }

  const formattedBooksRecomendations = await formatBooksRecomendations(
    booksRecomendations
  )

  console.log(formattedBooksRecomendations)
}

export default saveMessages
