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
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  selectAlertMessage,
  selectReadOnly,
  updateConfiguration,
  updateStandalone,
  writeDocument,
} from '../../../src/domain/erfassung/ErfassungsState'
import { TEISpeichernButton } from '../../../src/domain/toolbar/TEISpeichernButton'
import { configureTestStore, TestContext } from '../../TestContext'

const successfulSaveResponse = {
  success: true,
  message: 'Speichern wurde erfolgreich durchgeführt',
  level: 'info',
}

const server = setupServer(
  http.post('/test', () => {
    return HttpResponse.json(successfulSaveResponse)
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('TEIDownloadButton', () => {
  const store = configureTestStore()
  act(() => {
    store.dispatch(
      updateConfiguration({
        beschreibungsUrl: '/test',
      })
    )
    store.dispatch(updateStandalone(false))
    store.dispatch(writeDocument())
  })

  render(
    <TestContext store={store}>
      <TEISpeichernButton />
    </TestContext>
  )
  act(() => fireEvent.mouseDown(screen.getByRole('button')))

  expect(selectReadOnly(store.getState())).toEqual(false)

  waitFor(() => {
    expect(screen.getByRole('button')).toBeVisible()
    expect(selectAlertMessage(store.getState())).toMatchObject({
      message: successfulSaveResponse.message,
      level: 'info',
    })
  })
})
