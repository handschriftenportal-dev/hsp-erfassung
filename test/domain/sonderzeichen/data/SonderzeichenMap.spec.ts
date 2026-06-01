import { SonderzeichenMap } from 'src/domain/sonderzeichen/data/SonderzeichenMap'
import { regEx } from 'test/regEx'

describe('SonderzeichenMap', () => {
  const entries = Object.entries(SonderzeichenMap)
  it('keys conforms to format U+{HEX}', () => {
    entries.forEach(([key, _value]) => {
      expect(key).toMatch(regEx.isUnicodeKey)
    })
  })

  it('keys describe value', () => {
    entries.forEach(([key, value]) => {
      const codepoint = Number.parseInt(key.slice(2), 16)
      expect(value.codepoint).toBe(codepoint)
      expect([...value.sign].map((char) => char.codePointAt(0))).toContain(
        codepoint
      )
    })
  })

  it('description texts are not empty', () => {
    entries.forEach(([_key, value]) => {
      expect(value.description).not.toBe('')
    })
  })

  it('description texts have no trailing whitespaces', () => {
    entries.forEach(([_key, value]) => {
      expect(value.description.trim()).toBe(value.description)
    })
  })
})
