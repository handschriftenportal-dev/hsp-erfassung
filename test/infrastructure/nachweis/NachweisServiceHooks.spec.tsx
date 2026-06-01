import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBeschreibung,
  selectSlateState,
  updateConfiguration,
} from 'src/domain/erfassung/ErfassungsState'
import {
  useFetchBeschreibung,
  useFindBeschreibungsSperren,
  useFindKODSignaturen,
  useSpeichern,
} from 'src/infrastructure/nachweis/NachweisServiceHooks'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import Loader from 'test/LoadPublic'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('NachweisServiceHooks', () => {
  const speichern = 'Speichern'
  const sperren = 'Sperren'
  const beschreibung = 'Beschreibung'
  const signaturen = 'Signaturen'
  function TestSetup() {
    const [result, setResult] = useState('')
    const speichernHook = useSpeichern()
    const sperrenHook = useFindBeschreibungsSperren()
    const beschreibungHook = useFetchBeschreibung()
    const signaturenHook = useFindKODSignaturen()
    const beschreibungsObject = useSelector(selectBeschreibung)
    const slateValue = useSelector(selectSlateState)
    return (
      <>
        <button
          onClick={() =>
            speichernHook().then((response) => setResult(response.message))
          }
        >
          {speichern}
        </button>
        <button
          onClick={() =>
            sperrenHook().then((sperren) =>
              setResult(sperren.map((sperre) => sperre.id).join(', '))
            )
          }
        >
          {sperren}
        </button>
        <button onClick={() => beschreibungHook()}>{beschreibung}</button>
        <button onClick={() => signaturenHook()}>{signaturen}</button>
        <input readOnly aria-label="general" value={result} />
        <input
          readOnly
          aria-label={signaturen}
          value={beschreibungsObject.kodsignaturen}
        />
        <input
          readOnly
          aria-label={beschreibung}
          value={HSPNode.extractFirstText(slateValue[0])}
        />
      </>
    )
  }

  const server = setupServer(
    http.post('/normdaten', () => {
      return HttpResponse.json({})
    }),
    http.post('/beschreibung-123', () => {
      return HttpResponse.json({
        success: true,
        message: 'Speichern erfolgreich',
        level: 'info',
        content: '',
      })
    }),
    http.get('/beschreibung-123', () => {
      return HttpResponse.xml(Loader.loremIpsum())
    }),
    http.get('/beschreibung-123/sperren', () => {
      return HttpResponse.json([
        { id: 'a', bearbeiter: { id: 'b-ke101', rolle: 'Redakteur' } },
        { id: 'b', bearbeiter: { id: 'b-ke101', rolle: 'Redakteur' } },
      ])
    }),
    http.get('/beschreibung-123/signaturen', () => {
      return HttpResponse.json('Signaturen')
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  beforeEach(() => {
    const store = configureTestStore()
    store.dispatch(
      updateConfiguration({
        standalone: false,
        beschreibungsUrl: '/beschreibung-123',
        normdatenUrl: '/normdaten',
      })
    )
    render(
      <TestContext store={store}>
        <TestSetup />
      </TestContext>
    )
  })

  it('can save document', async () => {
    await userEvent.click(screen.getByRole('button', { name: speichern }))
    expect(screen.getByRole('textbox', { name: 'general' })).toHaveValue(
      'Speichern erfolgreich'
    )
  })

  it('can load sperren', async () => {
    await userEvent.click(screen.getByRole('button', { name: sperren }))
    expect(screen.getByRole('textbox', { name: 'general' })).toHaveValue('a, b')
  })

  it('can load beschreibung', async () => {
    await userEvent.click(screen.getByRole('button', { name: beschreibung }))
    expect(screen.getByRole('textbox', { name: beschreibung })).toHaveValue(
      'Catalogi bibliothecae Bordesholmensis'
    )
  })

  it('can load signaturen', async () => {
    await userEvent.click(screen.getByRole('button', { name: signaturen }))
    expect(screen.getByRole('textbox', { name: signaturen })).toHaveValue(
      'Signaturen'
    )
  })
})
