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

import { act, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { HSP_ERFASSUNGS_EDITOR_ID } from '../src/domain/editor/HSPEditor'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}
const server = setupServer(
  http.get('/test', () => {
    return HttpResponse.xml('<TEI><teiHeader>Test</teiHeader></TEI>')
  })
)

beforeAll(() => {
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe.skip.each(['true', 'false'])('Test index (%s)', (readonly) => {
  test('Index JS', async () => {
    act(() => {
      const div = document.createElement('div')
      div.setAttribute('id', HSP_ERFASSUNGS_EDITOR_ID)
      div.setAttribute('data-url', 'http://localhost:8080/test')
      div.setAttribute('data-readonly', readonly)
      document.body.appendChild(div)
    })

    await import('../src/index').then(() => {
      expect(screen.getByTitle('Bearbeiten', { exact: false })).toBeVisible()
    })
  })
})
