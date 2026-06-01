import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'
import { HSPEditor } from 'src/domain/editor/HSPEditor'
import { sendDocumentSpeichernEvent } from 'src/domain/editor/HSPEditorDomainEvents'
import {
  selectReadOnly,
  updateBeschreibung,
} from 'src/domain/erfassung/ErfassungsState'
import { HSPToolbar } from 'src/domain/toolbar/HSPToolbar'
import de from 'src/infrastructure/i18n/translation_de.json'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from 'test/TestContext'

const nachweisResponseSucess =
  '{"success":true,"message":"Speichern wurde erfolgreich durchgeführt.","level":"info"}'

const server = setupServer(
  http.post('/test', () => {
    return HttpResponse.json(nachweisResponseSucess)
  }),
  http.post('/', () => {
    return HttpResponse.json({})
  })
)

beforeAll(() => {
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HSPEditor', () => {
  it('<HSPEditor /> as default', () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()

    render(
      <Provider store={store}>
        <HSPEditor
          editor={editor}
          value={[
            {
              data_origin: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }],
            },
          ]}
        />
      </Provider>
    )

    expect(
      screen.getByText('A line of text in a paragraph.', { exact: false })
    ).toContainHTML(
      '<span data-slate-string="true">A line of text in a paragraph.</span>'
    )
  })

  it('<HSPEditor /> with Base Value', async () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    act(() => {
      store.dispatch({ type: 'erfassung/updateStandalone', payload: false })
      store.dispatch({ type: 'erfassung/writeDocument', payload: true })
    })
    const slateValue = [
      {
        data_origin: 'TEI',
        children: [
          {
            data_origin: 'text',
            children: [{ region: 'TEI', text: 'Test' }],
          },
        ],
      },
    ]
    render(
      <TestContext store={store}>
        <HSPToolbar editor={editor} />
        <HSPEditor editor={editor} value={slateValue} />
      </TestContext>
    )

    expect(screen.getByText('Test', { exact: false })).toContainHTML(
      '<span data-slate-string="true">Test</span>'
    )
    expect(selectReadOnly(store.getState())).toEqual(false)

    act(() => {
      fireEvent.click(screen.getByText('Test', { exact: false }))
      fireEvent.keyDown(screen.getByText('Test', { exact: false }), {
        key: 's',
        code: 'KeyS',
        keyCode: 83,
        charCode: 83,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
        isTrusted: true,
      })
      sendDocumentSpeichernEvent()
    })

    await waitFor(() => {
      expect(store.getState().erfassung.unsavedDocument).toEqual(false)
    })
  })

  it('renders disclaimer for retro description', () => {
    const editor = createErfassungsEditor()
    const store = configureTestStore()
    store.dispatch(
      updateBeschreibung({
        type: 'hsp:description_retro',
      })
    )

    render(
      <TestContext store={store}>
        <HSPEditor
          editor={editor}
          value={[
            {
              data_origin: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }],
            },
          ]}
        />
      </TestContext>
    )

    expect(
      screen.getByRole('heading', { name: de.retro.heading })
    ).toBeVisible()
  })
})
