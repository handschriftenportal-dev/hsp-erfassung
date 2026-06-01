import { render, screen } from '@testing-library/react'
import { HSPHoveringToolbar } from 'src/domain/editor/selectiontoolbar/HSPHoveringToolbar'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('HSPHoveringToolbar', () => {
  beforeEach(() => {
    render(
      <TestContext>
        <HSPHoveringToolbar>Hello World</HSPHoveringToolbar>
      </TestContext>
    )
  })

  it('has role "menu"', () => {
    expect(screen.getByRole('menu')).toBeTruthy()
  })

  it('has aria label', () => {
    expect(screen.getByRole('menu')).toHaveAttribute(
      'aria-label',
      de.selection_toolbar.label
    )
  })
})
