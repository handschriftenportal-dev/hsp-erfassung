import { Parser } from 'skripte/utility/parser/Parser'
import { XMLEntityParser } from 'skripte/utility/parser/XMLEntityParser'

describe('XMLEntityParser', () => {
  it.each([
    '&lt;',
    '&gt;',
    '&amp;',
    '&symbol;',
    '&#2022;',
    '&#x2022;',
    '&#xD;',
  ])('returns successfully with entity "%s"', (s) => {
    const callback = jest.fn()
    Parser.traverse(XMLEntityParser(callback), s)
    expect(callback).toHaveBeenCalled()
    expect(callback.mock.lastCall[0]).not.toMatchObject({
      type: 'error',
    })
  })

  it.each(['lt;', '&lt ', '&g=', '&#;', '&#x;', '& '])(
    'returns error with string "%s"',
    (s) => {
      const callback = jest.fn()
      Parser.traverse(XMLEntityParser(callback), s)
      expect(callback).toHaveBeenCalled()
      expect(callback.mock.lastCall[0]).toMatchObject({
        type: 'error',
      })
    }
  )
})
