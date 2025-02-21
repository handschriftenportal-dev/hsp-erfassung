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
  updateConfiguration,
} from '../../../src/domain/erfassung/ErfassungsState'
import { ValidateTEIButton } from '../../../src/domain/toolbar/ValidateTEIButton'
import { ImportValidationResponse } from '../../../src/infrastructure/nachweis/ValidationResponse'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

const failedImportValidation: ImportValidationResponse = {
  valid: false,
  message: 'Error during validation. Line XYZ',
  line: '',
  column: '',
  details: [],
}

const server = setupServer(
  http.post('/validation', () => {
    return HttpResponse.json(failedImportValidation)
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Validate TEI Button', () => {
  const editor = createErfassungsEditor()
  const store = configureTestStore()
  act(() => {
    store.dispatch({
      type: 'erfassung/validationState',
      payload: [],
    })
    store.dispatch(
      updateConfiguration({
        validationUrl: '/validation',
      })
    )
  })

  expect(store.getState().erfassung.validationState).toEqual([])

  render(
    <TestContext store={store}>
      <ValidateTEIButton withODD={false} editor={editor} />
    </TestContext>
  )

  act(() => fireEvent.mouseDown(screen.getByRole('button')))

  waitFor(() => {
    expect(screen.getByRole('button')).toBeVisible()
    expect(store.getState().erfassung.validationState).toEqual([])
    expect(selectAlertMessage(store.getState())).toMatchObject({
      message: failedImportValidation.message,
      level: 'error',
    })
  })
})
