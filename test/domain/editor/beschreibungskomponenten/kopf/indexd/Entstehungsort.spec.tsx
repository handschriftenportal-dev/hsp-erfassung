import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import type { Editor } from 'slate'
import { Slate } from 'slate-react'
import { Entstehungsort } from 'src/domain/editor/beschreibungskomponenten/kopf/indexd/Entstehungsort'
import {
  updateEntstehungsorte,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

const indexElement = {
  data_origin: 'index',
  data_indexName: 'norm_origPlace',
  children: [
    {
      data_origin: 'term',
      data_type: 'origPlace',
      children: [
        {
          text: 'Freitext Content',
        },
      ],
    },
    {
      data_origin: 'term',
      data_type: 'origPlace_norm',
      children: [
        {
          text: 'preferredName',
        },
      ],
    },
  ],
}

const entstehungsorte = [
  {
    id: 'NORM-e286adb5-e0fb-3f4b-8f0d-af5e42241217',
    gndIdentifier: '1136096078',
    preferredName: 'Kleinnaundorf (Meißen)',
    typeName: 'Place',
  },
  {
    id: 'NORM-9c029654-24f4-3a48-9e3c-cffc20601b54',
    gndIdentifier: '4761904-1',
    preferredName: 'Bergheim-Auenheim',
    typeName: 'Place',
  },
  {
    id: 'NORM-3855c2a9-4e78-37f5-992b-cd0af154ddba',
    gndIdentifier: '4416285-6',
    preferredName: 'Saint-Omer (Departement Pas-de-Calais, Region)',
    typeName: 'Place',
  },
]

describe('Entstehungsort', () => {
  const store = configureTestStore()
  store.dispatch(updateEntstehungsorte(entstehungsorte))
  store.dispatch(writeDocument())
  let editor: Editor
  let container: HTMLElement
  beforeEach(() => {
    editor = createErfassungsEditor()
    container = render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Entstehungsort element={indexElement} />
        </Slate>
      </TestContext>
    ).container
  })

  it('renders header', () => {
    expect(
      screen.getByRole('heading', { name: de.editor.orig_place })
    ).toBeVisible()
  })

  it('has helper text', async () => {
    await userEvent.click(
      screen.getByRole('button', { name: de.editor.show_help })
    )
    expect(container.innerHTML).toContain(de.editor.help_text.orig_place)
  })

  it('renders Freitext', () => {
    expect(screen.getByLabelText(de.editor.free_text)).toHaveTextContent(
      'Freitext Content'
    )
  })

  it('renders preferredName', () => {
    expect(screen.getByText(de.editor.linked_normdata)).toBeVisible()
  })

  it('offers entstehungsort as option for selection', async () => {
    await userEvent.click(screen.getByRole('combobox'))
    entstehungsorte.forEach((ort) => {
      const name = `${ort.preferredName} ${ort.gndIdentifier}`
      expect(screen.getByRole('option', { name })).toBeVisible()
    })
  })
})
