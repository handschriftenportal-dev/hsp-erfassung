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

import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { NachweisStorageFavoritePersistenceAdapter } from '../../../src/infrastructure/persistence/NachweisStorageFavoritePersistenceAdapter'

describe('Nachweis Storage Favorite Persistence Adapter', () => {
  const url = '/rest/bearbeiter/config'
  let token: string
  let sonderzeichen: string[]
  const server = setupServer(
    http.get(url, ({ request }) => {
      token = request.headers.get('authorization') ?? ''
      return HttpResponse.json({
        sonderzeichen,
      })
    }),
    http.post(url, async ({ request }) => {
      token = request.headers.get('authorization') ?? ''
      const body: any = await request.json()
      sonderzeichen = body?.sonderzeichen ?? []
      return HttpResponse.json({})
    })
  )

  beforeAll(() => {
    server.listen()
  })
  beforeEach(() => {
    token = ''
    sonderzeichen = ['hallo', 'welt']
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  const adapter =
    NachweisStorageFavoritePersistenceAdapter.createAdapter('token')

  it('can load', async () => {
    const loaded = await adapter.load()
    expect(loaded).toMatchObject(['hallo', 'welt'])
    expect(token).toBe('Bearer token')
  })

  it('can save', async () => {
    const newSonderzeichen = ['a', 'b', 'c']
    const _ = await adapter.save(newSonderzeichen)
    expect(token).toBe('Bearer token')
    expect(sonderzeichen).toMatchObject(newSonderzeichen)
  })
})
