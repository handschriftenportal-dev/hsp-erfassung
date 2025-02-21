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

import { Collection } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Collection'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('Collection Test', () => {
  const editor = createErfassungsEditor()
  const text = {
    region: 'altIdentifier',
    text: 'Sammlung XYZ',
  }

  it('valid collection: altIdentifier-corpus', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Collection element={element} attributes={{} as any}>
            child
          </Collection>
        </Slate>
      </TestContext>
    )

    expect(screen.getByText(text.text)).toBeTruthy()
  })

  it('invalid collection: wrong path', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body--collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <Collection element={element} attributes={{} as any}>
        BaseElement
      </Collection>
    )

    expect(screen.getByText('BaseElement')).toBeTruthy()
  })

  it('unknown collection: region is not alt identifier corpus', () => {
    const element = {
      data_origin: 'collection' as const,
      region: 'INVALID_REGION',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
      component: '',
      level: 1,
      id: '194fef8e-89af-420f-8456-43ac1f91caf5',
      children: [text],
    }

    render(
      <Collection element={element} attributes={{} as any}>
        BaseElement
      </Collection>
    )

    expect(document.body.textContent).toBe('')
  })
})
