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

import { act, render } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { HSP_EDITOR_CONTAINER_ID } from '../../../src/domain/editor/HSPEditor'
import { updateConfiguration } from '../../../src/domain/erfassung/ErfassungsState'
import { HSPErfassungContainer } from '../../../src/domain/erfassung/HSPErfassungContainer'
import ConfigureStore from '../../../src/infrastructure/ConfigureReduxStore'
import { TestContext } from '../../TestContext'

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
