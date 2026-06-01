import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SonderzeichenAuswahlState } from 'src/domain/sonderzeichen/SonderzeichenAuswahlState'
import { SonderzeichenGruppenAuswahl } from 'src/domain/sonderzeichen/SonderzeichenGruppenAuswahl'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('SonderzeichenGruppenAuswahl', () => {
  let dispatch: jest.Mock
  const state = SonderzeichenAuswahlState.empty()
  beforeEach(() => {
    dispatch = jest.fn()
    render(
      <TestContext>
        <SonderzeichenGruppenAuswahl state={state} dispatch={dispatch} />
      </TestContext>
    )
  })

  it('has label', () => {
    expect(
      screen.getByLabelText(de.special_character.group_select_label)
    ).toBeTruthy()
  })

  it('has role', () => {
    expect(screen.getByRole('combobox')).toBeVisible()
  })

  it('has select for groups', () => {
    expect(
      screen.getByRole('combobox', {
        name: de.special_character.group_select_label,
      })
    ).toBeVisible()
  })

  it('clicking combobox opens listbox', async () => {
    await userEvent.click(
      screen.getByRole('combobox', {
        name: de.special_character.group_select_label,
      })
    )
    expect(
      screen.getByRole('listbox', {
        name: de.special_character.group_select_label,
      })
    ).toBeVisible()
  })

  it('all defined group translations are used', async () => {
    await userEvent.click(
      screen.getByRole('combobox', {
        name: de.special_character.group_select_label,
      })
    )
    Object.values(de.special_character.groups).forEach((name) => {
      expect(screen.getByRole('option', { name })).toBeVisible()
    })
  })

  it('changing value sends dispatch', async () => {
    await userEvent.click(
      screen.getByRole('combobox', {
        name: de.special_character.group_select_label,
      })
    )
    expect(dispatch).not.toHaveBeenCalled()
    await userEvent.click(
      screen.getByRole('option', {
        name: de.special_character.groups.alchemie,
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({ type: 'setGruppe', payload: 'alchemie' })
  })

  it('has button group', () => {
    expect(
      screen.getByRole('group', {
        name: de.special_character.set_group_label,
      })
    ).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: de.special_character.favorite_set_button,
      })
    ).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: de.special_character.character_set_button,
      })
    ).toBeVisible()
  })

  it('character button is checked by default', () => {
    expect(
      screen.getByRole('button', {
        name: de.special_character.character_set_button,
      })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', {
        name: de.special_character.favorite_set_button,
      })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking the not pressed button dispatches setAnsicht Action', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: de.special_character.favorite_set_button,
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const [action] = dispatch.mock.lastCall
    expect(action).toMatchObject({
      type: 'setAnsicht',
      payload: SonderzeichenAuswahlState.ansicht.favoriten,
    })
  })

  it('clicking the pressed button resets search and group', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: de.special_character.character_set_button,
      })
    )
    expect(dispatch).toHaveBeenCalledTimes(2)
    const [[first], [second]] = dispatch.mock.calls
    expect(first).toMatchObject({
      type: 'setGruppe',
      payload: 'gesamt',
    })
    expect(second).toMatchObject({
      type: 'setSuche',
      payload: '',
    })
  })
})
