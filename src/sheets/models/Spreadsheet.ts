import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"

import { credentials } from "../configs/sheets"

export type AddRowsArgs = {
  sheetTitle: string
  values: Array<
    | {
        [header: string]: string | number | boolean
      }
    | Array<string | number | boolean>
  >
  options?: { raw: boolean; insert: boolean }
}

abstract class Spreadsheet {
  protected client: GoogleSpreadsheet

  constructor(spreadsheetId: string) {
    this.client = new GoogleSpreadsheet(spreadsheetId)
    this.authenticate()
  }

  private async authenticate() {
    await this.client.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    })
  }

  async addRows({
    sheetTitle,
    values,
    options,
  }: AddRowsArgs): Promise<GoogleSpreadsheetRow[] | undefined> {
    await this.client.loadInfo()

    const sheet = this.client.sheetsByTitle[sheetTitle]

    if (!sheet) {
      console.error(
        "This sheet does not exist! Check if the sheetTitle is right..."
      )
      return
    }

    const addedRows = await sheet.addRows(values, options)

    return addedRows
  }
}

export default Spreadsheet
