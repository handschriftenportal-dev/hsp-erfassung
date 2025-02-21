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

import {
  REPLACEMENT_CHARACTER_KEY,
  SonderzeichenAPI,
} from '../../../src/domain/sonderzeichen/SonderzeichenAPI'

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
