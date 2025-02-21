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

import { HSPToolbarButton } from '../../../../src/domain/toolbar/styles/HSPToolbarButton'

describe('HSPToolbarButton', () => {
  it('renders a button', () => {
    render(<HSPToolbarButton />)
    expect(screen.getByRole('button')).toBeVisible()
  })
  it('button is a icon button', () => {
    render(<HSPToolbarButton />)
    expect(screen.getByRole('button').classList).toContain('MuiIconButton-root')
  })
  it('title is accessible', () => {
    render(<HSPToolbarButton title="Click me" />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeVisible()
  })
  it('supports onClick handler', async () => {
    const handler = jest.fn()
    render(<HSPToolbarButton onClick={handler} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalled()
  })

  it('supports secondary class', () => {
    render(<HSPToolbarButton color="secondary" />)
    expect(screen.getByRole('button').classList).toContain(
      'MuiIconButton-colorSecondary'
    )
  })
})
