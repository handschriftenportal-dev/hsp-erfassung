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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import {
  readDocument,
  selectAlertMessage,
  selectReadOnly,
  updateConfiguration,
  updateMode,
  updateStandalone,
} from '../../../src/domain/erfassung/ErfassungsState'
import { LesenBearbeitenButton } from '../../../src/domain/toolbar/LesenBearbeitenButton'
import { configureTestStore, TestContext } from '../../TestContext'

const server = setupServer(
  http.get('/sperren', () => {
    return HttpResponse.json([])
  }),
  http.get('/test/sperren', () => {
    return HttpResponse.json([
      { id: '1', bearbeiter: { id: 'b-ke101', rolle: 'Redakteur' } },
    ])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('LesenBearbeitenButton', async () => {
  const store = configureTestStore()
  store.dispatch(
    updateConfiguration({
      beschreibungsUrl: '/test',
      isEditable: true,
    })
  )
  store.dispatch(updateMode('previewMode'))

  render(
    <Provider store={store}>
      <LesenBearbeitenButton />
    </Provider>
  )

  expect(screen.getByRole('button')).toBeVisible()
  expect(selectReadOnly(store.getState())).toEqual(true)
  fireEvent.mouseDown(screen.getByRole('button'))
  await waitFor(() => expect(selectReadOnly(store.getState())).toEqual(false))
})

test('Switch ReadOnlyMode Without Sperren', async () => {
  const store = configureTestStore()
  store.dispatch(readDocument())
  store.dispatch(updateStandalone(false))
  store.dispatch(
    updateConfiguration({
      beschreibungsUrl: '/test',
      isEditable: false,
    })
  )
  store.dispatch(updateMode('previewMode'))

  render(
    <TestContext store={store}>
      <LesenBearbeitenButton />
    </TestContext>
  )

  expect(screen.getByRole('button')).toBeVisible()

  fireEvent.mouseDown(screen.getByRole('button'))

  await waitFor(() => {
    expect(selectAlertMessage(store.getState())).toBe(undefined)
    expect(selectReadOnly(store.getState())).toEqual(true)
  })
})

test('Switch ReadOnlyMode With Sperren', async () => {
  const store = configureTestStore()
  store.dispatch(updateStandalone(false))
  store.dispatch(
    updateConfiguration({
      isEditable: true,
    })
  )
  store.dispatch(updateMode('editMode'))

  render(
    <Provider store={store}>
      <LesenBearbeitenButton />
    </Provider>
  )

  expect(screen.getByRole('button')).toBeVisible()

  fireEvent.mouseDown(screen.getByRole('button'))

  await waitFor(() => {
    expect(selectAlertMessage(store.getState())).toBe(undefined)
    expect(selectReadOnly(store.getState())).toEqual(false)
  })
})
