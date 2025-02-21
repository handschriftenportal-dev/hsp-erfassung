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

import { Repository } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Repository'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('Repository Test', () => {
  it('View -msIdentifier-repository', () => {
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
    }

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <Repository element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Staatsbibliothek zu Berlin')).toBeTruthy()
  })

  it('View -altIdentifier-repository', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'repository',
      region: 'altIdentifierformer',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-repository',
      component: '',
      level: 1,
      id: '464097.883407554',
      data_key: '16b7a17c-947f-378f-8e31-1dc75318706d',
      children: [
        {
          region: 'altIdentifierformer',
          text: 'Franckesche Stiftungen zu Halle. Archiv. Handschriftenhauptabteilung',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Repository element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(
      screen.getByText(
        'Franckesche Stiftungen zu Halle. Archiv. Handschriftenhauptabteilung'
      )
    ).toBeTruthy()
  })

  it('View in mspart', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'repository',
      region: 'msPartother',
      path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-repository',
      component: '',
      level: 1,
      id: '464097.883407554',
      data_key: '16b7a17c-947f-378f-8e31-1dc75318706d',
      children: [
        {
          region: 'msPartother',
          text: 'Franckesche Stiftungen zu Halle. Archiv. Handschriftenhauptabteilung',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Repository element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(
      screen.getByText(
        'Franckesche Stiftungen zu Halle. Archiv. Handschriftenhauptabteilung'
      )
    ).toBeTruthy()
  })
})
