import { act, render } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { HSP_EDITOR_CONTAINER_ID } from 'src/domain/editor/HSPEditor'
import { updateConfiguration } from 'src/domain/erfassung/ErfassungsState'
import { HSPErfassungContainer } from 'src/domain/erfassung/HSPErfassungContainer'
import ConfigureStore from 'src/infrastructure/ConfigureReduxStore'
import { TestContext } from 'test/TestContext'

const xml = '<TEI><text><body><msDesc><p>Test</p></msDesc></body></text></TEI>'
const server = setupServer(
  http.get('/beschreibung', () => HttpResponse.xml(xml)),
  http.get('/', () => HttpResponse.json({})),
  http.post('/', () => HttpResponse.json({}))
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HSPErfassungContainer', () => {
  it('<HSPErfassungContainer /> as default', async () => {
    const store = ConfigureStore
    const defaultConfig = {
      beschreibungsUrl: '/beschreibung',
      validationUrl: '',
      workspaceUrl: '',
      normdatenUrl: '',
      startInReadOnly: false,
      isEditable: true,
      language: 'de',
      standalone: true,
      authorizationToken: '',
    } as const
    act(() => store.dispatch(updateConfiguration(defaultConfig)))

    const result = render(
      <TestContext>
        <HSPErfassungContainer />
      </TestContext>
    )

    expect(
      result.container.querySelector(`#${HSP_EDITOR_CONTAINER_ID}`)
    ).toBeTruthy()
  })
})
