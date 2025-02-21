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

import { render } from '@testing-library/react'
import { Slate } from 'slate-react'

import { AutocompleteNormdatenFromDataKey } from '../../../src/domain/editor/AutocompleteNormdatenFromDataKey'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../TestContext'

describe('AutocompleteNormdatenFromDataKey Test', () => {
  it('View AutocompleteNormdatenFromDataKey', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'repository',
      region: 'altIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
      component: '',
      level: 1,
      id: 'b97a66ca-f494-46ad-8b13-527370fcdff7',
      data_key: '654a4abc-3191-3e68-995b-4fdbd157cf9d',
      children: [
        {
          region: 'altIdentifier',
          text: 'Sankt Emmeram',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <AutocompleteNormdatenFromDataKey
            title="title"
            origin="origin"
            required={false}
            element={element}
          />
        </Slate>
      </TestContext>
    )

    expect(
      document.body.innerHTML.includes('Verknüpftes Normdatum')
    ).toBeTruthy()
  })
})
