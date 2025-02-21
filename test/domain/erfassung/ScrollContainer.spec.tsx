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

import { ScrollContainer } from '../../../src/domain/erfassung/ScrollContainer'

describe('ScrollContainer', () => {
  const children = 'children'
  const containerId = 'containerId'

  test('Children get inserted', () => {
    render(<ScrollContainer>{children}</ScrollContainer>)
    expect(screen.getByText(children)).toBeTruthy()
  })

  test('containerId becomes id', () => {
    render(
      <ScrollContainer containerId={containerId}>{children}</ScrollContainer>
    )
    const scrollContainer = screen.getByTestId('scroll-container')
    expect(scrollContainer).toBeTruthy()
    expect(scrollContainer.getAttribute('id')).toBe(containerId)
  })

  test('Without containerId id is null', () => {
    render(<ScrollContainer>{children}</ScrollContainer>)
    const scrollContainer = screen.getByTestId('scroll-container')
    expect(scrollContainer).toBeTruthy()
    expect(scrollContainer.getAttribute('id')).toBe(null)
  })
})
