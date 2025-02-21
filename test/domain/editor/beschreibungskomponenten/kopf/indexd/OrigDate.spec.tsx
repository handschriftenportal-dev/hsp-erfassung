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

import { OrigDate } from '../../../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/OrigDate'
import { createErfassungsEditor } from '../../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../../TestContext'

const indexOrigDate = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: '4b44ffbc-0733-4f94-9136-472b0824aa39',
  data_indexName: 'norm_origDate',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'df0f2292-ebbb-4124-a8f6-b4292fb91340',
      data_type: 'origDate',
      children: [
        {
          region: 'head',
          text: 'Anfang 15. Jahrhundert (Fasz. II)',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '99b5580e-e8cb-4329-835f-ca5f5632bcf4',
      data_type: 'origDate_notBefore',
      children: [
        {
          region: 'head',
          text: '1400',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '8c1f0aee-5067-417d-99f8-8eea5a4eccf5',
      data_type: 'origDate_notAfter',
      children: [
        {
          region: 'head',
          text: '1415',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'd9228a2f-7157-41b8-9dda-1f2a43db4d3b',
      data_type: 'origDate_type',
      children: [
        {
          region: 'head',
          text: 'datable',
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

describe('Index Origdate', () => {
  const editor = createErfassungsEditor()
  it('Index Origdate', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <OrigDate element={indexOrigDate} />
        </Slate>
      </TestContext>
    )

    expect(
      screen.getByDisplayValue('Anfang 15. Jahrhundert (Fasz. II)')
    ).toBeTruthy()
  })
})
