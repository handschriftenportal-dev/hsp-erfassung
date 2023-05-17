/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { HSPEditor } from '../../../src/domain/editor/HSPEditor'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { HSPToolbar } from '../../../src/domain/toolbar/HSPToolbar'
import React from 'react'
import { TestContext } from '../../TestContext'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { sendDocumentSpeichernEvent } from '../../../src/domain/editor/HSPEditorDomainEvents'

const nachweisResponseSucess = '{"success":true,"message":"Speichern wurde erfolgreich durchgeführt.","level":"info"}'

const server = setupServer(
  rest.post('/test', (req, res, ctx) => {
    return res(ctx.json(nachweisResponseSucess))
  })
)

beforeAll(() => {
  // @ts-ignore
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('HSPEditor', () => {
  it('<HSPEditor /> as default', () => {

    const editor = withReact(createEditor() as ReactEditor)
    const store = ConfigureStore

    render(<Provider store={store}>
      <Slate value={[{
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      }] as any} onChange={() => {
      }} editor={editor}><HSPEditor></HSPEditor></Slate></Provider>)

    expect(screen.getByText('A line of text in a paragraph.', { exact: false, })).toContainHTML('<span data-slate-string="true">A line of text in a paragraph.</span>')
  })

  it('<HSPEditor /> with Base Value', async () => {

    const editor = withReact(createEditor() as ReactEditor)
    const store = ConfigureStore
    store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
    store.dispatch({ type: 'erfassung/writeDocument', payload: true })

    render(<TestContext>
      <Slate value={[{
        'data_origin': 'TEI',
        'children': [{
          'data_origin': 'text',
          'children': [{
            'data_origin': 'textelement',
            'region': 'TEI',
            'children': [{ 'region': 'TEI', 'text': 'Test' }]
          }]
        }]
      }] as any} onChange={() => {
      }} editor={editor}><HSPToolbar url={'/test'}
                                     validationUrl={'/validationTest'}
                                     disabled={false}
                                     workspaceUrl={'/test'}
                                     editor={editor}></HSPToolbar><HSPEditor></HSPEditor></Slate></TestContext>)

    expect(screen.getByText('Test', { exact: false, })).toContainHTML('<span data-slate-string="true">Test</span>')
    expect(store.getState().erfassung.readOnly).toEqual(false)
    fireEvent.click(screen.getByText('Test', { exact: false, }))
    fireEvent.keyDown(screen.getByText('Test', { exact: false, }), {
      key: 's',
      code: 'KeyS',
      keyCode: 83,
      charCode: 83,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
      isTrusted: true
    })
    sendDocumentSpeichernEvent()
    await waitFor(() => {
      expect(store.getState().erfassung.unsavedDocument).toEqual(false)
    })
  })
})
