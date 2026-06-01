import { render, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  selectEntstehungsorte,
  selectGrundsprachen,
} from 'src/domain/erfassung/ErfassungsState'
import { NormdatenInitializer } from 'src/domain/erfassung/NormdatenInitializer'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('NormdatenInitializer', () => {
  const server = setupServer(
    http.post('*', () =>
      HttpResponse.json({
        data: {
          findGNDEntityFacts: [
            {
              id: 'NORM-a95a0b39-186f-387b-949f-87f20b44bdb5',
              gndIdentifier: '4116533-0',
              preferredName: 'sorbisch',
              typeName: 'Language',
            },
            {
              id: 'NORM-c9089f3c-9ada-3018-af6f-fb1ee8d6501c',
              gndIdentifier: '4114364-4',
              preferredName: 'lateinisch',
              typeName: 'Language',
            },
          ],
        },
      })
    )
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('loads grundsprachen and saves into redux storage', async () => {
    const store = configureTestStore()
    render(
      <TestContext store={store}>
        <NormdatenInitializer />
      </TestContext>
    )
    await waitFor(() => {
      expect(selectGrundsprachen(store.getState())).not.toHaveLength(0)
    })
    expect(selectGrundsprachen(store.getState())).toHaveLength(2)
  })

  it('loads enstehungsorte and saves into redux storage', async () => {
    const store = configureTestStore()
    render(
      <TestContext store={store}>
        <NormdatenInitializer />
      </TestContext>
    )
    await waitFor(() => {
      expect(selectEntstehungsorte(store.getState())).not.toHaveLength(0)
    })
    expect(selectEntstehungsorte(store.getState())).toHaveLength(2)
  })
})
