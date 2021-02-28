import credentials from "../../credentials.json"

export const booksRecommendations = {
  spreadsheetId: process.env.spreadsheet_id,
  sheets: {
    recommendations: "recomendações",
  },
}

export { credentials }
