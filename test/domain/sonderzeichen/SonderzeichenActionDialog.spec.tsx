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

import { fireEvent, render, screen } from '@testing-library/react'

import { SonderzeichenActionDialog } from '../../../src/domain/sonderzeichen/SonderzeichenActionDialog'
import { SonderzeichenAuswahlState } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlState'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../TestContext'

describe('SonderzeichenActionDialog', () => {
  let onSubmit: jest.Mock
  let dispatch: jest.Mock
  const state = SonderzeichenAuswahlState.empty()
  beforeEach(() => {
    onSubmit = jest.fn()
    dispatch = jest.fn()
    render(
      <TestContext>
        <SonderzeichenActionDialog
          state={state}
          dispatch={dispatch}
          onSubmit={onSubmit}
        />
      </TestContext>
    )
  })

  it('has submit button', () => {
    expect(
      screen.getByRole('button', { name: de.special_character.submit_action })
    ).toBeVisible()
  })

  it('clicking submit button submits selected codepoint', () => {
    fireEvent.click(
      screen.getByRole('button', { name: de.special_character.submit_action })
    )
    expect(onSubmit).toHaveBeenCalled()
    const [call] = onSubmit.mock.lastCall
    expect(call).toBe(state.sonderzeichenKeys[state.auswahlIndex])
  })

  it('has favorite toggle button', () => {
    expect(
      screen.getByRole('button', {
        name: de.special_character.add_favorite_action_label,
      })
    ).toBeTruthy()
  })

  it('clicking favorite checkbox dispatches toggleFavorite action', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: de.special_character.add_favorite_action_label,
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({ type: 'toggleFavorite' })
  })
})
