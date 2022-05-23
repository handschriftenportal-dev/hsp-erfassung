/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import { ReactEditor, Slate, withReact } from 'slate-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import { BeschreibungsKomponente } from '../../../src/domain/sidebar/BeschreibungsKomponenteFactory'
import { ContextMenuFactory } from '../../../src/domain/sidebar/ContextMenuFactory'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { writeDocument } from '../../../src/domain/erfassung/ErfassungsState'
import '@testing-library/jest-dom'
import { createEditor } from 'slate'
import React from 'react'


describe('ContextMenuFactory Test', () => {
  it('View ContextMenuFactory', async () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    const store = ConfigureStore

    store.dispatch(writeDocument(true))

    const beschreibung: BeschreibungsKomponente = {
      id: '1',
      label: 'Inhalt Text',
      teiElement: 'msItem',
      children: [],
      path: [],
      copied: false,
      xmlpath: '#document-TEI-teiHeader-text',
      level: 0,
      parent: 'msDesc',
      wrapperID: '',
    }

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }}
                 editor={editor}><ContextMenuFactory beschreibung={beschreibung} editor={editor}/></Slate>
        </TestContext>)

    expect(screen.getByRole('contextmenu')).toBeVisible()
    expect(screen.getByRole('openContextMenuButton')).toBeVisible()

    fireEvent.click(screen.getByRole('openContextMenuButton'))

    await waitFor(() => {
      expect(screen.getByRole('closeContextMenuButton')).toBeVisible()
    })
  })
})
