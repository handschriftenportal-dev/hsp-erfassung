import { Sonderzeichen } from 'src/domain/sonderzeichen/Sonderzeichen'

describe('Character', () => {
  it('can be transformed to a string', () => {
    expect(
      Sonderzeichen.toString({
        codepoint: 0x2020,
        sign: '\u2020',
        description: 'Dagger',
      })
    ).toBe('†')
  })
})
