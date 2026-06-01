import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Editor, Element } from 'slate'
import { Slate } from 'slate-react'
import { DuplicateDialog } from 'src/domain/sidebar/DuplicateDialog'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import Loader from 'test/LoadPublic'
import { TestContext } from 'test/TestContext'

describe('DuplicateDialog', () => {
  const beschreibung = HSPNode.findFirstElement(Loader.loremIpsumXML()[0], [
    'text',
    'body',
    'msDesc',
  ])!
  const childCount = beschreibung.children.length
  const faszikel: SidebarEintragModel = {
    id: 'xxxx',
    label: 'Faszikel',
    teiElement: 'msPartbooklet',
    children: [],
    path: [0, 1],
    xmlpath: '#document-TEI-text-body-msDesc-msPart',
    level: 2,
    parentId: 'root',
    wrapperId: '',
  }
  let editor: Editor
  beforeEach(async () => {
    editor = createErfassungsEditor()

    await act(async () =>
      render(
        <TestContext>
          <Slate initialValue={[beschreibung]} editor={editor}>
            <DuplicateDialog editor={editor} beschreibung={faszikel} />
          </Slate>
        </TestContext>
      )
    )
  })
  const { title, create_action, close_action } = de.duplicate_dialog

  it('renders title', () => {
    expect(screen.getByRole('heading', { name: title })).toBeTruthy()
  })

  it('renders close action', () => {
    expect(screen.getByRole('button', { name: close_action })).toBeTruthy()
  })

  it('renders create action', () => {
    expect(screen.getByRole('button', { name: create_action })).toBeTruthy()
  })

  it(`renders label ${faszikel.label}`, () => {
    expect(screen.getByText(faszikel.label)).toBeTruthy()
  })

  it(`duplicate component at path [${faszikel.path}]`, async () => {
    const [content] = editor.children as Element[]
    expect(content.children.length).toBe(childCount)
    await userEvent.click(screen.getByRole('button', { name: create_action }))
    const [updatedContent] = editor.children as Element[]
    expect(updatedContent.children.length).toBe(childCount + 1)
  })

  it(`duplicate component at path [${faszikel.path}] 5 times`, async () => {
    const [content] = editor.children as Element[]
    expect(content.children.length).toBe(childCount)
    const amountInput = screen.getByRole('spinbutton')
    await userEvent.clear(amountInput)
    await userEvent.type(amountInput, '5')
    await userEvent.click(screen.getByRole('button', { name: create_action }))
    const [updatedContent] = editor.children as Element[]
    expect(updatedContent.children.length).toBe(childCount + 5)
  })
})
