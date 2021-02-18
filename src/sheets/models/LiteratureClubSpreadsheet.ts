import { GoogleSpreadsheetRow } from "google-spreadsheet"

import { booksRecommendations as sheetConfig } from "../../configs/sheets"
import Spreadsheet from "./Spreadsheet"

export type AddRowsArgs = {
  sheetTitle: string
  values: Array<Array<string | number>>
  options?: { raw: boolean; insert: boolean }
}

class LiteratureClubSpreadsheet extends Spreadsheet {
  constructor() {
    super(sheetConfig.spreadsheetId)
  }

  public async addRows({
    sheetTitle,
    values,
    options,
  }: AddRowsArgs): Promise<GoogleSpreadsheetRow[] | undefined> {
    return super.addRows({
      sheetTitle,
      values,
      options: {
        insert: true,
        raw: true,
        ...options,
      },
    })
  }

  /**
   * this can be a huge memory spike depending of the size of the sheet
   * currently there is no way of getting only the last row
   */
  public async getLastRow(
    sheetTitle: string
  ): Promise<GoogleSpreadsheetRow | undefined> {
    await this.client.loadInfo()

    const sheet = this.client.sheetsByTitle[sheetTitle]

    if (!sheet) {
      console.error(
        "This sheet does not exist! Check if the sheetTitle is right."
      )
      return
    }

    const rows = await sheet.getRows()
    const lastRow = rows[rows.length - 1]

    return lastRow
  }
}

export default LiteratureClubSpreadsheet
