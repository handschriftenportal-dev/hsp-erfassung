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

import { NotationChip } from '../../../../../../src/domain/editor/normdaten/themenbereichDialog/komponenten/NotationChip'

describe('NotationChip', () => {
  const notation = 'marker'
  it('renders notation', () => {
    render(<NotationChip notation={notation} />)
    expect(screen.getByText(notation)).toBeVisible()
  })

  it('is not clickable if no uri is provided', () => {
    render(<NotationChip notation={notation} />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('is clickable if uri is provided', () => {
    render(<NotationChip notation={notation} uri={'something'} />)
    expect(screen.getByRole('button')).toBeVisible()
  })
})
