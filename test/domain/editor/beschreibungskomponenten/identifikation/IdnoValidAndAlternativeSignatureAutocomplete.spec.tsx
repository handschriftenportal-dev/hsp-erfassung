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

import { IdnoValidAndAlternativeSignatureAutocomplete } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/IdnoValidAndAlternativeSignatureAutocomplete'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('IdnoValidAndAlternativeSignatureAutocomplete Test', () => {
  it('View IdnoValidAndAlternativeSignatureAutocomplete', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        istop: false,
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const element = {
      data_origin: 'msIdentifier',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier',
      component: 'msIdentifier',
      level: 1,
      id: '72bf694e-e16b-45aa-9f0e-ae7706234583',
      children: [
        {
          data_origin: 'settlement',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
          component: '',
          level: 1,
          id: 'e6616b7b-bc08-462b-831f-03306883a717',
          data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
          children: [
            {
              region: 'msIdentifier',
              text: 'Berlin',
            },
          ],
        },
        {
          data_origin: 'repository',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-repository',
          component: '',
          level: 1,
          id: '956eb237-7c68-4651-bf39-f2097315f6af',
          data_key: '6790851b-9519-3874-a9fd-0839d494a3c9',
          children: [
            {
              region: 'msIdentifier',
              text: 'Staatsbibliothek zu Berlin',
            },
          ],
        },
        {
          data_origin: 'idno',
          region: 'msIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-idno',
          component: '',
          level: 1,
          id: 'ee1524af-0f0b-4eae-91a3-36d23da9991c',
          children: [
            {
              region: 'msIdentifier',
              text: 'dolor sit amet',
            },
          ],
        },
        {
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
        },
        {
          data_origin: 'altIdentifier',
          region: 'altIdentifier',
          path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier',
          component: '',
          level: 1,
          id: 'cbcf04a8-ef96-4f8d-bfc7-45ae5d97a055',
          data_type: 'hsp-ID',
          children: [
            {
              data_origin: 'collection',
              region: 'altIdentifier',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection',
              component: '',
              level: 1,
              id: 'ecfc5f1b-f0fe-4ffc-a636-938d3aea61a5',
              children: [
                {
                  region: 'altIdentifier',
                  text: 'Handschriftenportal Kulturobjektdokument-ID',
                },
              ],
            },
            {
              data_origin: 'idno',
              region: 'altIdentifier',
              path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
              component: '',
              level: 1,
              id: '64adffeb-e240-477f-950a-a9b8f54bcb3e',
              children: [
                {
                  region: 'altIdentifier',
                  text: 'HSP_123456-a7891234-a56789',
                },
              ],
            },
          ],
        },
        {
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
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <IdnoValidAndAlternativeSignatureAutocomplete
            element={element}
            attributes={{} as any}
            children={[]}
          />
        </Slate>
      </TestContext>
    )

    expect(document.body.innerHTML.includes('Signatur')).toBeTruthy()
  })
})
