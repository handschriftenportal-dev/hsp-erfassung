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

import { act, fireEvent, render, screen } from '@testing-library/react'

import { TagTextIcon } from '../../../src/domain/editor/icons/TagTextIcon'
import { ToolbarButton } from '../../../src/infrastructure/components/ToolbarButton'

describe('ToolbarButton', () => {
  it('has role "button"', () => {
    render(
      <ToolbarButton>
        <TagTextIcon />
      </ToolbarButton>
    )
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('renders icon', () => {
    render(
      <ToolbarButton>
        <TagTextIcon />
      </ToolbarButton>
    )
    const svg = screen.getByRole('button').children[0]
    expect(svg.tagName).toBe('svg')
  })

  it('can be disabled', () => {
    render(
      <ToolbarButton disabled={true}>
        <TagTextIcon />
      </ToolbarButton>
    )
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  it('attaches click handler', () => {
    const handleClick = jest.fn()
    render(
      <ToolbarButton onClick={handleClick}>
        <TagTextIcon />
      </ToolbarButton>
    )
    const btn = screen.getByRole('button')
    expect(handleClick.mock.calls).toHaveLength(0)
    act(() => fireEvent.click(btn))
    expect(handleClick.mock.calls).toHaveLength(1)
  })
})
