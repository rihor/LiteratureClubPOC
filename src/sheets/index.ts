import { Client } from "discord.js"

import extractMessageIdFromUrl from "./helpers/extractMessageIdFromUrl"
import formatBooksRecomendations from "./helpers/formatBooksRecomendations"
import getBooksRecomendations from "./helpers/getBooksRecomendations"
import LiteratureClubSpreadsheet from "./models/LiteratureClubSpreadsheet"

const saveNewRecommendedBooksToSheet = async (
  client: Client
): Promise<void> => {
  console.log("Starting process...")

  const spreadsheet = new LiteratureClubSpreadsheet()

  const lastSheetRow = await spreadsheet.getLastRow("recomendações")
  const rawLastRowData = lastSheetRow?._rawData as Array<string>

  let lastMessageLinkSaved: string | undefined
  let lastMessageId: string | undefined

  if (rawLastRowData && Array.isArray(rawLastRowData)) {
    lastMessageLinkSaved = rawLastRowData[rawLastRowData?.length - 1]

    lastMessageId = extractMessageIdFromUrl(lastMessageLinkSaved)
  }

  const messagesData = await getBooksRecomendations(client, lastMessageId)

  if (!messagesData) {
    console.error("Could not get discord messages.")
    return
  }

  const formattedBooks = formatBooksRecomendations(messagesData).reverse()

  await spreadsheet.addRows({
    sheetTitle: "recomendações",
    values: formattedBooks.map((item) => {
      return [
        item.title,
        item.author,
        item.pages,
        item.userId,
        "",
        "",
        "",
        "",
        item.messageLink,
      ]
    }),
    options: {
      raw: true,
      insert: true,
    },
  })

  console.log(`Ending process... Spreadsheet updated with success.`)
}

export { saveNewRecommendedBooksToSheet }
