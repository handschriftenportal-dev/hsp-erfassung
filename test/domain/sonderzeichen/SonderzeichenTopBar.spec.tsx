import { act, fireEvent, render, screen } from '@testing-library/react'
import { SonderzeichenAuswahlState } from 'src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenTopBar } from 'src/domain/sonderzeichen/SonderzeichenTopBar'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('SonderzeichenTopBar', () => {
  let dispatch: jest.Mock
  let onClose: jest.Mock
  const state = { ...SonderzeichenAuswahlState.empty(), suche: 'Suche' }
  beforeEach(() => {
    dispatch = jest.fn()
    onClose = jest.fn()
    render(
      <TestContext>
        <SonderzeichenTopBar
          state={state}
          dispatch={dispatch}
          onClose={onClose}
        />
      </TestContext>
    )
  })

  it('has title', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      de.special_character.title
    )
  })

  it('pressing close button sends close event', () => {
    fireEvent.click(
      screen.getByRole('button', { name: de.special_character.close_action })
    )
    expect(onClose).toHaveBeenCalled()
  })

  it('search field contains suche text of state', () => {
    expect(screen.getByRole('textbox')).toHaveValue('Suche')
  })

  it('changing the search text triggers after debounce time', async () => {
    await act(() =>
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Search' },
      })
    )
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({ payload: 'Search', type: 'setSuche' })
  })
})
