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

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AlertMessage } from '../../../src/domain/erfassung/AlertMessage'
import { updateAlertMessage } from '../../../src/domain/erfassung/ErfassungsState'
import { configureTestStore, TestContext } from '../../TestContext'

describe('AlertMessage', () => {
  it('is not shown at first render', () => {
    const store = configureTestStore()
    render(
      <TestContext store={store}>
        <AlertMessage>Hi</AlertMessage>
      </TestContext>
    )
    expect(screen.queryAllByRole('alert').length).toEqual(0)
  })

  it('shows new alert message', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({ level: 'info', message: 'hello world' })
      )
    })
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByText('hello world')).toBeDefined()
  })

  it('hides alert after given period', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({
          level: 'info',
          message: 'hello world',
          hideAfter: 10,
        })
      )
    })

    expect(screen.getByRole('alert')).toBeDefined()
    waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull()
    })
  })

  it('can be closed by pressing the close button', () => {
    const store = configureTestStore()
    render(<TestContext store={store}>Hi</TestContext>)
    act(() => {
      store.dispatch(
        updateAlertMessage({
          level: 'info',
          message: 'hello world',
        })
      )
    })

    expect(screen.getByRole('alert')).toBeDefined()
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
