import { render, waitFor } from '@testing-library/react'
import type { Node } from 'slate'
import { Text, Transforms } from 'slate'
import { Slate } from 'slate-react'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'

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
