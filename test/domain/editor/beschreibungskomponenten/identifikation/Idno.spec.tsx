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
import { render, screen } from '@testing-library/react'
import { TestContext } from '../../../../TestContext'
import { Idno } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Idno'

/**
 * Author: Christoph Marten on 05.01.2022 at 09:09
 */
describe('Idno Test', () => {
  it('View altIdentifier-copus', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
    const element = {
      'data_origin': 'idno',
      'region': 'altIdentifiercorpus',
      'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      'component': '',
      'level': 1,
      'id': 'XXXX',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'altIdentifiercorpus',
          'children': [
            {
              'region': 'altIdentifiercorpus',
              'text': 'Signatur 123'
            }
          ]
        }
      ]
    }

    render(
      <TestContext>
        <Slate value={slateValue} onChange={() => {
        }}
               editor={editor}><Idno element={element}/></Slate></TestContext>)

    expect(screen.getByText('Signatur 123')).toBeTruthy()
  })

  it('View -altIdentifier-former', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
    const element =
      {
        'data_origin': 'idno',
        'region': 'altIdentifierformer',
        'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
        'component': '',
        'level': 1,
        'id': 'XXXX',
        'children': [
          {
            'data_origin': 'textelement',
            'region': 'altIdentifierformer',
            'children': [
              {
                'region': 'altIdentifierformer',
                'text': 'Saarland Sig'
              }
            ]
          }
        ]
      }
    render(
      <TestContext>
        <Slate value={slateValue} onChange={() => {
        }}
               editor={editor}><Idno element={element}/></Slate></TestContext>)

    expect(screen.getByText('Saarland Sig')).toBeTruthy()
  })
  it('View altIdentifier-hsp-ID', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
    const element = {
      'data_origin': 'idno',
      'region': 'altIdentifierhsp-ID',
      'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      'component': '',
      'level': 1,
      'id': 'XXXX',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'altIdentifierhsp-ID',
          'children': [
            {
              'region': 'altIdentifierhsp-ID',
              'text': 'Saarland Sig12'
            }
          ]
        }
      ]
    }

    render(
      <TestContext>
        <Slate value={slateValue} onChange={() => {
        }}
               editor={editor}><Idno element={element}/></Slate></TestContext>)

    expect(screen.getByText('Saarland Sig12')).toBeTruthy()
  })
  it('View altIdentifier-mxml-ID', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      istop: false,
      children: [{ text: 'A line of text in a paragraph.' }],
    }]
    const element = {
      'data_origin': 'idno',
      'region': 'altIdentifiermxml-ID',
      'path': '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      'component': '',
      'level': 1,
      'id': 'XXXX',
      'children': [
        {
          'data_origin': 'textelement',
          'region': 'altIdentifiermxml-ID',
          'children': [
            {
              'region': 'altIdentifiermxml-ID',
              'text': 'MXML ID 123'
            }
          ]
        }
      ]
    }

    render(
      <TestContext>
        <Slate value={slateValue} onChange={() => {
        }}
               editor={editor}><Idno element={element}/></Slate></TestContext>)

    expect(screen.getByText('MXML ID 123')).toBeTruthy()
  })
})
