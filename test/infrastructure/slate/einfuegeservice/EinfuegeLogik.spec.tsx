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

import { act, render, screen } from '@testing-library/react'
import { Editor, Element } from 'slate'
import { Editable, Slate } from 'slate-react'

import { EditableTextfieldTwoColumnElement } from '../../../../src/domain/editor/EditableTextfieldTwoColumnElement'
import { SonderzeichenAPI } from '../../../../src/domain/sonderzeichen/SonderzeichenAPI'
import { EinfuegeLogik } from '../../../../src/infrastructure/slate/einfuegeservice/EinfuegeLogik'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { extractText } from '../../../../src/infrastructure/slate/SlateNormdataBoundary'
import { VolltextEditorElement } from '../../../../src/infrastructure/slate/volltext/VolltextEditorElement'
import { createVolltextEditor } from '../../../../src/infrastructure/slate/volltext/VolltextEditorFactory'
import { TestContext } from '../../../TestContext'

const character = SonderzeichenAPI.getSonderzeichen('U+2020')

describe('EinfuegeLogik', () => {
  it('For EditableTextfieldTwoColumnElement', async () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'collection',
      children: [
        {
          text: '',
        },
      ],
    }
    render(
      <Slate initialValue={[element]} editor={editor}>
        <Editable>
          <EditableTextfieldTwoColumnElement
            label={'Label'}
            element={element}
          />
        </Editable>
      </Slate>
    )

    const input: any = screen.getByRole('textbox')
    // jestdom doesn't simulate setSelectionRange, we have to mock it
    input.setSelectionRange = jest.fn()

    await act(async () => {
      EinfuegeLogik.forTarget({
        type: 'element',
        editor: editor,
        element: Editor.node(editor, [0, 0])[0] as Element,
        input: input,
        selection: 0,
      })(character)
    })

    expect(screen.getByRole('textbox')).toHaveTextContent(character.sign)
    expect(extractText(Editor.node(editor, [])[0])).toBe(character.sign)
  })

  it('character char into editor', async () => {
    const initialValue = VolltextEditorElement.emptyVolltext().content
    const editor = createVolltextEditor()
    render(
      <TestContext>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable />
        </Slate>
      </TestContext>
    )

    await act(async () => {
      EinfuegeLogik.forTarget({
        type: 'editor',
        editor: editor,
        selection: {
          anchor: { path: [0, 0], offset: 0 },
          focus: { path: [0, 0], offset: 0 },
        },
      })(character)
    })

    expect(screen.getByRole('textbox')).toHaveTextContent(character.sign)
    expect(extractText(Editor.node(editor, [])[0])).toBe(character.sign)
  })
})
