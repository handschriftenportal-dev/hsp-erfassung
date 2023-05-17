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

import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HSPToolbar } from '../../../src/domain/toolbar/HSPToolbar'
import '@testing-library/jest-dom'
import { TestContext } from '../../TestContext'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

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

describe('HSPToolbar', () => {
  it('Count Button', async () => {
    const editor = withReact(createEditor() as ReactEditor)
    const store = ConfigureStore
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    store.dispatch({ type: 'erfassung/enableStandalone', payload: false })

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }} editor={editor}><HSPToolbar url={'/test'}
                                         validationUrl={'/test'}
                                         disabled={false}
                                         workspaceUrl={'/test'}
                                         editor={editor}></HSPToolbar></Slate></TestContext>
        , {})

    expect(screen.getAllByRole('button').length).toEqual(6)

    fireEvent.mouseDown(screen.getByTitle('Bearbeiten'))

    expect(screen.getAllByRole('button').length).toEqual(11)
  })

  it('Check Speichern', async () => {
    const editor = withReact(createEditor() as ReactEditor)
    const store = ConfigureStore
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
    store.dispatch({ type: 'erfassung/writeDocument', payload: true })

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }} editor={editor}><HSPToolbar url={'/test'}
                                         validationUrl={'/test'}
                                         workspaceUrl={'/test'}
                                         disabled={false}
                                         editor={editor}></HSPToolbar></Slate></TestContext>
        , {})

    fireEvent.mouseDown(screen.getByTitle('Speichern'))

    await waitFor(() => {
      screen.debug()
      expect(screen.getAllByRole('alert').length).toEqual(1)
    })
  })

  it('TEI XML anzeigen', async () => {

    const editor = withReact(createEditor() as ReactEditor)
    const slateValue = [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }]

    render(
        <TestContext>
          <Slate value={slateValue} onChange={() => {
          }} editor={editor}><HSPToolbar url={'/test'}
                                         validationUrl={'/test'}
                                         workspaceUrl={'/test'}
                                         disabled={false}
                                         editor={editor}></HSPToolbar></Slate></TestContext>
        , {})

    expect(screen.getByTitle('TEI-XML anzeigen', { exact: false, })).toBeVisible()
    fireEvent.mouseDown(screen.getByTitle('TEI-XML anzeigen'))
  })
})
