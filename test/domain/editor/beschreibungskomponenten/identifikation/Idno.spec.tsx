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
import { Slate } from 'slate-react'

import { Idno } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Idno'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('Idno Test', () => {
  it('View altIdentifier-copus', () => {
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
      data_origin: 'idno',
      region: 'altIdentifiercorpus',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifiercorpus',
          text: 'Signatur 123',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Signatur 123')).toBeTruthy()
  })

  it('View -altIdentifier-former', () => {
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
      data_origin: 'idno',
      region: 'altIdentifierformer',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifierformer',
          text: 'Saarland Sig',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland Sig')).toBeTruthy()
  })
  it('View altIdentifier-hsp-ID', () => {
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
      data_origin: 'idno',
      region: 'altIdentifierhsp-ID',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifierhsp-ID',
          text: 'Saarland Sig12',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland Sig12')).toBeTruthy()
  })
  it('View altIdentifier-mxml-ID', () => {
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
      data_origin: 'idno',
      region: 'altIdentifiermxml-ID',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno',
      component: '',
      level: 1,
      id: 'XXXX',
      children: [
        {
          region: 'altIdentifiermxml-ID',
          text: 'MXML ID 123',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Idno element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('MXML ID 123')).toBeTruthy()
  })
})
