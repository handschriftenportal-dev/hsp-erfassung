import { render, screen } from '@testing-library/react'
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  readDocument,
  selectAlertMessage,
  selectReadOnly,
  updateConfiguration,
  updateMode,
  updateStandalone,
} from 'src/domain/erfassung/ErfassungsState'
import { LesenBearbeitenButton } from 'src/domain/toolbar/LesenBearbeitenButton'
import { configureTestStore, TestContext } from 'test/TestContext'

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
    <TestContext store={store}>
      <LesenBearbeitenButton />
    </TestContext>
  )

  expect(screen.getByRole('button')).toBeVisible()
  expect(selectReadOnly(store.getState())).toEqual(true)
  await userEvent.click(screen.getByRole('button'))
  expect(selectReadOnly(store.getState())).toEqual(false)
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

  await userEvent.click(screen.getByRole('button'), {
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  })

  expect(selectAlertMessage(store.getState())).toBe(undefined)
  expect(selectReadOnly(store.getState())).toEqual(true)
})

test('Switch ReadOnlyMode With Sperren', async () => {
  const store = configureTestStore()
  store.dispatch(updateStandalone(false))
  store.dispatch(
    updateConfiguration({
      isEditable: true,
    })
  )
  store.dispatch(updateMode('previewMode'))

  render(
    <TestContext store={store}>
      <LesenBearbeitenButton />
    </TestContext>
  )

  expect(screen.getByRole('button')).toBeVisible()

  await userEvent.click(screen.getByRole('button'))

  expect(selectAlertMessage(store.getState())).toBe(undefined)
  expect(selectReadOnly(store.getState())).toEqual(false)
})
