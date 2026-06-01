import { TranslatedText } from 'src/domain/erfassung/TranslatedText'

describe('TranslatedText', () => {
  it('yields empty string if no translation available', () => {
    expect(TranslatedText.forLanguage([], 'de')).toBe('')
  })

  const example = [
    { isoCode: 'de', text: 'deutsch' },
    { isoCode: 'en', text: 'english' },
  ]
  it.each([
    ['de', 'deutsch'],
    ['en', 'english'],
  ])('finds language "%s" in example', (isoCode, text) => {
    expect(TranslatedText.forLanguage(example, isoCode)).toBe(text)
  })

  it('falls back to first item if language not available', () => {
    expect(TranslatedText.forLanguage(example, 'jp')).toBe('deutsch')
  })
})
