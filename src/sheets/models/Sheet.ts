import { Auth, google, sheets_v4 } from "googleapis"

import { scopes, credentials, apiKey } from "../configs/googleapis"

export interface GetSheetOptions
  extends sheets_v4.Params$Resource$Spreadsheets$Values$Get {
  range: string
}

type FetchData = sheets_v4.Schema$ValueRange

abstract class Sheet {
  private client: Auth.JWT
  private spreadsheetId: string

  abstract update(): Promise<unknown>

  constructor(spreadsheetId: string) {
    const { client_email, private_key } = credentials

    this.spreadsheetId = spreadsheetId
    this.client = new google.auth.JWT(
      client_email,
      undefined,
      private_key,
      scopes
    )
  }

  private async getAuthToken(): Promise<string | undefined> {
    const auth = await this.client.authorize().catch((error) => {
      console.log(error)
    })

    if (!auth || !auth.access_token) {
      console.log("Could not fetch auth credentials!")
      return
    }

    return auth.access_token
  }

  async fetch(options: GetSheetOptions): Promise<FetchData | undefined> {
    const token = await this.getAuthToken()

    if (!token) {
      return
    }

    const result = await google
      .sheets({ version: "v4", auth: token })
      .spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        ...options,
        key: apiKey,
      })

    return result.data
  }
}

export default Sheet
