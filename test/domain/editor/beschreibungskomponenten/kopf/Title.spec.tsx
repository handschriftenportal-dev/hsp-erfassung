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
import { Slate } from 'slate-react'

import { Title } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/Title'
import {
  updateMode,
  writeDocument,
} from '../../../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../../../TestContext'

const titleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  children: [
    {
      region: 'head',
      text: 'Lorem ipsum',
    },
  ],
}

const emptyTitleElement = {
  data_origin: 'title',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-title',
  component: '',
  level: 1,
  id: 'a857aeee-b583-4656-9c1e-415741d481b1',
  children: [
    {
      text: '',
    },
  ],
}

describe('Titel Kopf', () => {
  const editor = createErfassungsEditor()

  it('Title musty', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Title
            attributes={{} as any}
            children={[]}
            element={emptyTitleElement}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('')).toBeTruthy()
  })

  it('Title contains label "Titel andere Publikation"', () => {
    const { container } = render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Title attributes={{} as any} children={[]} element={titleElement} />
        </Slate>
      </TestContext>
    )

    const textContent = container.textContent || ''
    expect(textContent.includes('Titel andere Publikation')).toBeTruthy()
  })

  it('Empty title is not shown in read mode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))

    const { container } = render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Title
            attributes={{} as any}
            children={[]}
            element={emptyTitleElement}
          />
        </Slate>
      </TestContext>
    )

    const textContent = container.textContent || ''
    expect(textContent).toBe('')
  })
})
