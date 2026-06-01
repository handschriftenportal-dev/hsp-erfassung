import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SonderzeichenAuswahl } from 'src/domain/sonderzeichen/SonderzeichenAuswahl'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('SonderzeichenAuswahl', () => {
  let onClose: jest.Mock
  let onSubmit: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
    onSubmit = jest.fn()
    render(
      <TestContext>
        <SonderzeichenAuswahl onClose={onClose} onSubmit={onSubmit} />
      </TestContext>
    )
  })

  it('has heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      de.special_character.title
    )
  })

  it('has grid', () => {
    expect(screen.getByRole('grid')).toBeVisible()
  })

  it('has close button', async () => {
    const name = de.special_character.close_action
    const close = screen.getByRole('button', { name })
    expect(close).toBeVisible()
    await userEvent.click(close)
    expect(onClose).toHaveBeenCalled()
  })

  it('has submit button', async () => {
    const name = de.special_character.submit_action
    const submit = screen.getByRole('button', { name })
    expect(submit).toBeVisible()
    await userEvent.click(submit)
    expect(onSubmit).toHaveBeenCalled()
  })

  it('can toggle between favoriten and zeichensaetze view', async () => {
    const zeichensaetzeButton = screen.getByRole('button', {
      name: de.special_character.character_set_button,
    })
    const favoritenButton = screen.getByRole('button', {
      name: de.special_character.favorite_set_button,
    })
    expect(zeichensaetzeButton).toHaveAttribute('aria-pressed', 'true')
    expect(favoritenButton).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(favoritenButton)
    expect(zeichensaetzeButton).toHaveAttribute('aria-pressed', 'false')
    expect(favoritenButton).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(zeichensaetzeButton)
    expect(zeichensaetzeButton).toHaveAttribute('aria-pressed', 'true')
    expect(favoritenButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('add to favorite button changes label to remove from favorites', async () => {
    const toggleFavoriteButton = screen.getByRole('button', {
      name: de.special_character.add_favorite_action_label,
    })
    expect(toggleFavoriteButton).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(toggleFavoriteButton)
    expect(toggleFavoriteButton).toHaveAttribute('aria-pressed', 'true')
    expect(toggleFavoriteButton).toHaveAttribute(
      'aria-label',
      de.special_character.remove_favorite_action_label
    )
  })
})
