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

import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { LesenBearbeitenButton } from '../../../src/domain/toolbar/LesenBearbeitenButton'
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get('/sperren', (req, res, ctx) => {
    return res(ctx.json([]))
  }),
  rest.get('/test/sperren', (req, res, ctx) => {
    return res(ctx.json([{ id: '1', bearbeiter: { id: 'b-ke101', rolle: 'Redakteur' } }]))
  }))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('LesenBearbeitenButton', () => {
  const store = ConfigureStore
  const editor = withReact(createEditor() as ReactEditor)
  const slateValue = [{
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }]

  render(<Provider store={store}><Slate value={slateValue} onChange={() => {
  }} editor={editor}><LesenBearbeitenButton titleRead={'Bearbeiten'} titleWrite={'Bearbeitung beenden'}
                                            disabled={false} setNachweisResponse={null} setOpenMessage={null}
                                            url={''}></LesenBearbeitenButton></Slate></Provider>)

  expect(screen.getByTitle('Bearbeiten')).toBeVisible()
  expect(store.getState().erfassung.readOnly).toEqual(true)
  fireEvent.mouseDown(screen.getByTitle('Bearbeiten'))
  expect(store.getState().erfassung.readOnly).toEqual(false)
})

test('Switch ReadOnlyMode Without Sperren', async () => {
  const store = ConfigureStore
  const editor = withReact(createEditor() as ReactEditor)
  const slateValue: Array<any> = []
  store.dispatch({ type: 'erfassung/readDocument', payload: true })
  store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
  const setNachweisResponse = jest.fn()
  const setOPenMessage = jest.fn()

  render(<Provider store={store}><Slate value={slateValue} onChange={() => {
  }} editor={editor}><LesenBearbeitenButton titleRead={'Bearbeiten'} titleWrite={'Bearbeitung beenden'}
                                            disabled={false} setNachweisResponse={setNachweisResponse}
                                            setOpenMessage={setOPenMessage}
                                            url={''}></LesenBearbeitenButton></Slate></Provider>)

  expect(screen.getByTitle('Bearbeiten')).toBeVisible()

  fireEvent.mouseDown(screen.getByTitle('Bearbeiten'))

  await waitFor(() => {
    expect(setNachweisResponse.mock.calls.length).toBe(0)
    expect(setOPenMessage.mock.calls.length).toBe(0)
    expect(store.getState().erfassung.readOnly).toEqual(false)
  })
})

test('Switch ReadOnlyMode With Sperren', async () => {
  const store = ConfigureStore
  const editor = withReact(createEditor() as ReactEditor)
  const slateValue: Array<any> = []
  store.dispatch({ type: 'erfassung/readDocument', payload: true })
  store.dispatch({ type: 'erfassung/disableStandalone', payload: true })
  const setNachweisResponse = jest.fn()
  const setOPenMessage = jest.fn()

  render(<Provider store={store}><Slate value={slateValue} onChange={() => {
  }} editor={editor}><LesenBearbeitenButton titleRead={'Bearbeiten'} titleWrite={'Bearbeitung beenden'}
                                            disabled={false} setNachweisResponse={setNachweisResponse}
                                            setOpenMessage={setOPenMessage}
                                            url={'/test'}></LesenBearbeitenButton></Slate></Provider>)

  expect(screen.getByTitle('Bearbeiten')).toBeVisible()

  fireEvent.mouseDown(screen.getByTitle('Bearbeiten'))

  await waitFor(() => {
    expect(setNachweisResponse.mock.calls.length).toBe(1)
    expect(setOPenMessage.mock.calls.length).toBe(1)
    expect(store.getState().erfassung.readOnly).toEqual(true)
  })
})
