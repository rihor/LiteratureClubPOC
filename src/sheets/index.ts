import sheetsConfigs from "./configs/sheets"
import BooksRecommendationsSheet from "./models/BooksRecommendationsSheet"

const booksRecommendationsTratatives = async (): Promise<void> => {
  const { spreadsheetId, range } = sheetsConfigs.booksRecommendations

  const sheet = new BooksRecommendationsSheet(spreadsheetId)

  const sheetData = await sheet.fetch({
    range,
  })

  console.log(sheetData)
}

export default booksRecommendationsTratatives
