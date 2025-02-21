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

import { updateSidebarComponentType } from '../../../src/domain/erfassung/ErfassungsState'
import { SidebarComponentType } from '../../../src/domain/sidebar/SidebarComponentType'
import { ToggleSonderzeichenButton } from '../../../src/domain/toolbar/ToggleSonderzeichenButton'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from '../../TestContext'

describe('ToggleSonderzeichenButton', () => {
  it('renders a button', () => {
    render(
      <TestContext>
        <ToggleSonderzeichenButton />
      </TestContext>
    )
    expect(screen.getByRole('button')).toBeVisible()
  })

  describe('while in structural view', () => {
    let store: ReturnType<typeof configureTestStore>

    beforeEach(() => {
      store = configureTestStore()
      store.dispatch(updateSidebarComponentType(SidebarComponentType.struktur))
      render(
        <TestContext store={store}>
          <ToggleSonderzeichenButton />
        </TestContext>
      )
    })

    it('has title to switch to special character selection', () => {
      expect(
        screen.getByRole('button', { name: de.toolbar.show_special_character })
      ).toBeVisible()
    })

    it('pressing the button switches to special character view', async () => {
      await act(async () => fireEvent.click(screen.getByRole('button')))
      expect(store.getState().erfassung.sidebarComponentType).toBe(
        SidebarComponentType.sonderzeichen
      )
    })
  })

  describe('while in special character selection', () => {
    let store: ReturnType<typeof configureTestStore>

    beforeEach(() => {
      store = configureTestStore()
      store.dispatch(
        updateSidebarComponentType(SidebarComponentType.sonderzeichen)
      )
      render(
        <TestContext store={store}>
          <ToggleSonderzeichenButton />
        </TestContext>
      )
    })

    it('has title to switch to special character selection', () => {
      expect(
        screen.getByRole('button', { name: de.toolbar.show_structural_view })
      ).toBeVisible()
    })

    it('pressing the button switches to structural view', async () => {
      await act(async () => fireEvent.click(screen.getByRole('button')))
      expect(store.getState().erfassung.sidebarComponentType).toBe(
        SidebarComponentType.struktur
      )
    })
  })
})
