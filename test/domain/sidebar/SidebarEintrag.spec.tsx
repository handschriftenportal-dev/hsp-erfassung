import { render, screen } from '@testing-library/react'
import React from 'react'
import { SidebarEintrag } from 'src/domain/sidebar/SidebarEintrag'
import SidebarEintragFactory from 'src/domain/sidebar/SidebarEintragFactory'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { TestContext } from 'test/TestContext'

describe('SidebarEintrag', () => {
  test('BeschreibungsKomponenteItem Test Creation', () => {
    const beschreibungskomponente = SidebarEintragFactory(
      '1',
      'head',
      [],
      '',
      0,
      'msDesc',
      ''
    )
    const editor = createErfassungsEditor()

    render(
      <TestContext>
        <SidebarEintrag
          beschreibung={beschreibungskomponente}
          index={0}
          editor={editor}
        />
      </TestContext>
    )

    expect(screen.getByText('Kopf')).toBeVisible()
    expect(screen.getAllByRole('listitem')[0].className).toContain(
      'sidebar-item-list-item-root'
    )
  })
})
