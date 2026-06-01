import { act, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { ErfassungsContext } from 'src/domain/erfassung/ErfassungsContext'
import { updateConfiguration } from 'src/domain/erfassung/ErfassungsState'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { TestContext } from 'test/TestContext'

const server = setupServer(
  http.get('/beschreibung', () => {
    return HttpResponse.xml(
      '<TEI><text><body><msDesc><p>Erfassungscontext</p></msDesc></body></text></TEI>'
    )
  }),
  http.post('/normdaten', () => {
    return HttpResponse.json({})
  }),
  http.get('/rest/bearbeiter/config', () => HttpResponse.json())
)

beforeAll(() => {
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ErfassungsContext', () => {
  const store = ConfigureStore
  const defaultConfig = {
    beschreibungsUrl: '/beschreibung',
    validationUrl: '',
    workspaceUrl: '',
    normdatenUrl: '/normdaten',
    startInReadOnly: false,
    isEditable: true,
    language: 'de',
    standalone: true,
    authorizationToken: '',
  } as const
  store.dispatch(updateConfiguration(defaultConfig))
  it('<ErfassungsContext /> as default', async () => {
    act(() => {
      render(
        <TestContext>
          <ErfassungsContext {...defaultConfig} />
        </TestContext>
      )
    })

    await waitFor(() => {
      expect(
        screen.getByText('Erfassungscontext', { exact: false })
      ).toContainHTML('<span data-slate-string="true">Erfassungscontext</span>')
    })
  })
})
