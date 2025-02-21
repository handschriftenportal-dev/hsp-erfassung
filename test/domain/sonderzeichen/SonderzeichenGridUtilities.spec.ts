/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { SonderzeichenAuswahlState } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenGridUtilities } from '../../../src/domain/sonderzeichen/SonderzeichenGridUtilities'

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
