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

import { AltIdentifier } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/AltIdentifier'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('AltIdentifier Test', () => {
  const editor = createErfassungsEditor()

  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  const formerElement = {
    data_origin: 'altIdentifier',
    region: 'altIdentifier',
    path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
    component: '',
    level: 1,
    id: '9adf8ac6-b986-41c4-879c-11f6054f3329',
    data_type: 'former',
    children: [
      {
        data_origin: 'settlement',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
        component: '',
        level: 1,
        id: 'c2a1fd21-be7a-4b76-b92d-6497f13d7a76',
        data_key: '26cf9267-82fe-3bf1-a37a-c9960658499f',
        children: [
          {
            region: 'altIdentifier',
            text: 'Regensburg',
          },
        ],
      },
      {
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
      },
      {
        data_origin: 'idno',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
        component: '',
        level: 1,
        id: '21e1f74b-0549-4512-846d-236dbca52b20',
        children: [
          {
            region: 'altIdentifier',
            text: 'St. Emm 57',
          },
        ],
      },
    ],
  }

  const corpusElement = {
    data_origin: 'altIdentifier',
    region: 'altIdentifier',
    path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
    component: '',
    level: 1,
    id: '5276f915-5da8-450b-8235-b5618fa7c7b3',
    data_type: 'corpus',
    children: [
      {
        data_origin: 'collection',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
        component: '',
        level: 1,
        id: '194fef8e-89af-420f-8456-43ac1f91caf5',
        children: [
          {
            region: 'altIdentifier',
            text: 'Sammlung XYZ',
          },
        ],
      },
      {
        data_origin: 'idno',
        region: 'altIdentifier',
        path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
        component: '',
        level: 1,
        id: 'b5b63b39-092b-425d-a8d5-7a8b0a4505bc',
        children: [
          {
            region: 'altIdentifier',
            text: '123',
          },
        ],
      },
    ],
  }

  it('AltIdentifier Sammlung', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <AltIdentifier element={corpusElement} attributes={{} as any}>
            child
          </AltIdentifier>
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Corpus')).toBeTruthy()
  })
  it('AltIdentifier Vorbesitzer', () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <AltIdentifier element={formerElement} attributes={{} as any}>
            child
          </AltIdentifier>
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Vorbesitzsignatur')).toBeTruthy()
  })
})
