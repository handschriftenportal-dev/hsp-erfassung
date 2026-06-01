import { act, fireEvent, render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { KomponenteLoeschenDialog } from 'src/domain/sidebar/KomponenteLoeschenDialog'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('Komponente Löschen Dialog', () => {
  const callback = jest.fn()
  beforeEach(async () => {
    const editor = createErfassungsEditor()
    const slateValue = [
      {
        data_origin: 'paragraph',
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
    const beschreibungsKomponente: SidebarEintragModel = {
      children: [],
      id: '',
      label: '',
      level: 0,
      parentId: '',
      path: [0],
      teiElement: 'msContents',
      wrapperId: '',
      xmlpath: '',
    }
    await act(async () =>
      render(
        <TestContext>
          <Slate initialValue={slateValue} editor={editor}>
            <KomponenteLoeschenDialog
              editor={editor}
              beschreibung={beschreibungsKomponente}
              callback={callback}
            />
          </Slate>
        </TestContext>
      )
    )
  })

  it('renders "Löschen" button', () => {
    expect(screen.getByRole('button', { name: 'Löschen' })).toBeVisible()
  })

  it('clicking "Löschen" button executes callback', async () => {
    const button = screen.getByRole('button', { name: 'Löschen' })
    await act(async () => {
      fireEvent.click(button)
    })
    expect(callback.mock.calls.length).toBe(1)
  })
})
