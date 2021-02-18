import { Collection, Message } from "discord.js"

import { BookRecomendation } from "../models/BookRecommendation"

type MessagePart = {
  field: string
  value: string
}

const normalizeContent = (content: string): string => {
  return content
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remover acentos
}

const extractMessagePart = (text: string): Partial<MessagePart> | undefined => {
  const [head, tail] = text.split(":")

  let key: string | undefined
  let value: string | undefined

  if (head && head.length > 0) {
    key = head.trim()
  }

  if (tail && tail.length > 0) {
    value = tail.trim()
  }

  const messagePart = { field: key, value: value }

  return messagePart || undefined
}

const validateField = (field: string): boolean => {
  const indexFound = field.search(/^(aut|tit|gen|pag)\w*/)

  return indexFound === 0
}

const formatBooksRecomendations = (
  booksRecomendations: Collection<string, Message>
): Array<BookRecomendation> => {
  const books: BookRecomendation[] = []

  booksRecomendations.each((recomendationMessage) => {
    const normalizedContent = normalizeContent(
      recomendationMessage.cleanContent
    )
    const arrayOfLines = normalizedContent.split("\n")

    const arrayOfFormattedLines: Array<MessagePart> = []
    let temporaryField: string | undefined
    let temporaryValue: string | undefined
    const recomendationObj: any | undefined = {}

    arrayOfLines.forEach((line) => {
      const messagePart = extractMessagePart(line)

      if (!messagePart || (!messagePart.field && !messagePart.value)) {
        return
      }

      // to grant continuity in case of field and value separate
      // titulo:  {field: 'titulo', value: undefined}
      // Banana   {field: undefined, value: 'Banana'}
      if (messagePart.field) {
        temporaryField = messagePart.field
      }
      temporaryValue = messagePart.value

      if (temporaryField && temporaryValue) {
        const isFieldValid = validateField(temporaryField)

        if (isFieldValid) {
          recomendationObj[temporaryField] = temporaryValue
          arrayOfFormattedLines.push({
            field: temporaryField,
            value: temporaryValue,
          })
        }
      }
    })

    if (Object.keys(recomendationObj).length !== 0) {
      const { autor, paginas, titulo } = recomendationObj

      if (autor && paginas && titulo) {
        books.push({
          author: recomendationObj.autor,
          pages: recomendationObj.paginas,
          messageLink: recomendationMessage.url,
          title: recomendationObj.titulo,
          userId: recomendationMessage.author.id,
        })
      }
    }
  })

  return books
}

export default formatBooksRecomendations
