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

import { SonderzeichenAuswahlReducer } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlState'

describe('SonderzeichenAuswahlReducer', () => {
  const state = SonderzeichenAuswahlState.empty()

  it('invalid type throws error', () => {
    expect(() =>
      SonderzeichenAuswahlReducer(state, {
        type: 'INVALID',
        payload: undefined,
      })
    ).toThrow()
  })

  describe('action "setSpalten"', () => {
    it('changes spalten', () => {
      expect(
        SonderzeichenAuswahlReducer(state, { type: 'setSpalten', payload: 5 })
      ).toMatchObject({
        spalten: 5,
      })
    })
  })

  describe('action "setSuche"', () => {
    it('changes sonderzeichen keys', () => {
      const newState = SonderzeichenAuswahlReducer(state, {
        type: 'setSuche',
        payload: 'greek',
      })
      expect(newState).toMatchObject({
        suche: 'greek',
      })
      expect(state.sonderzeichenKeys).not.toMatchObject(
        newState.sonderzeichenKeys
      )
    })
  })

  describe('action "setGruppe"', () => {
    it('changes sonderzeichen keys', () => {
      const newState = SonderzeichenAuswahlReducer(state, {
        type: 'setGruppe',
        payload: 'alchemie',
      })
      expect(newState).toMatchObject({
        gruppe: 'alchemie',
      })
      expect(state.sonderzeichenKeys).not.toMatchObject(
        newState.sonderzeichenKeys
      )
    })
  })

  describe('action "setAuswahlIndex"', () => {
    it('does change auswahl index if valid range', () => {
      const newState = SonderzeichenAuswahlReducer(state, {
        type: 'setAuswahlIndex',
        payload: state.sonderzeichenKeys.length - 1,
      })
      expect(newState.auswahlIndex).not.toBe(state.auswahlIndex)
    })

    it('does not allow invalid values', () => {
      expect(
        SonderzeichenAuswahlReducer(state, {
          type: 'setAuswahlIndex',
          payload: state.sonderzeichenKeys.length,
        })
      ).toBe(state)
      expect(
        SonderzeichenAuswahlReducer(state, {
          type: 'setAuswahlIndex',
          payload: -1,
        })
      ).toBe(state)
    })
  })

  describe('action "setAnsicht"', () => {
    const favoritenAnsicht = SonderzeichenAuswahlReducer(state, {
      type: 'setAnsicht',
      payload: SonderzeichenAuswahlState.ansicht.favoriten,
    })
    it('can change ansicht from zeichensaetze to favoriten', () => {
      expect(favoritenAnsicht).toMatchObject({
        ansicht: SonderzeichenAuswahlState.ansicht.favoriten,
        sonderzeichenKeys: [],
      })
    })
    it('can change ansicht from favoriten to zeichensaetze', () => {
      expect(
        SonderzeichenAuswahlReducer(favoritenAnsicht, {
          type: 'setAnsicht',
          payload: SonderzeichenAuswahlState.ansicht.zeichensaetze,
        })
      ).toMatchObject(state)
    })
  })

  describe('action "toggleFavorite"', () => {
    it('toggles key as favorite and yields new object', () => {
      const key = state.sonderzeichenKeys[0]
      expect(state.api.isFavorit(key)).toBe(false)
      const toggledOnState = SonderzeichenAuswahlReducer(state, {
        type: 'toggleFavorite',
        payload: key,
      })
      expect(state.api.isFavorit(key)).toBe(true)
      expect(toggledOnState).not.toBe(state)
      const toggledOffState = SonderzeichenAuswahlReducer(state, {
        type: 'toggleFavorite',
        payload: key,
      })
      expect(state.api.isFavorit(key)).toBe(false)
      expect(toggledOffState).not.toBe(toggledOnState)
    })

    it('changes sonderzeichen keys of state in favorite ansicht', () => {
      const key = state.sonderzeichenKeys[0]
      const favoritenAnsicht = SonderzeichenAuswahlReducer(state, {
        type: 'setAnsicht',
        payload: SonderzeichenAuswahlState.ansicht.favoriten,
      })
      expect(favoritenAnsicht.sonderzeichenKeys).toMatchObject([])
      const toggledOnState = SonderzeichenAuswahlReducer(favoritenAnsicht, {
        type: 'toggleFavorite',
        payload: key,
      })
      expect(toggledOnState.sonderzeichenKeys).toMatchObject([key])
    })
  })
})
