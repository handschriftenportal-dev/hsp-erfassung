import { uniq } from 'lodash'
import { SonderzeichenListen } from 'src/domain/sonderzeichen/data/SonderzeichenListen'
import { regEx } from 'test/regEx'

describe('SonderzeichenListen', () => {
  const entries = Object.entries(SonderzeichenListen.gruppenMap)
  it.each(entries)('group "%s" has no duplicate item', (_, gruppe) => {
    expect(uniq(gruppe)).toMatchObject(gruppe)
  })

  it('each key has the form U+{HEX}', () => {
    SonderzeichenListen.gesamt.forEach((key) => {
      expect(key).toMatch(regEx.isUnicodeKey)
    })
  })
})
