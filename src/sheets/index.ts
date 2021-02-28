import { Client } from "discord.js"

import { channelName, guildName } from "../configs/discord"
import { booksRecommendations as sheetConfig } from "../configs/sheets"
import extractMessageIdFromUrl from "./helpers/extractMessageIdFromUrl"
import formatBooksRecomendations from "./helpers/formatBooksRecomendations"
import getBooksRecomendations from "./helpers/getBooksRecomendations"
import LiteratureClubSpreadsheet from "./models/LiteratureClubSpreadsheet"

const saveNewRecommendedBooksToSheet = async (
  client: Client
): Promise<void> => {
  if (!channelName || !guildName) {
    throw new Error("No channel_name or guild_name on .env")
  }

  console.log("[CRON JOB] ~> starting process of saving recommendations")

  if (!sheetConfig.spreadsheetId) {
    throw Error("No spreadsheet id on .env")
  }

  const spreadsheet = new LiteratureClubSpreadsheet(sheetConfig.spreadsheetId)

  const lastSheetRow = await spreadsheet.getLastRow("recomendações")
  const rawLastRowData = lastSheetRow?._rawData as Array<string> | undefined

  let lastMessageLinkSaved: string | undefined
  let lastMessageId: string | undefined

  if (rawLastRowData && Array.isArray(rawLastRowData)) {
    lastMessageLinkSaved = rawLastRowData[rawLastRowData?.length - 1]

    lastMessageId = extractMessageIdFromUrl(lastMessageLinkSaved)
  }

  const messagesData = await getBooksRecomendations({
    client,
    channelName,
    guildName,
    startFromMessageId: lastMessageId,
  })

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

  console.log(`[CRON JOB] ~> ending process of saving recommendations`)
}

export { saveNewRecommendedBooksToSheet }
