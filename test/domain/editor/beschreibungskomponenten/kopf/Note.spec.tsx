import { render, screen } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { Note } from 'src/domain/editor/beschreibungskomponenten/kopf/Note'
import { updateMode, writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'
import { TestSlateAttributes } from 'test/TestSlateAttributes'

const noteElement = {
  data_origin: 'note',
  path: '#document-TEI-text-body-msDesc-head-note',
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  children: [
    {
      text: 'dolor sit amet',
    },
  ],
}

const emptyNoteElement = {
  data_origin: 'note',
  path: '#document-TEI-text-body-msDesc-head-note',
  id: '79fa03fe-a9ff-49ec-80bf-f37b277cfb98',
  data_type: 'headline',
  children: [
    {
      text: '',
    },
  ],
}

describe('Note Kopf', () => {
  const editor = createErfassungsEditor()
  const attributes = TestSlateAttributes.element

  it('Note musty', () => {
    const store = configureTestStore()
    store.dispatch(writeDocument())

    render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Note
            attributes={attributes}
            children={[]}
            element={emptyNoteElement}
          />
        </Slate>
      </TestContext>
    )

    expect(screen.getByDisplayValue('')).toBeTruthy()
  })

  it('Note', () => {
    render(
      <TestContext>
        <Slate initialValue={[]} editor={editor}>
          <Note element={noteElement} attributes={attributes} children={[]} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByLabelText('Schlagzeile')).toBeVisible()
  })

  it('Empty note is not shown in read mode', () => {
    const store = configureTestStore()
    store.dispatch(updateMode('previewMode'))

    const { container } = render(
      <TestContext store={store}>
        <Slate initialValue={[]} editor={editor}>
          <Note
            attributes={attributes}
            children={[]}
            element={emptyNoteElement}
          />
        </Slate>
      </TestContext>
    )

    expect(container.textContent).toBeFalsy()
  })
})
