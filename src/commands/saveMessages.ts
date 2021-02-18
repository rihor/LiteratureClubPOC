import { Collection, Message } from "discord.js"

import formatBooksRecomendations from "../sheets/helpers/formatBooksRecomendations"
import getBooksRecomendations from "../sheets/helpers/getBooksRecomendations"

const saveMessages = async (
  message: Message
): Promise<Collection<string, Message> | undefined> => {
  console.error("saveMessages not implemented!")

  // if (!message.guild) {
  //   return
  // }
  // const client = message.client
  // const booksRecomendations = await getBooksRecomendations(client)
  // if (!booksRecomendations) {
  //   return
  // }
  // const formattedBooksRecomendations = await formatBooksRecomendations(
  //   booksRecomendations
  // )
  // console.log(formattedBooksRecomendations)
}

export default saveMessages
