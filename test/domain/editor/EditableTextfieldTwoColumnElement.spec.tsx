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

import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { render } from '@testing-library/react'
import { TestContext } from '../../TestContext'
import React from 'react'
import { EditableTextfieldTwoColumnElement } from '../../../src/domain/editor/EditableTextfieldTwoColumnElement'
import i18next from 'i18next'

/**
 * Author: Christoph Marten on 30.12.2021 at 15:51
 */
describe('EditableTextfieldTwoColumnElement Test', () => {
  const editor = withReact(createEditor() as ReactEditor)

  const slateValue = [{
    type: 'paragraph',
    istop: false,
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  const element =
    {
      'data_origin': 'altIdentifier',
      'region': 'altIdentifier',
      'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
      'component': '',
      'level': 1,
      'id': '5276f915-5da8-450b-8235-b5618fa7c7b3',
      'data_type': 'corpus',
      'children': [
        {
          'data_origin': 'collection',
          'region': 'altIdentifier',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
          'component': '',
          'level': 1,
          'id': '194fef8e-89af-420f-8456-43ac1f91caf5',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'altIdentifier',
              'children': [
                {
                  'region': 'altIdentifier',
                  'text': 'Sammlung XYZ'
                }
              ]
            }
          ]
        },
        {
          'data_origin': 'idno',
          'region': 'altIdentifier',
          'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
          'component': '',
          'level': 1,
          'id': 'b5b63b39-092b-425d-a8d5-7a8b0a4505bc',
          'children': [
            {
              'data_origin': 'textelement',
              'region': 'altIdentifier',
              'children': [
                {
                  'region': 'altIdentifier',
                  'text': '123'
                }
              ]
            }
          ]
        }
      ]
    }

  it('EditableTextfieldTwoColumnElement', () => {
    render(<TestContext><Slate value={slateValue} onChange={() => {
    }} editor={editor}><EditableTextfieldTwoColumnElement helpertext={i18next.t('editor.corpus_name_not_empty')} error={true} marginBottom={'10px'} title={i18next.t('editor.corpus_name')} element={element} deleteParam={true}/></Slate></TestContext>)

    expect(document.body.innerHTML.includes('Corpusname')).toBeTruthy()
  })
})
