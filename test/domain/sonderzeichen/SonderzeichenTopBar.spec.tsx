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

import { act, fireEvent, render, screen } from '@testing-library/react'

import { SonderzeichenAuswahlState } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenTopBar } from '../../../src/domain/sonderzeichen/SonderzeichenTopBar'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../TestContext'

describe('SonderzeichenTopBar', () => {
  let dispatch: jest.Mock
  let onClose: jest.Mock
  const state = { ...SonderzeichenAuswahlState.empty(), suche: 'Suche' }
  beforeEach(() => {
    dispatch = jest.fn()
    onClose = jest.fn()
    render(
      <TestContext>
        <SonderzeichenTopBar
          state={state}
          dispatch={dispatch}
          onClose={onClose}
        />
      </TestContext>
    )
  })

  it('has title', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      de.special_character.title
    )
  })

  it('pressing close button sends close event', () => {
    fireEvent.click(
      screen.getByRole('button', { name: de.special_character.close_action })
    )
    expect(onClose).toHaveBeenCalled()
  })

  it('search field contains suche text of state', () => {
    expect(screen.getByRole('textbox')).toHaveValue('Suche')
  })

  it('changing the search text triggers after debounce time', async () => {
    await act(() =>
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Search' },
      })
    )
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({ payload: 'Search', type: 'setSuche' })
  })
})
