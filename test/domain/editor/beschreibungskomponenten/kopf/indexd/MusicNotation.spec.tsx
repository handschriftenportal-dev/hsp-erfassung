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

/**
 * Author: Christoph Marten on 31.01.2022 at 08:53
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../../TestContext'
import React from 'react'
import { MusicNotation } from '../../../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/MusicNotation'

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
      data_type: 'measure',
      children: [
        {
          data_origin: 'textelement',
          region: 'head',
          children: [
            {
              region: 'head',
              text: '22 Bl.',
              showtei: false
            }
          ],
          showtei: false
        }
      ],
      showtei: false
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
          data_origin: 'textelement',
          region: 'head',
          children: [
            {
              region: 'head',
              text: '44',
              showtei: false
            }
          ],
          showtei: false
        }
      ],
      showtei: false
    }
  ],
  showtei: false
}

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

describe('Index Musicnotation', () => {
  const editor = withReact(createEditor() as ReactEditor)
  it('Index Musicnotation', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><MusicNotation element={indexElement}/></Slate></TestContext>)

    expect(screen.getByDisplayValue('yes')).toBeTruthy()
    expect(screen.getByDisplayValue('no')).toBeTruthy()
    expect(screen.getByDisplayValue('')).toBeTruthy()
  })
})
