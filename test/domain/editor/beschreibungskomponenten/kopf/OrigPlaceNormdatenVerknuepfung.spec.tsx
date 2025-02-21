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

import { OrigPlaceNormdatenVerknuepfung } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/OrigPlaceNormdatenVerknuepfung'
import { writeDocument } from '../../../../../src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { OrigPlaceNormTermElement } from '../../../../../src/infrastructure/slate/TEI'
import { configureTestStore, TestContext } from '../../../../TestContext'

const origPlaceGndId = {
  data_origin: 'term',
  region: 'head',
  path: '#document-TEI-text-body-msDesc-head-index-term',
  component: '',
  level: 1,
  id: 'a7c26131-d40d-47c8-8227-f941e58a9b8d',
  data_type: 'origPlace_norm',
  data_ref: '123',
  data_key: '123',
  children: [
    {
      region: 'head',
      text: '4007405-5',
    },
  ],
} as unknown as OrigPlaceNormTermElement

describe('OrigPlaceNormdatenVerknuepfung Test', () => {
  const editor = createErfassungsEditor()

  it('OrigPlaceNormdatenVerknuepfung', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <OrigPlaceNormdatenVerknuepfung element={origPlaceGndId} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Normdaten', { exact: false })).toBeTruthy()
  })
})
