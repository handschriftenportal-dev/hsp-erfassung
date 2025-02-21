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
import { ReactEditor, Slate } from 'slate-react'

import { Form } from '../../../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/Form'
import { createErfassungsEditor } from '../../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../../TestContext'

const indexElement = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: '3cbcd882-7a67-4f37-93d4-da02b3804ee8',
  data_indexName: 'norm',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'ea13e368-d4a1-49d9-90ed-08bc907870c6',
      data_type: 'form',
      children: [
        {
          region: 'head',
          text: '22 Bl.',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'f053cbf9-57fb-4a17-8bfc-336b34b8c37a',
      data_type: 'measure_noOfLeaves',
      children: [
        {
          region: 'head',
          text: '44',
        },
      ],
    },
  ],
}

const indexElementInMsPart = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-msPart-head-index',
  component: 'msPartbinding',
  level: 2,
  id: '82cfe725-dad7-43b4-875f-7113b4458cb2',
  data_indexName: 'norm_form',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-msPart-head-index-term',
      component: '',
      level: 2,
      id: '7286ea83-cdc5-4a28-9393-4af2e365ecff',
      data_type: 'form',
      children: [
        {
          region: 'head',
          text: 'binding',
        },
      ],
    },
  ],
}

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

describe('Index Form', () => {
  const editor = createErfassungsEditor()
  it('Index Form', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Form element={indexElement} />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('Form')).toBeTruthy()
    expect(() => screen.getByTitle('Löschen')).toThrow()
  })

  test('Index Form in MsPart', () => {
    ReactEditor.findPath = (_any1: any, _any2: any) => [0, 0]

    render(
      <TestContext>
        <Slate initialValue={[indexElementInMsPart]} editor={editor}>
          <Form element={indexElementInMsPart} />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('Form')).toBeTruthy()
    expect(screen.queryAllByTitle('Löschen')).toEqual([])
  })
})
