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

import { SelectionToolbar } from '../../../../src/domain/editor/selectiontoolbar/SelectionToolbar'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../TestContext'

describe('SelectionToolbar', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        path: '#document-msItem',
        component: 'msItemmusic',
        data_class: 'music',
        children: [
          {
            data_origin: 'note',
            region: 'msItem',
            path: '#document-msItem-note',
            component: '',
            children: [
              {
                region: 'msItem',
                text: 'et dolore magna',
              },
            ],
          },
        ],
      },
    ]
    editor.children = slateValue

    render(
      <TestContext>
        <SelectionToolbar editor={editor} />
      </TestContext>
    )
  })

  it('contains button to reference normdata', () => {
    expect(
      screen.getByRole('button', { name: 'Normdaten verknüpfen' })
    ).toBeTruthy()
  })
})
