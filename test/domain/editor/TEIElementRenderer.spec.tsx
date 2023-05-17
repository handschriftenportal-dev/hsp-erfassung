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

import { render as rendertei } from '../../../src/domain/editor/TEIElementRenderer'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { TestContext } from '../../TestContext'

test('TEI Element Rendering render textelement', () => {
  const result: any = rendertei({
    element: {
      data_origin: 'textelement',
    },
    children: 'Hello Slate'
  }, {}, '')

  render(result, {})

  expect(screen.getByText('Hello Slate')).toBeVisible()
})

test('TEI Element Rendering render Title in head', () => {
  const editor = withReact(createEditor() as ReactEditor)

  const result: any = rendertei({
    element: {
      data_origin: 'title',
      region: 'head',
      path: '#document-TEI-text-body-msDesc-head-title',
      children: [
        {
          data_origin: 'textelement',
          region: 'head',
          children: [{
            text: '___HANDSCHRIFTENTITEL__',
            region: 'head'
          }]
        }
      ]
    }
  }, {}, '')

  console.log(result)

  render(<TestContext><Slate value={[]}
                             onChange={() => {
                             }}
                             editor={editor}>{result}</Slate></TestContext>)

  expect(screen.getByText('Titel Vorlage:')).toContainHTML('<span>Titel Vorlage: </span>')
})

test('TEI Element Rendering render teiHeader without visibility', () => {

  const result: any = rendertei({
    element: {
      data_origin: 'msDesc',
    },
    children: 'Hello Slate'
  }, { teiEnabled: 'teiEnabled', teiDisabled: 'teiDisable', xmlTag: 'xmlTag' }, '')

  render(result)
  expect(screen.getAllByText('Hello Slate', { exact: false, })[0]).toBeVisible()
})

test('TEI Element Rendering render teiHeader with visibility', () => {

  const result: any = rendertei({
    test: true,
    element: {
      data_origin: 'msIdentifier',
      showtei: true,
    },
    children: 'Hello Slate'
  }, { teiEnabled: 'teiEnabled', teiDisabled: 'teiDisable', xmlTag: 'xmlTag' }, '')

  render(result)
  expect(screen.getByTestId('tei')).toHaveAttribute('contenteditable', 'false')
  expect(screen.getByTestId('tei')).toHaveAttribute('class', 'teiEnabled')
})
