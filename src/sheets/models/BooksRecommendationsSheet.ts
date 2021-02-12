import { sheets_v4 } from "googleapis"

import Sheet from "./Sheet"

type FetchSheetArgs = {
  range: string
}

class BooksRecommendationsSheet extends Sheet {
  constructor(sheetId: string) {
    super(sheetId)
  }

  async update(): Promise<void> {
    console.log("Not implemented yet!")
  }

  async fetch({
    range,
  }: FetchSheetArgs): Promise<sheets_v4.Schema$ValueRange | undefined> {
    return super.fetch({
      range,
    })
  }
}

export default BooksRecommendationsSheet
