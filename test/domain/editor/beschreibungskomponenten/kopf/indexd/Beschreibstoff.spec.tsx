import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import type { Editor } from 'slate'
import { Slate } from 'slate-react'
import { Beschreibstoff } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Beschreibstoff'
import { writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import subjectArea from 'test/infrastructure/normdaten/fixtures/buchkunde.json'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('Beschreibstoff', () => {
  let editor: Editor
  let container: HTMLElement

  const beschreibstoffElement = {
    data_origin: 'index',
    data_indexName: 'norm_material',
    children: [
      {
        data_origin: 'term',
        data_type: 'material',
        children: [
          {
            text: 'Freitext Content',
          },
        ],
      },
      {
        data_origin: 'term',
        data_type: 'material_type',
        data_key: 'NORM-9150b6ae-291d-331a-992f-1df68095932a',
        data_ref:
          'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/CODC-A366',
        children: [
          {
            text: 'CODC-A366',
          },
        ],
      },
    ],
  }

  beforeEach(() => {
    const store = configureTestStore()
    store.dispatch(writeDocument())
    editor = createErfassungsEditor()
    const api = ThemenbereicheAPI.new('de')
    const buchkunde = subjectArea.data.findSubjectArea
    api.addSubjectArea(buchkunde)
    container = render(
      <TestContext store={store}>
        <ThemenbereichService api={api}>
          <Slate
            initialValue={[
              {
                data_origin: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
              },
            ]}
            editor={editor}
          >
            <Beschreibstoff element={beschreibstoffElement} />
          </Slate>
        </ThemenbereichService>
      </TestContext>
    ).container
  })

  it('renders header', () => {
    expect(
      screen.getByRole('heading', { name: de.editor.material })
    ).toBeVisible()
  })

  it('has helper text', async () => {
    await userEvent.click(
      screen.getByRole('button', { name: de.editor.show_help })
    )
    expect(container.innerHTML).toContain(de.editor.help_text.material)
  })

  it('renders Freitext', () => {
    expect(screen.getByLabelText(de.editor.free_text)).toHaveTextContent(
      'Freitext Content'
    )
  })

  it('renders preferredName', () => {
    expect(screen.getByText(de.editor.linked_normdata)).toBeVisible()
  })

  it('offers beschreibstoff for selection', async () => {
    await userEvent.click(screen.getByRole('combobox'))
    const name = 'Papier „arabe oriental“ (Beschreibstoff) CODC-A797'
    expect(screen.getByRole('option', { name })).toBeVisible()
  })
})
