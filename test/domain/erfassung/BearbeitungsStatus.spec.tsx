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

import { BearbeitungsStatus } from '../../../src/domain/erfassung/BearbeitungsStatus'
import {
  updateBeschreibung,
  updateConfiguration,
  updateIsFullscreen,
  updateMode,
} from '../../../src/domain/erfassung/ErfassungsState'
import { ViewMode } from '../../../src/domain/erfassung/ViewMode'
import { configureTestStore, TestContext } from '../../TestContext'

const beschreibung = {
  id: '1',
  kodid: '2',
  kodsignaturen: ['3', '4'],
  signature: 'hello world',
  subtype: 'medieval',
}

function storeSetup(mode: ViewMode) {
  const store = configureTestStore()
  store.dispatch(updateConfiguration({ isEditable: true }))
  store.dispatch(updateBeschreibung(beschreibung))
  store.dispatch(updateMode(mode))
  return store
}

describe('BearbeitungsStatus', () => {
  test.each([['previewMode'], ['normdataMode']] as [ViewMode][])(
    'Does not contain <h4> in %s',
    (mode) => {
      const store = storeSetup(mode)
      render(
        <TestContext store={store}>
          <BearbeitungsStatus />
        </TestContext>
      )
      expect(screen.queryByRole('heading')).toBeNull()
    }
  )

  test('Does contain <h4> in editMode', () => {
    const store = storeSetup('editMode')
    render(
      <TestContext store={store}>
        <BearbeitungsStatus />
      </TestContext>
    )
    expect(screen.getByRole('heading')).toBeVisible()
  })

  test('Contains Signature in full screen mode', () => {
    const store = storeSetup('editMode')
    store.dispatch(updateIsFullscreen(true))
    render(
      <TestContext store={store}>
        <BearbeitungsStatus />
      </TestContext>
    )
    expect(screen.getByRole('heading')).toHaveTextContent(
      beschreibung.signature
    )
  })
})
