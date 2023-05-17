/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Author: Christoph Marten on 05.01.2022 at 08:41
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import { Collection } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Collection'

describe('Collection Test', () => {
  it('View altIdentifier-corpus', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
    const element =
      {
        'data_origin': 'collection',
        'region': 'altIdentifiercorpus',
        'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
        'component': '',
        'level': 1,
        'id': '194fef8e-89af-420f-8456-43ac1f91caf5',
        'children': [
          {
            'data_origin': 'textelement',
            'region': 'altIdentifiercorpus',
            'children': [
              {
                'region': 'altIdentifier',
                'text': 'Sammlung XYZ'
              }
            ]
          }
        ]
      }

    render(
      <TestContext>
        <Slate value={slateValue} onChange={() => {
        }}
               editor={editor}><Collection element={element}/></Slate></TestContext>)

    expect(document.body.innerHTML.includes('Corpus')).toBeTruthy()
  })
})
