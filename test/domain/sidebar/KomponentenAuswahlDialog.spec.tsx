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
import { Slate } from 'slate-react'

import { KomponentenAuswahlDialog } from '../../../src/domain/sidebar/KomponentenAuswahlDialog'
import { SidebarEintragModel } from '../../../src/domain/sidebar/SidebarEintragFactory'
import translation from '../../../src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from '../../TestContext'

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
    teiElement: '',
    wrapperId: '',
    xmlpath: '',
  }
  it('Type component has correct heading', () => {
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
    expect(screen.getByRole('heading')).toHaveTextContent(
      translation.sidebar.add_new_component
    )
  })

  it('Type child component has correct heading', () => {
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
    expect(screen.getByRole('heading')).toHaveTextContent(
      translation.sidebar.add_new_child_component
    )
  })

  it('Options get rendered', () => {
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
    expect(screen.getByRole('option', { name: 'one' })).toBeVisible()
    expect(screen.getByRole('option', { name: 'two' })).toBeVisible()
    const totalOptions = options.length + 1 // Empty option is an option
    expect(screen.getAllByRole('option')).toHaveLength(totalOptions)
  })
})
