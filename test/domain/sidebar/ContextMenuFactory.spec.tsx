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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'

import { writeDocument } from '../../../src/domain/erfassung/ErfassungsState'
import { ContextMenuFactory } from '../../../src/domain/sidebar/ContextMenuFactory'
import { SidebarEintragModel } from '../../../src/domain/sidebar/SidebarEintragFactory'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

describe('ContextMenuFactory Test', () => {
  const editor = createErfassungsEditor()
  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  const store = configureTestStore()
  store.dispatch(writeDocument())

  it('View ContextMenuFactory', async () => {
    const beschreibung: SidebarEintragModel = {
      id: '1',
      label: 'sidebar.section',
      teiElement: 'msItem',
      children: [],
      path: [],
      xmlpath: '#document-TEI-teiHeader-text',
      level: 0,
      parentId: 'msDesc',
      wrapperId: '',
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <ContextMenuFactory beschreibung={beschreibung} editor={editor} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByRole('menu')).toBeVisible()
    expect(screen.getByRole('openContextMenuButton')).toBeVisible()

    fireEvent.click(screen.getByRole('openContextMenuButton'))

    await waitFor(() => {
      expect(screen.getByRole('closeContextMenuButton')).toBeVisible()
    })
  })

  it('Note type=register is deletable and not duplicable', async () => {
    const register: SidebarEintragModel = {
      id: 'dcb02505-c006-4130-b6f2-665e7837bdf5',
      label: 'sidebar.content_register',
      teiElement: 'noteregister',
      children: [],
      path: [],
      xmlpath:
        '#document-TEI-text-body-msDesc-msPart-booklet-msContents-msItem-note',
      level: 8,
      parentId: '49e65385-066d-47b7-9457-878548dde8f5',
      wrapperId: '',
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <ContextMenuFactory beschreibung={register} editor={editor} />
        </Slate>
      </TestContext>
    )
    fireEvent.click(screen.getByRole('openContextMenuButton'))

    await waitFor(() => {
      expect(screen.getByLabelText(de.sidebar.delete_component)).toBeVisible()
      expect(screen.queryByLabelText(de.sidebar.duplicate)).toBeNull()
    })
  })
})
