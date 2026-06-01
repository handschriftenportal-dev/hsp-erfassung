import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  selectAlertMessage,
  selectReadOnly,
  updateConfiguration,
  updateStandalone,
  writeDocument,
} from 'src/domain/erfassung/ErfassungsState'
import { TEISpeichernButton } from 'src/domain/toolbar/TEISpeichernButton'
import { configureTestStore, TestContext } from 'test/TestContext'

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
