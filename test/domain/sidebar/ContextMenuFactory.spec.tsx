import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Slate } from 'slate-react'
import { writeDocument } from 'src/domain/erfassung/ErfassungsState'
import { ContextMenuFactory } from 'src/domain/sidebar/ContextMenuFactory'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('ContextMenuFactory Test', () => {
  const editor = createErfassungsEditor()
  const slateValue = [
    {
      data_origin: 'paragraph',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  const store = configureTestStore()
  store.dispatch(writeDocument())

  it('View ContextMenuFactory', async () => {
    const beschreibung: SidebarEintragModel = {
      id: '1',
      label: 'sidebar.section',
      teiElement: 'msItem',
      children: [],
      path: [],
      xmlpath: '#document-TEI-teiHeader-text',
      level: 0,
      parentId: 'msDesc',
      wrapperId: '',
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <ContextMenuFactory beschreibung={beschreibung} editor={editor} />
        </Slate>
      </TestContext>
    )

    expect(screen.getByRole('menu')).toBeVisible()
    expect(screen.getByRole('openContextMenuButton')).toBeVisible()

    fireEvent.click(screen.getByRole('openContextMenuButton'))

    await waitFor(() => {
      expect(screen.getByRole('closeContextMenuButton')).toBeVisible()
    })
  })

  it('Note type=register is deletable and not duplicable', async () => {
    const register: SidebarEintragModel = {
      id: 'dcb02505-c006-4130-b6f2-665e7837bdf5',
      label: 'sidebar.content_register',
      teiElement: 'noteregister',
      children: [],
      path: [],
      xmlpath:
        '#document-TEI-text-body-msDesc-msPart-booklet-msContents-msItem-note',
      level: 8,
      parentId: '49e65385-066d-47b7-9457-878548dde8f5',
      wrapperId: '',
    }

    render(
      <TestContext store={store}>
        <Slate initialValue={slateValue} editor={editor}>
          <ContextMenuFactory beschreibung={register} editor={editor} />
        </Slate>
      </TestContext>
    )
    fireEvent.click(screen.getByRole('openContextMenuButton'))

    await waitFor(() => {
      expect(screen.getByLabelText(de.sidebar.delete_component)).toBeVisible()
      expect(screen.queryByLabelText(de.sidebar.duplicate)).toBeNull()
    })
  })
})
