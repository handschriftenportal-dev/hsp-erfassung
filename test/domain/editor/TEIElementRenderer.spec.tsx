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

import { selectRenderer } from '../../../src/domain/editor/TEIElementRenderer'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../TestContext'

describe('TEIElementRenderer', () => {
  it('TEI Element Rendering render Title in head', () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'title',
      component: 'head',
      children: [
        {
          text: '___HANDSCHRIFTENTITEL__',
        },
      ],
    }

    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          {selectRenderer('editMode')({
            element,
            children: <>Test</>,
            attributes: {
              'data-slate-node': 'element',
              ref: null,
            },
          })}
        </Slate>
      </TestContext>
    )

    expect(screen.getByText('Kopf')).toBeVisible()
  })

  test('TEI Element Rendering render teiHeader without visibility', () => {
    render(
      selectRenderer('editMode')({
        element: {
          data_origin: 'msDesc',
          children: [{ text: '' }],
        },
        children: <>Hello Slate</>,
        attributes: {
          'data-slate-node': 'element',
          ref: null,
        },
      })
    )

    expect(screen.getByText('Hello Slate')).toBeVisible()
  })
})
