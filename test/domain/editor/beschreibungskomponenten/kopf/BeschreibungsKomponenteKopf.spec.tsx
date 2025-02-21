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

import { BeschreibungsKomponenteKopf } from '../../../../../src/domain/editor/beschreibungskomponenten/kopf/BeschreibungsKomponenteKopf'
import { createErfassungsEditor } from '../../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../../../TestContext'

describe('BeschreibungsKomponenteKopf Test', () => {
  it('BeschreibungsKomponenteKopf in Edit Mode', () => {
    const editor = createErfassungsEditor()
    const element = {
      type: 'paragraph',
      data_origin: 'paragraph',
      id: 'Hallo',
      children: [{ text: 'A line of text in a paragraph.' }],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <BeschreibungsKomponenteKopf
            element={element}
            attributes={{} as any}
            children={[]}
          />
        </Slate>
      </TestContext>
    )
    expect(screen.getByText('Kopf')).toBeVisible()
  })
})
