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

import { render, waitFor } from '@testing-library/react'
import { Node, Text, Transforms } from 'slate'
import { Slate } from 'slate-react'

import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'

function editorContains(node: Node, origin: string): boolean {
  return (
    !Text.isText(node) &&
    (node.data_origin === origin ||
      node.children.some((child) => editorContains(child, origin)))
  )
}

describe('Erfassungs Editor', () => {
  const editor = createErfassungsEditor()
  test('can be created', () => {
    expect(editor).toBeTruthy()
  })
  test('recognizes p as non void element', () => {
    expect(editor.isVoid({ data_origin: 'p', children: [{ text: '' }] })).toBe(
      false
    )
  })
})

describe('msContents normalization', () => {
  const editor = createErfassungsEditor()
  const nestedMsItems = {
    data_origin: 'msDesc',
    children: [
      {
        data_origin: 'msContents',
        children: [
          {
            data_origin: 'msItem',
            children: [
              {
                data_origin: 'msItem',
                children: [
                  {
                    data_origin: 'note',
                    children: [{ text: 'I will be deleted' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }

  test('Normalizing removes empty msItems', () => {
    render(
      <Slate initialValue={[nestedMsItems]} editor={editor}>
        <span />
      </Slate>
    )
    waitFor(() => Transforms.delete(editor, { at: [0, 0, 0, 0, 0] }))
    expect(editorContains(editor, 'msItem')).toBeFalsy()
  })
  test('Normalizing removes empty msContents', () => {
    render(
      <Slate initialValue={[nestedMsItems]} editor={editor}>
        <span />
      </Slate>
    )
    waitFor(() => Transforms.delete(editor, { at: [0, 0, 0, 0, 0] }))
    expect(editorContains(editor, 'msContents')).toBeFalsy()
  })

  const msContentsWithTextLang = {
    data_origin: 'msDesc',
    children: [
      {
        data_origin: 'msContents',
        children: [
          {
            data_origin: 'textLang',
            children: [{ text: 'I should be ignored' }],
          },
          {
            data_origin: 'msItem',
            children: [
              {
                data_origin: 'textLang',
                children: [{ text: 'I should be ignored' }],
              },
              {
                data_origin: 'note',
                children: [{ text: 'I will be deleted' }],
              },
            ],
          },
        ],
      },
    ],
  }
  test('ignores textLang', () => {
    render(
      <Slate initialValue={[msContentsWithTextLang]} editor={editor}>
        <span />
      </Slate>
    )
    waitFor(() => Transforms.delete(editor, { at: [0, 0, 1, 1] }))
    expect(editorContains(editor, 'msContents')).toBeFalsy()
  })
})
