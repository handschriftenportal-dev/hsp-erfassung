/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TEISpeichernButton } from '../../../src/domain/toolbar/TEISpeichernButton'
import '@testing-library/jest-dom'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { TestContext } from '../../TestContext'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'

const nachweisResponseSucess = '{"success":true,"message":"Speichern wurde erfolgreich durchgeführt.","level":"info"}'

const server = setupServer(
  rest.post('/test', (req, res, ctx) => {
    return res(ctx.json(nachweisResponseSucess))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('TEIDownloadButton', async () => {
  const editor = withReact(createEditor() as ReactEditor)
  const store = ConfigureStore
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  const setNachweisResponse = jest.fn()
  const setOpenMessage = jest.fn()
  store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
  store.dispatch({ type: 'erfassung/writeDocument', payload: true })

  render(<TestContext><Slate value={slateValue} onChange={() => {
  }} editor={editor}><TEISpeichernButton title={'Speichern'}
                                         url={'/test'}
                                         setNachweisResponse={setNachweisResponse}
                                         setOpenMessage={setOpenMessage}
                                         saveAllowed={true}></TEISpeichernButton></Slate></TestContext>)
  fireEvent.mouseDown(screen.getByTitle('Speichern'))
  expect(store.getState().erfassung.readOnly).toEqual(false)

  await waitFor(() => {
    expect(screen.getByTitle('Speichern')).toBeVisible()
    expect(setNachweisResponse.mock.calls.length).toBe(1)
    expect(setOpenMessage.mock.calls.length).toBe(1)
  })
})
