const extractMessageIdFromUrl = (url: string): string | undefined => {
  // match group of numbers in the end of a string until a character
  const result = url.match(/(\d+)$/)

  return result ? result[1] : undefined
}

export default extractMessageIdFromUrl
