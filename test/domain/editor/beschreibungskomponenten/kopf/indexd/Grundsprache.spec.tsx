import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import type { Editor } from 'slate'
import { Slate } from 'slate-react'
import { Grundsprache } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Grundsprache'
import {
  updateGrundsprachen,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

const indexElement = {
  data_origin: 'index',
  data_indexName: 'norm_textLang',
  children: [
    {
      data_origin: 'term',
      data_type: 'textLang',
      children: [
        {
          text: 'Freitext Content',
        },
      ],
    },
    {
      data_origin: 'term',
      data_type: 'textLang-ID',
      children: [
        {
          text: 'preferredName',
        },
      ],
    },
  ],
}

const slateValue = [
  {
    data_origin: 'paragraph',
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const grundsprachen = [
  {
    id: 'NORM-a95a0b39-186f-387b-949f-87f20b44bdb5',
    gndIdentifier: '4116533-0',
    preferredName: 'sorbisch',
    typeName: 'Language',
  },
  {
    id: 'NORM-c9089f3c-9ada-3018-af6f-fb1ee8d6501c',
    gndIdentifier: '4114364-4',
    preferredName: 'lateinisch',
    typeName: 'Language',
  },
  {
    id: 'NORM-5f02f088-9301-3d7b-a1ac-972c11bf3e7d',
    gndIdentifier: '4113292-0',
    preferredName: 'deutsch',
    typeName: 'Language',
  },
  {
    id: 'NORM-65c10911-d8b8-3912-99a2-1ebacf46da01',
    gndIdentifier: '4120278-8',
    preferredName: 'neugriechisch',
    typeName: 'Language',
  },
  {
    id: 'NORM-9cfefed8-fb94-37ba-a5cd-519d7d2bb5d7',
    gndIdentifier: '4014777-0',
    preferredName: 'englisch',
    typeName: 'Language',
  },
]

describe('Grundsprache', () => {
  const store = configureTestStore()
  store.dispatch(updateGrundsprachen(grundsprachen))
  store.dispatch(writeDocument())
  let editor: Editor
  let container: HTMLElement
  beforeEach(() => {
    editor = createErfassungsEditor()
    container = render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <Grundsprache element={indexElement} />
        </Slate>
      </TestContext>
    ).container
  })

  it('renders header', () => {
    expect(
      screen.getByRole('heading', { name: de.editor.textLang })
    ).toBeVisible()
  })

  it('has helper text', async () => {
    await userEvent.click(
      screen.getByRole('button', { name: de.editor.show_help })
    )
    expect(container.innerHTML).toContain(de.editor.help_text.text_language)
  })

  it('renders Freitext', () => {
    expect(screen.getByLabelText(de.editor.free_text)).toHaveTextContent(
      'Freitext Content'
    )
  })

  it('renders preferredName', () => {
    expect(screen.getByText(de.editor.linked_normdata)).toBeVisible()
  })

  it('offers grundsprachen for selection', async () => {
    await userEvent.click(screen.getByRole('combobox'))
    grundsprachen.forEach((sprache) => {
      const name = `${sprache.preferredName} ${sprache.gndIdentifier}`
      expect(screen.getByRole('option', { name })).toBeVisible()
    })
  })
})
