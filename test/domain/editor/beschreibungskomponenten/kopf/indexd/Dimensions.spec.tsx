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

import { Dimensions } from '../../../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/Dimensions'
import { createErfassungsEditor } from '../../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../../TestContext'

const indexDimension = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: 'd83996a3-be62-474d-a980-fbd2c08a4221',
  data_indexName: 'norm_dimensions',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'afd09fc3-4d6d-49f1-9566-8391dbfd7cfc',
      data_type: 'dimensions',
      children: [
        {
          region: 'head',
          text: '22 x 12,5 x 11',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'c149768f-cd3c-43d1-a531-4e4224d4dea5',
      data_type: 'height',
      children: [
        {
          region: 'head',
          text: '22',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '5578eeff-23c3-42b5-b4be-559c5cade205',
      data_type: 'width',
      children: [
        {
          region: 'head',
          text: '12,5',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'd9167974-e111-470d-a648-638d959b088a',
      data_type: 'depth',
      children: [
        {
          region: 'head',
          text: '11',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '3520377c-8728-4f76-9878-6f26483a7ce9',
      data_type: 'dimensions_typeOfInformation',
      children: [
        {
          region: 'head',
          text: 'deduced',
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

describe('Index Dimension', () => {
  const editor = createErfassungsEditor()
  it('Index Dimension', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Dimensions element={indexDimension} />
        </Slate>
      </TestContext>
    )

    const radios: any = screen.getAllByRole('radio')
    expect(screen.getByDisplayValue('factual')).toBeTruthy()
    expect(screen.getByDisplayValue('11')).toBeTruthy()
    expect(screen.getByDisplayValue('12,5')).toBeTruthy()
    expect(screen.getByDisplayValue('22')).toBeTruthy()
    expect(screen.getByDisplayValue('22 x 12,5 x 11')).toBeTruthy()
    // erschlossen checked
    expect(radios[1].checked).toBeTruthy()
    expect(screen.getByDisplayValue('deduced')).toBeTruthy()
  })
})
