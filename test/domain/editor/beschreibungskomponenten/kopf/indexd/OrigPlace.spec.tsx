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
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { Slate } from 'slate-react'

import { OrigPlace } from '../../../../../../src/domain/editor/beschreibungskomponenten/kopf/indexd/OrigPlace'
import { createErfassungsEditor } from '../../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../../TestContext'

const indexOrigPlace = {
  data_origin: 'index',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index',
  component: '',
  level: 1,
  id: '4d0ba0a5-8940-45f4-8543-fac2da22c42f',
  data_indexName: 'norm_origPlace',
  children: [
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'c84a9220-f080-4d0a-9746-f269104260b5',
      data_type: 'origPlace',
      children: [
        {
          region: 'head',
          text: 'Konstanz, Bodenseeraum',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: 'a7c26131-d40d-47c8-8227-f941e58a9b8d',
      data_type: 'origPlace_norm',
      children: [
        {
          region: 'head',
          text: '4007405-5',
        },
      ],
    },
    {
      data_origin: 'term',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-index-term',
      component: '',
      level: 1,
      id: '6492d134-6d91-430d-b42b-f41957f20b1b',
      data_type: 'origPlace_norm',
      children: [
        {
          region: 'head',
          text: '4264875-5',
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

const server = setupServer(
  http.post('*', () =>
    HttpResponse.json({
      data: {
        findGNDEntityFactsByIds: [],
      },
    })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Index OrigPlace', () => {
  const editor = createErfassungsEditor()
  it('Index OrigPlace', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <OrigPlace element={indexOrigPlace} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('Konstanz, Bodenseeraum')).toBeTruthy()
  })
})
