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

import { act, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { ErfassungsContext } from '../../../src/domain/erfassung/ErfassungsContext'
import { TestContext } from '../../TestContext'

const server = setupServer(
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.xml('<TEI><msDesc>Erfassungscontext</msDesc></TEI>'))
  })
)

beforeAll(() => {
  // @ts-ignore
  global.window.createHspWorkspace = jest.fn()
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ErfassungsContext', () => {
  it('<ErfassungsContext /> as default', async () => {

    act(() => {
      render(<TestContext><ErfassungsContext enableHSPToolBar={'true'} url={'/test'}></ErfassungsContext></TestContext>)
    })

    await waitFor(() => {
      expect(screen.getByText('Erfassungscontext', { exact: false, })).toContainHTML('<span data-slate-string="true">Erfassungscontext</span>')
    })
  })
})
