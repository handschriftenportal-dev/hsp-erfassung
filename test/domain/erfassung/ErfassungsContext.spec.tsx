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

import { act, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ErfassungsContext } from '../../../src/domain/erfassung/ErfassungsContext'
import { updateConfiguration } from '../../../src/domain/erfassung/ErfassungsState'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { TestContext } from '../../TestContext'

declare global {
  interface Window {
    createHspWorkspace: any
  }
}

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
