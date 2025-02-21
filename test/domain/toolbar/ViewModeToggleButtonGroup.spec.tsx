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

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { updateMode } from '../../../src/domain/erfassung/ErfassungsState'
import { ViewModeToggleButtonGroup } from '../../../src/domain/toolbar/ViewModeToggleButtonGroup'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from '../../TestContext'

describe('ViewModeToggleButtonGroup', () => {
  it('shows two buttons', () => {
    render(
      <TestContext>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('selects description button if in previewMode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.toolbar.show_description })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('selects normdata button if in normdataMode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('normdataMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: de.toolbar.show_description })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('can change mode from description to normdata mode', async () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.show_normdata_view })
    )
    expect(store.getState().erfassung.mode).toBe('normdataMode')
  })

  it('can change mode from normdata to description mode', async () => {
    const store = configureTestStore()
    store.dispatch(updateMode('normdataMode'))
    render(
      <TestContext store={store}>
        <ViewModeToggleButtonGroup />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.toolbar.show_description })
    )
    expect(store.getState().erfassung.mode).toBe('previewMode')
  })
})
