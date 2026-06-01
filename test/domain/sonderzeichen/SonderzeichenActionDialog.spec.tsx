import { fireEvent, render, screen } from '@testing-library/react'
import { SonderzeichenActionDialog } from 'src/domain/sonderzeichen/SonderzeichenActionDialog'
import { SonderzeichenAuswahlState } from 'src/domain/sonderzeichen/SonderzeichenAuswahlState'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('SonderzeichenActionDialog', () => {
  let onSubmit: jest.Mock
  let dispatch: jest.Mock
  const state = SonderzeichenAuswahlState.empty()
  beforeEach(() => {
    onSubmit = jest.fn()
    dispatch = jest.fn()
    render(
      <TestContext>
        <SonderzeichenActionDialog
          state={state}
          dispatch={dispatch}
          onSubmit={onSubmit}
        />
      </TestContext>
    )
  })

  it('has submit button', () => {
    expect(
      screen.getByRole('button', { name: de.special_character.submit_action })
    ).toBeVisible()
  })

  it('clicking submit button submits selected codepoint', () => {
    fireEvent.click(
      screen.getByRole('button', { name: de.special_character.submit_action })
    )
    expect(onSubmit).toHaveBeenCalled()
    const [call] = onSubmit.mock.lastCall
    expect(call).toBe(state.sonderzeichenKeys[state.auswahlIndex])
  })

  it('has favorite toggle button', () => {
    expect(
      screen.getByRole('button', {
        name: de.special_character.add_favorite_action_label,
      })
    ).toBeTruthy()
  })

  it('clicking favorite checkbox dispatches toggleFavorite action', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: de.special_character.add_favorite_action_label,
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({ type: 'toggleFavorite' })
  })
})
