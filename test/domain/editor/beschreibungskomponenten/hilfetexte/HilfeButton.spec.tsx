import { fireEvent, render, screen } from '@testing-library/react'
import { HilfeButton } from 'src/domain/editor/beschreibungskomponenten/hilfetexte'
import de from 'src/infrastructure/i18n/translation_de.json'
import { colors } from 'src/theme'
import { TestContext } from 'test/TestContext'

beforeAll(() => {
  global.window.createHspWorkspace = jest.fn()
})

describe('Hilfetext Komponente', () => {
  it('Render HilfeButton', () => {
    render(
      <TestContext>
        <HilfeButton />
      </TestContext>
    )

    expect(
      screen.getByRole('button', { name: de.editor.show_help })
    ).toBeVisible()
  })

  it('Passed Callback is invoked', () => {
    const onClick = jest.fn()
    render(
      <TestContext>
        <HilfeButton onClick={onClick} />
      </TestContext>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('activated button changes the color', () => {
    render(
      <TestContext>
        <HilfeButton activated />
      </TestContext>
    )

    expect(screen.getByRole('button')).toHaveStyle({
      color: colors.primary.darkTerraCotta,
    })
  })
})
