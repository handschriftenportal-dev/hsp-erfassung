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
import userEvent from '@testing-library/user-event'
import { FC, PropsWithChildren } from 'react'
import { Descendant, Editor, Element, Node, Transforms } from 'slate'
import { Editable, Slate } from 'slate-react'

import { useDialog } from '../../../../src/domain/editor/normdaten/useDialog'
import {
  updateConfiguration,
  updateMode,
} from '../../../../src/domain/erfassung/ErfassungsState'
import { VolltextSemantik } from '../../../../src/domain/erfassung/VolltextSemantik'
import de from '../../../../src/infrastructure/i18n/translation_de.json'
import { createVolltextEditor } from '../../../../src/infrastructure/slate/volltext/VolltextEditorFactory'
import { VolltextReferenz } from '../../../../src/infrastructure/slate/volltext/VolltextElement'
import { configureTestStore, TestContext } from '../../../TestContext'

interface CreateProps {
  editor: Editor
  type: VolltextSemantik
}

const CreateDialog: FC<PropsWithChildren<CreateProps>> = ({ editor, type }) => {
  const { openCreateDialogHandler } = useDialog(editor)
  return <button onClick={openCreateDialogHandler(type)}>Open Dialog</button>
}

interface EditProps {
  editor: Editor
  element: VolltextReferenz
  initialValue: Descendant[]
}

const EditDialog: FC<PropsWithChildren<EditProps>> = ({
  editor,
  element,
  initialValue,
}) => {
  const { openEditDialogHandler } = useDialog(editor)
  return (
    <>
      <button onClick={openEditDialogHandler(element)}>Open Dialog</button>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable></Editable>
      </Slate>
    </>
  )
}

function slateValue(node?: Node) {
  const paragraph = { data_origin: 'paragraph' }
  if (Element.isElement(node)) {
    return [{ ...paragraph, children: [{ text: '' }, node, { text: '' }] }]
  } else if (node === undefined) {
    return [{ ...paragraph, children: [{ text: 'hallo welt' }] }]
  } else {
    return [{ ...paragraph, children: [node] }]
  }
}

function createNormdatum(
  type: VolltextReferenz['data_origin'],
  data_origin: string
): [VolltextReferenz['data_origin'], string, VolltextReferenz] {
  const element = {
    data_origin: type,
    box: {
      data_origin,
      data_ref: 'ref',
      children: [{ text: 'text' }],
    },
    content: 'text',
    children: [{ text: '' }],
  } as VolltextReferenz

  return [type, data_origin, element]
}

describe('useDialog', () => {
  const url = 'https://some-url'
  const appendix = '_appendix'

  describe('externer link', () => {
    const { save, linked_text, linked_url, open_link } = de.externer_link_dialog
    describe('create dialog', () => {
      it('extracts selected text from editor', async () => {
        const editor = createVolltextEditor()
        editor.children = slateValue()
        Transforms.select(editor, {
          anchor: { path: [0, 0], offset: 0 },
          focus: { path: [0, 0], offset: 6 },
        })
        render(
          <TestContext>
            <CreateDialog editor={editor} type="externerLink" />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('dialog')).toBeVisible()
        expect(screen.getByRole('textbox', { name: linked_text })).toHaveValue(
          'hallo'
        )
      })

      it('can create an external link', async () => {
        const editor = createVolltextEditor()
        editor.children = slateValue()
        Transforms.select(editor, {
          anchor: { path: [0, 0], offset: 0 },
          focus: { path: [0, 0], offset: 6 },
        })
        render(
          <TestContext>
            <CreateDialog editor={editor} type="externerLink" />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button'))
        await userEvent.type(
          screen.getByRole('textbox', { name: linked_text }),
          appendix
        )
        await userEvent.type(
          screen.getByRole('textbox', { name: linked_url }),
          url
        )
        await userEvent.click(screen.getByRole('button', { name: save }))

        const [node] = Editor.node(editor, [0, 1])
        expect(node).toMatchObject({
          data_origin: 'externerLink',
          content: 'hallo' + appendix,
          box: {
            data_target: url,
          },
        })
      })
    })

    describe('edit dialog', () => {
      const externerLink = {
        data_origin: 'externerLink',
        box: { data_origin: 'ref', data_target: url, children: [{ text: '' }] },
        content: 'hallo',
        children: [{ text: '' }],
      } as VolltextReferenz

      it('can open an existing link', async () => {
        const editor = createVolltextEditor()
        const initialValue = slateValue(externerLink)
        editor.children = initialValue
        const [element] = Editor.node(editor, [0, 1])
        render(
          <TestContext>
            <EditDialog
              editor={editor}
              initialValue={initialValue}
              element={element as VolltextReferenz}
            />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('dialog')).toBeVisible()
        expect(screen.getByRole('textbox', { name: linked_text })).toHaveValue(
          'hallo'
        )
        expect(screen.getByRole('textbox', { name: linked_url })).toHaveValue(
          url
        )
        expect(screen.queryByRole('button', { name: save })).toBeNull()
        expect(screen.getByRole('button', { name: open_link })).toBeVisible()
      })

      it('can edit an existing link', async () => {
        const store = configureTestStore()
        store.dispatch(updateConfiguration({ isEditable: true }))
        store.dispatch(updateMode('editMode'))
        const editor = createVolltextEditor()
        const initialValue = slateValue(externerLink)
        editor.children = initialValue
        const [element] = Editor.node(editor, [0, 1])
        render(
          <TestContext store={store}>
            <EditDialog
              editor={editor}
              initialValue={initialValue}
              element={element as VolltextReferenz}
            />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button'))
        await userEvent.type(
          screen.getByRole('textbox', { name: linked_text }),
          appendix
        )
        await userEvent.type(
          screen.getByRole('textbox', { name: linked_url }),
          appendix
        )
        await userEvent.click(screen.getByRole('button', { name: save }))

        const [node] = Editor.node(editor, [0, 1])
        expect(node).toMatchObject({
          data_origin: 'externerLink',
          content: 'hallo' + appendix,
          box: {
            data_target: url + appendix,
          },
        })
      })
    })
  })

  describe.each([
    createNormdatum('person', 'persName'),
    createNormdatum('ort', 'placeName'),
    createNormdatum('koerperschaft', 'orgName'),
  ])('normdatum %s', (type, _data_origin, _element) => {
    const { normdata_text } = de.text_tagging.referenz.dialog

    describe('create dialog', () => {
      it('extracts selected text from editor', async () => {
        const editor = createVolltextEditor()
        editor.children = slateValue()
        Transforms.select(editor, {
          anchor: {
            path: [0, 0],
            offset: 0,
          },
          focus: {
            path: [0, 0],
            offset: 6,
          },
        })
        render(
          <TestContext>
            <CreateDialog editor={editor} type={type} />
          </TestContext>
        )
        await userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('dialog')).toBeVisible()
        expect(
          screen.getByRole('textbox', { name: normdata_text })
        ).toHaveValue('hallo')
      })
    })
  })
})
