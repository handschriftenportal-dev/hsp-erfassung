import {
  REPLACEMENT_CHARACTER_KEY,
  SonderzeichenAPI,
} from 'src/domain/sonderzeichen/SonderzeichenAPI'

describe('Sonderzeichen', () => {
  const all = SonderzeichenAPI.getList()
  const replacementCharacter = SonderzeichenAPI.getSonderzeichen(
    REPLACEMENT_CHARACTER_KEY
  )

  it('there are listnames', () => {
    expect(SonderzeichenAPI.gruppen()).not.toHaveLength(0)
  })

  describe('getList', () => {
    it('without options yields a non-empty list', () => {
      expect(all).not.toHaveLength(0)
    })

    it.each(SonderzeichenAPI.gruppen())(
      'list %s is non-empty and smaller than all',
      (gruppe) => {
        const list = SonderzeichenAPI.getList({ gruppe })
        expect(list).not.toHaveLength(0)
        expect(all.length >= list.length).toBeTruthy()
      }
    )
  })

  it('gibberish yields replacement character with console warning', () => {
    let spyRunned = false
    jest.spyOn(console, 'warn').mockImplementation(() => {
      spyRunned = true
    })
    expect(SonderzeichenAPI.getSonderzeichen('not a valid key')).toMatchObject(
      replacementCharacter
    )
    expect(spyRunned).toBeTruthy()
  })

  it('no key from the all list is the replacement character', () => {
    all.forEach((key) =>
      expect(SonderzeichenAPI.getSonderzeichen(key)).not.toMatchObject(
        replacementCharacter
      )
    )
  })
})
