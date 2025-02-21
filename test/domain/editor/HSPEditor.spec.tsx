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
import { Provider } from 'react-redux'

import { HSPEditor } from '../../../src/domain/editor/HSPEditor'
import { sendDocumentSpeichernEvent } from '../../../src/domain/editor/HSPEditorDomainEvents'
import { selectReadOnly } from '../../../src/domain/erfassung/ErfassungsState'
import { HSPToolbar } from '../../../src/domain/toolbar/HSPToolbar'
import { createErfassungsEditor } from '../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { configureTestStore, TestContext } from '../../TestContext'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}
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
  ;(global.window as any).createHspWorkspace = jest.fn()
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
})
