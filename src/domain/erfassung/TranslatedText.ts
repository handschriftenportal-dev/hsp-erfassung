export type TranslatedText = {
  text: string
  isoCode: string
}[]

export const TranslatedText = Object.freeze({
  forLanguage(translatedText: TranslatedText, language: string): string {
    if (translatedText.length === 0) {
      return ''
    }
    return (
      translatedText.find(({ isoCode }) => isoCode === language) ??
      translatedText[0]
    ).text
  },
  allForLanguage(translatedText: TranslatedText, language: string): string[] {
    return translatedText
      .filter(({ isoCode }) => isoCode === language)
      .map(({ text }) => text)
  },
})
