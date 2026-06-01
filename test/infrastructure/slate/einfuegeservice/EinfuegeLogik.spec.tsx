import { act, render, screen } from '@testing-library/react'
import type { Element } from 'slate'
import { Editor } from 'slate'
import { Editable, Slate } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { SonderzeichenAPI } from 'src/domain/sonderzeichen/SonderzeichenAPI'
import { EinfuegeLogik } from 'src/infrastructure/slate/einfuegeservice/EinfuegeLogik'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'
import { createVolltextEditor } from 'src/infrastructure/slate/volltext/VolltextEditorFactory'
import { TestContext } from 'test/TestContext'

const character = SonderzeichenAPI.getSonderzeichen('U+2020')

describe('EinfuegeLogik', () => {
  it('For LabelledTextField', async () => {
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
          <LabelledTextField label={'Label'} element={element} />
        </Editable>
      </Slate>
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
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
    expect(HSPNode.extractText(Editor.node(editor, [])[0])).toBe(character.sign)
  })

  it('does not trim trailing spaces in textfields', async () => {
    const editor = createErfassungsEditor()
    const element = {
      data_origin: 'collection',
      children: [
        {
          text: '> ',
        },
      ],
    }
    render(
      <Slate initialValue={[element]} editor={editor}>
        <Editable>
          <LabelledTextField label={'Label'} element={element} />
        </Editable>
      </Slate>
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    // jestdom doesn't simulate setSelectionRange, we have to mock it
    input.setSelectionRange = jest.fn()

    await act(async () => {
      EinfuegeLogik.forTarget({
        type: 'element',
        editor: editor,
        element: Editor.node(editor, [0, 0])[0] as Element,
        input: input,
        selection: 2,
      })(character)
    })

    expect(screen.getByRole('textbox')).toHaveTextContent('> ' + character.sign)
    expect(HSPNode.extractText(Editor.node(editor, [])[0])).toBe(
      '> ' + character.sign
    )
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
    expect(HSPNode.extractText(Editor.node(editor, [])[0])).toBe(character.sign)
  })
})
