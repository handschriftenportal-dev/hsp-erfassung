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

import { BeschreibungsKomponenteIdentifikation } from '../../../../../src/domain/editor/beschreibungskomponenten/identifikation/BeschreibungsKomponenteIdentifikation'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('Identifikation Test', () => {
  it('View Identifikation as component', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        id: '123',
        component: 'msIdentifier',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <BeschreibungsKomponenteIdentifikation
            element={slateValue[0]}
            attributes={{} as any}
            children={[]}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Identifikation')).toBeVisible()
  })

  it('Hide Identifikation when not a component', () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        id: '123',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <BeschreibungsKomponenteIdentifikation
            element={slateValue[0]}
            attributes={{} as any}
            children={[]}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.queryByText('Identifikation')).toBeFalsy()
  })
})
