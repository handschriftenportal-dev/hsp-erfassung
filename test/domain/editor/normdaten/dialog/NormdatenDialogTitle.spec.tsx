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

import { fireEvent, render, screen } from '@testing-library/react'

import { NormdatenDialogTitle } from '../../../../../src/domain/editor/normdaten/dialog/NormdatenDialogTitle'
import { TestContext } from '../../../../TestContext'

describe('Dialog title', () => {
  it('Contains close icon', () => {
    render(
      <TestContext>
        <NormdatenDialogTitle title="Titel" clickHandler={jest.fn()} />
      </TestContext>
    )
    expect(screen.getByTestId('CloseIcon')).toBeTruthy()
  })
  it('Contains Title', () => {
    render(
      <TestContext>
        <NormdatenDialogTitle title="Titel" clickHandler={jest.fn()} />
      </TestContext>
    )
    expect(screen.getByText('Titel')).toBeTruthy()
  })
  it('Pressing closing icon triggers clickHandler', async () => {
    const clickHandler = jest.fn()
    render(
      <TestContext>
        <NormdatenDialogTitle title="Titel" clickHandler={clickHandler} />
      </TestContext>
    )

    fireEvent(
      screen.getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    expect(clickHandler.mock.calls).toHaveLength(1)
  })
})
