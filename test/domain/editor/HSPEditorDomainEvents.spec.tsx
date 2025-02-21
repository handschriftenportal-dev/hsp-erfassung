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

import { act, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  sendDocumentSpeichernEvent,
  sendValidateTEIEvent,
} from '../../../src/domain/editor/HSPEditorDomainEvents'
import {
  selectAlertMessage,
  updateConfiguration,
  updateStandalone,
} from '../../../src/domain/erfassung/ErfassungsState'
import { TEISpeichernButton } from '../../../src/domain/toolbar/TEISpeichernButton'
import { ValidateTEIButton } from '../../../src/domain/toolbar/ValidateTEIButton'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

const server = setupServer(
  http.post('/validate', () =>
    HttpResponse.json({
      success: true,
      message: 'Dokument ist valide',
      level: 'info',
      content: {
        line: '',
        column: '',
        message: 'Dokument ist valide',
        valid: true,
      },
    })
  ),
  http.post('/beschreibung', () =>
    HttpResponse.json({
      success: true,
      message: 'Speichern wurde erfolgreich durchgeführt.',
      level: 'info',
      content: '',
    })
  )
)

beforeAll(() => {
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HSPEditor Domain Events', () => {
  const editor = createErfassungsEditor()

  test('HSP Editor Domain Event Speichern', () => {
    const store = configureTestStore()
    act(() => {
      store.dispatch(updateStandalone(false))
      store.dispatch(
        updateConfiguration({
          validationUrl: 'validate',
          beschreibungsUrl: 'beschreibung',
        })
      )
    })
    render(
      <TestContext store={store}>
        <TEISpeichernButton />
      </TestContext>
    )

    expect(screen.getByRole('button')).toBeVisible()
    act(() => sendDocumentSpeichernEvent())
    waitFor(() => {
      expect(selectAlertMessage(store.getState())).toMatchObject({
        message: 'Speichern wurde erfolgreich durchgeführt.',
        level: 'info',
      })
    })
  })

  test('Validate TEI Domain Event', () => {
    const store = configureTestStore()
    act(() =>
      store.dispatch(
        updateConfiguration({
          validationUrl: 'validate',
        })
      )
    )
    render(
      <TestContext store={store}>
        <ValidateTEIButton withODD={false} editor={editor} />
      </TestContext>
    )

    expect(screen.getByRole('button')).toBeVisible()
    act(() => sendValidateTEIEvent())
    waitFor(() => {
      expect(selectAlertMessage(store.getState())).toMatchObject({
        message: 'Dokument ist valide',
        level: 'info',
      })
    })
  })
})
