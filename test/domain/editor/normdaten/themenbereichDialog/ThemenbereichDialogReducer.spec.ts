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

import { ThemenbereichDialogReducer } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'

describe('ThemenbereichDialogReducer', () => {
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('throws on invalid action', () => {
    expect(() =>
      ThemenbereichDialogReducer(initialState, {
        type: 'invalid',
        payload: null,
      })
    ).toThrow()
  })

  it('addBegriffe action adds begriffe uniquely in order', () => {
    const addedOnceState = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: ['a', 'b'],
    })
    const addedTwiceState = ThemenbereichDialogReducer(addedOnceState, {
      type: 'addBegriffe',
      payload: ['a', 'c'],
    })
    expect(addedOnceState.auswahl).toMatchObject(['a', 'b'])
    expect(addedTwiceState.auswahl).toMatchObject(['a', 'b', 'c'])
  })

  it('removeBegriff remove begriff if available', () => {
    const newState = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: ['a', 'b', 'c'],
    })
    expect(
      ThemenbereichDialogReducer(newState, {
        type: 'removeBegriff',
        payload: 'a',
      }).auswahl
    ).toMatchObject(['b', 'c'])
    expect(
      ThemenbereichDialogReducer(newState, {
        type: 'removeBegriff',
        payload: 'd',
      }).auswahl
    ).toMatchObject(['a', 'b', 'c'])
  })

  it('setLinkedText action can change linked text', () => {
    const action = {
      type: 'setLinkedText',
      payload: 'new text',
    }
    const newState = ThemenbereichDialogReducer(initialState, action)
    expect(newState.linkedText).toBe('new text')
  })

  it('toggleCollapseIdentifier action toggles collapsed identifiers', () => {
    const payload = 'some-identifier'
    const action = {
      type: 'toggleCollapseIdentifier',
      payload,
    }
    const addedState = ThemenbereichDialogReducer(initialState, action)
    const removedState = ThemenbereichDialogReducer(addedState, action)
    expect(initialState.collapsed.has(action.payload)).toBeFalsy()
    expect(addedState.collapsed.has(action.payload)).toBeTruthy()
    expect(removedState.collapsed.has(action.payload)).toBeFalsy()
  })
})
