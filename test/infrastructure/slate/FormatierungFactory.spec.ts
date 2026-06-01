import { Element } from 'slate'
import { FormatierungFactory } from 'src/infrastructure/slate/FormatierungFactory'

describe('Semantische Auszeichnung', () => {
  describe('implemented cases', () => {
    const implemented = [
      'autor',
      'werktitel',
      'incipit',
      'explicit',
      'zitat',
    ] as const

    it.each(implemented)('for %s returns an element', (auszeichnung) => {
      expect(Element.isElement(FormatierungFactory.from(auszeichnung))).toBe(
        true
      )
    })

    it.each(implemented)(
      'creating an element for "%s" and getting its type is idempotent',
      (auszeichnung) => {
        const { data_origin } = FormatierungFactory.from(auszeichnung)
        expect(data_origin).toBe(auszeichnung)
      }
    )
  })
})
