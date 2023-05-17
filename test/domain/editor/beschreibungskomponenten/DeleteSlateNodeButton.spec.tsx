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
 * Author: Christoph Marten on 31.01.2022 at 08:08
 */
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../TestContext'
import React from 'react'
import { DeleteSlateNodeButton } from '../../../../src/domain/editor/DeleteSlateNodeButton'

const origDate = {
  'data_origin': 'index',
  'region': 'head',
  'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index',
  'component': '',
  'level': 3,
  'id': 'd29653dc-504e-4046-8298-e3029c14bdbb',
  'data_indexName': 'norm_origDate',
  'children': [
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': '77be02f4-2a1d-4065-9462-9120e9fa9ff0',
      'data_type': 'origDate',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': 'Anfang 9. Jh.'
            }
          ]
        }
      ]
    },
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': '388a65bd-0e9c-405c-8fc5-cca56649f510',
      'data_type': 'origDate_notBefore',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': '0801'
            }
          ]
        }
      ]
    },
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': '87db515d-c6b5-4b43-a77e-a7fe44a81ee1',
      'data_type': 'origDate_notAfter',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': '0815'
            }
          ]
        }
      ]
    },
    {
      'data_origin': 'term',
      'region': 'head',
      'path': '#document-TEI-text-body-msDesc-msPart-msPart-head-index-term',
      'component': '',
      'level': 3,
      'id': 'a8d3fe93-1cf9-4e45-a8a2-bdc66f67e2a4',
      'data_type': 'origDate_type',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'head',
          'children': [
            {
              'region': 'head',
              'text': 'datable'
            }
          ]
        }
      ]
    }
  ]
}

const slateValue = [{
  type: 'paragraph',
  istop: false,
  children: [{ text: 'A line of text in a paragraph.' }],
}]

describe('DeleteSlateNodeButton', () => {
  const editor = withReact(createEditor() as ReactEditor)
  it('DeleteSlateNodeButton', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><DeleteSlateNodeButton node={origDate}/></Slate></TestContext>)

    expect(screen.getByTitle('Löschen')).toBeTruthy()
  })

})
