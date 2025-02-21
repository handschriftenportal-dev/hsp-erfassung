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

import { SonderzeichenAPI } from '../../../src/domain/sonderzeichen/SonderzeichenAPI'
import { SonderzeichenTooltip } from '../../../src/domain/sonderzeichen/SonderzeichenTooltip'

async function testSetup(key: string) {
  render(
    <SonderzeichenTooltip sonderzeichen={key}>
      <button>Hello World</button>
    </SonderzeichenTooltip>
  )
  await userEvent.hover(screen.getByRole('button'))
  return screen.findByRole('tooltip')
}

describe('SonderzeichenTooltip', () => {
  it('shows codepoint and description text for known key', async () => {
    const key = 'U+2020'
    const tip = await testSetup(key)
    expect(tip).toBeVisible()
    expect(tip.textContent).toContain(key)
    expect(tip.textContent).toContain(
      SonderzeichenAPI.getSonderzeichen(key).description
    )
  })

  it('shows key, but no description text for unknown key', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => null)
    const key = 'INVALID'
    const tip = await testSetup(key)
    expect(tip).toBeVisible()
    expect(tip.textContent).toContain(key)
    expect(tip.textContent).not.toContain(
      SonderzeichenAPI.getSonderzeichen(key).description
    )
  })
})
