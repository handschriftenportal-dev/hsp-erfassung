import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { NachweisStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/NachweisStorageFavoritePersistenceAdapter'

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
      const body = (await request.json()) as { sonderzeichen?: string[] }
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
