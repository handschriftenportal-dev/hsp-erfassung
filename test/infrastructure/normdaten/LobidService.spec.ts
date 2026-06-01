import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { LobidService } from 'src/infrastructure/normdaten/LobidService'

import fixture from './fixtures/personen.json'

const server = setupServer(
  http.get('https://lobid.org/gnd/*', () => {
    return HttpResponse.json(fixture)
  })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('LobidService', () => {
  it('can find Persons', async () => {
    const result = await LobidService.search('Programmierer')
    expect(result).toMatchObject({
      status: 'success',
      value: {
        total: expect.any(Number),
        items: expect.any(Array),
      },
    })
  })
})
