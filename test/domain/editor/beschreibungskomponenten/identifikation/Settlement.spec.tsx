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

import { Settlement } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/Settlement'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('Settlement Test', () => {
  it('View msIdentifier-settlement', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'msIdentifier',
      path: '#document-TEI-text-body-msDesc-msIdentifier-settlement',
      component: '',
      level: 1,
      id: '58179ce0-c53b-40ba-9e4e-ce964c02f343',
      data_key: 'ee1611b6-1f56-38e7-8c12-b40684dbb395',
      children: [
        {
          region: 'msIdentifier',
          text: 'Berlin',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Berlin')).toBeTruthy()
  })

  it('View -altIdentifier-settlement', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'altIdentifierformer',
      path: '#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-settlement',
      component: '',
      level: 1,
      id: 'f64b21d5-35cb-48a2-9e67-97013ed88148',
      data_key: '97a083ca-e383-3158-871c-fdbaefb52f4d',
      children: [
        {
          region: 'altIdentifierformer',
          text: 'Saarland',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland')).toBeTruthy()
  })

  it('View in mspart', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'settlement',
      region: 'msPartother',
      path: '#document-TEI-text-body-msDesc-msPart-msIdentifier-settlement',
      component: '',
      level: 1,
      id: 'f64b21d5-35cb-48a2-9e67-97013ed88148',
      data_key: '97a083ca-e383-3158-871c-fdbaefb52f4d',
      children: [
        {
          region: 'msPartother',
          text: 'Saarland',
        },
      ],
    }
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Settlement element={element} attributes={{} as any} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Saarland')).toBeTruthy()
  })
})
