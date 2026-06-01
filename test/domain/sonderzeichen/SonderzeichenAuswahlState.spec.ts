import { SonderzeichenAuswahlState } from 'src/domain/sonderzeichen/SonderzeichenAuswahlState'

describe('SonderzeichenAuswahlState', () => {
  it('can create initial empty state', () => {
    expect(SonderzeichenAuswahlState.empty()).toBeTruthy()
  })
})
