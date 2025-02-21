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
import { Slate } from 'slate-react'

import { KomponenteLoeschenDialog } from '../../../src/domain/sidebar/KomponenteLoeschenDialog'
import { SidebarEintragModel } from '../../../src/domain/sidebar/SidebarEintragFactory'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../TestContext'

describe('Komponente Löschen Dialog', () => {
  const callback = jest.fn()
  beforeEach(() => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const beschreibungsKomponente: SidebarEintragModel = {
      children: [],
      id: '',
      label: '',
      level: 0,
      parentId: '',
      path: [0],
      teiElement: '',
      wrapperId: '',
      xmlpath: '',
    }
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <KomponenteLoeschenDialog
            editor={editor}
            beschreibung={beschreibungsKomponente}
            callback={callback}
          />
        </Slate>
      </TestContext>
    )
  })

  it('renders "Löschen" button', () => {
    expect(screen.getByRole('button', { name: 'Löschen' })).toBeVisible()
  })

  it('clicking "Löschen" button executes callback', async () => {
    const button = screen.getByRole('button', { name: 'Löschen' })
    await act(async () => {
      fireEvent.click(button)
    })
    expect(callback.mock.calls.length).toBe(1)
  })
})
