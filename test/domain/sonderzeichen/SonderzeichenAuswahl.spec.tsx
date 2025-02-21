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
import userEvent from '@testing-library/user-event'

import { SonderzeichenAuswahl } from '../../../src/domain/sonderzeichen/SonderzeichenAuswahl'
import de from '../../../src/infrastructure/i18n/translation_de.json'
import { TestContext } from '../../TestContext'

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
