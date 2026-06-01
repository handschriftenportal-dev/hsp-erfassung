import { act, render, screen } from '@testing-library/react'
import { Slate } from 'slate-react'
import { KomponentenAuswahlDialog } from 'src/domain/sidebar/KomponentenAuswahlDialog'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import translation from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('KomponentenAuswahlDialog Test', () => {
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
    path: [],
    teiElement: 'msContents',
    wrapperId: '',
    xmlpath: '',
  }
  it('Type component has correct heading', async () => {
    await act(async () =>
      render(
        <TestContext>
          <Slate initialValue={slateValue} editor={editor}>
            <KomponentenAuswahlDialog
              beschreibung={beschreibungsKomponente}
              komponentOptions={[]}
              insert={() => undefined}
              type={'component'}
            />
          </Slate>
        </TestContext>
      )
    )
    expect(screen.getByRole('heading')).toHaveTextContent(
      translation.sidebar.add_new_component
    )
  })

  it('Type child component has correct heading', async () => {
    await act(async () =>
      render(
        <TestContext>
          <Slate initialValue={slateValue} editor={editor}>
            <KomponentenAuswahlDialog
              beschreibung={beschreibungsKomponente}
              komponentOptions={[]}
              insert={() => undefined}
              type={'child'}
            />
          </Slate>
        </TestContext>
      )
    )
    expect(screen.getByRole('heading')).toHaveTextContent(
      translation.sidebar.add_new_child_component
    )
  })

  it('Options get rendered', async () => {
    const options = [
      {
        label: 'one',
        element: '1',
      },
      {
        label: 'two',
        element: '2',
      },
    ]
    await act(async () =>
      render(
        <TestContext>
          <Slate initialValue={slateValue} editor={editor}>
            <KomponentenAuswahlDialog
              beschreibung={beschreibungsKomponente}
              komponentOptions={options}
              insert={() => undefined}
              type={'child'}
            />
          </Slate>
        </TestContext>
      )
    )
    expect(screen.getByRole('option', { name: 'one' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'two' })).toBeVisible()
    const totalOptions = options.length + 1 // Empty option is an option
    expect(screen.getAllByRole('option')).toHaveLength(totalOptions)
  })
})
