import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPText } from 'src/infrastructure/slate/HSPText'

describe('HSPText', () => {
  test.each([
    ['a      b', 'a b'],
    ['     a      b', ' a b'],
    ['a   \t\n  b\t', 'a b '],
    ['\t\n   a      b\n ', ' a b '],
  ])('"%j" becomes { text: "%s" }', (input, output) => {
    expect(HSPText.normalizedText(input)).toEqual({ text: output })
  })

  test('empty text', () => {
    expect(HSPText.emptyText()).toEqual({ text: '' })
  })

  describe('from plain text', () => {
    const a = { text: 'a' }
    const b = { text: ' b ' }
    const empty = HSPText.emptyText()
    const lb = HSPElement.lbElement()
    test.each([
      ['', [empty]],
      ['a', [a]],
      ['\t\tb  \t', [b]],
      ['a\n\tb\t', [a, lb, b]],
      ['a\n\na', [a, lb, empty, lb, a]],
    ])('"%j" yields %o', (input, output) => {
      expect(HSPText.fromPlainText(input)).toEqual(output)
    })
  })
})
