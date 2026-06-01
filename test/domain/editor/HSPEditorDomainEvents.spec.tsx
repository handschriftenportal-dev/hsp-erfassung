import { act, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  sendDocumentSpeichernEvent,
  sendValidateTEIEvent,
} from 'src/domain/editor/HSPEditorDomainEvents'
import {
  selectAlertMessage,
  updateConfiguration,
  updateStandalone,
} from 'src/domain/erfassung/ErfassungsState'
import { TEISpeichernButton } from 'src/domain/toolbar/TEISpeichernButton'
import { ValidateTEIButton } from 'src/domain/toolbar/ValidateTEIButton'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

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
