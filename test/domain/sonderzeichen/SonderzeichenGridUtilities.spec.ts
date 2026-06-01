import { SonderzeichenAuswahlState } from 'src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenGridUtilities } from 'src/domain/sonderzeichen/SonderzeichenGridUtilities'

describe('SonderzeichenGridUtilities', () => {
  describe('utility generateTable', () => {
    it('exists', () => {
      expect(SonderzeichenGridUtilities.generateTable).toBeTruthy()
    })
    it('starts with <tbody> and ends with </tbody>', () => {
      const tableString = SonderzeichenGridUtilities.generateTable(
        SonderzeichenAuswahlState.empty()
      )
      expect(tableString).toMatch(/^<tbody>/)
      expect(tableString).toMatch(/<\/tbody>$/)
    })
  })

  describe('utility generateKeyHandler', () => {
    it('exists', () => {
      expect(SonderzeichenGridUtilities.generateKeyHandler).toBeTruthy()
    })
    it('provides key handler necessary for grid', () => {
      const handler = SonderzeichenGridUtilities.generateKeyHandler(
        SonderzeichenAuswahlState.empty(),
        jest.fn(),
        jest.fn()
      )
      expect(handler).toHaveProperty('ArrowUp')
      expect(handler).toHaveProperty('ArrowLeft')
      expect(handler).toHaveProperty('ArrowDown')
      expect(handler).toHaveProperty('ArrowRight')
      expect(handler).toHaveProperty('End')
      expect(handler).toHaveProperty('Enter')
      expect(handler).toHaveProperty('Home')
      expect(handler).toHaveProperty('PageDown')
      expect(handler).toHaveProperty('PageUp')
    })
  })

  describe('utility selectGridElement', () => {
    it('exists', () => {
      expect(SonderzeichenGridUtilities.selectGridElement).toBeTruthy()
    })
  })

  describe('utility resizeBackgroundGridPattern', () => {
    it('exists', () => {
      expect(
        SonderzeichenGridUtilities.resizeBackgroundGridPattern
      ).toBeTruthy()
    })
  })
})
