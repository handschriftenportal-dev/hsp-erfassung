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
import React from 'react'
import { Slate } from 'slate-react'

import { Note } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/Note'
import {
  updateMode,
  writeDocument,
} from '../../../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../../../TestContext'

const noteElement = {
  data_origin: 'note',
  path: '#document-TEI-text-body-msDesc-head-note',
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  children: [
    {
      text: 'dolor sit amet',
    },
  ],
}

const emptyNoteElement = {
  data_origin: 'note',
  path: '#document-TEI-text-body-msDesc-head-note',
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  children: [
    {
      text: '',
    },
  ],
}

describe('Note Kopf', () => {
  const editor = createErfassungsEditor()

  it('Note musty', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Note
            attributes={{} as any}
            children={[]}
            element={emptyNoteElement}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('')).toBeTruthy()
  })

  it('Note', () => {
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Note element={noteElement} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByLabelText('Schlagzeile')).toBeVisible()
  })

  it('Empty note is not shown in read mode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))

    const { container } = render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Note
            attributes={{} as any}
            children={[]}
            element={emptyNoteElement}
          />
        </Slate>
      </TestContext>
    )

    expect(container.textContent).toBeFalsy()
  })
})
