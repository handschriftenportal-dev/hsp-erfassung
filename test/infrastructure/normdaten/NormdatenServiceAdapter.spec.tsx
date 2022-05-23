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

import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { waitFor } from '@testing-library/react'
import { findGNDEntities, findGNDEntity } from '../../../src/infrastructure/normdaten/NormdatenServiceAdapter'
import { findGNDEntityFacts, GraphQLQuery } from '../../../src/infrastructure/normdaten/GraphQLQuery'
import { GNDEntity } from '../../../src/infrastructure/normdaten/GNDEntity'

const graphqlResponse = '{"data":{"findGNDEntityFacts":[{"preferredName":"Staatsbibliothek zu Berlin","gndIdentifier":"5036103-X"},{"preferredName":"Herzog August Bibliotheke","gndIdentifier":"222333-X"}]}}'
const graphqlResponseONE = '{"data":{"findGNDEntityFacts":[{"preferredName":"Staatsbibliothek zu Berlin","gndIdentifier":"5036103-X"}]}}'

const server = setupServer(
  rest.post('/rest/graphql', (req, res, ctx) => {
    const body: any = req.body
    if (body && body.query && body.query.includes('idOrName')) {
      return res(ctx.text(graphqlResponseONE))
    } else {
      return res(ctx.text(graphqlResponse))
    }

  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NormdatenServicePort', () => {

  it('<NormdatenServicePort /> Post GraphQl Success', async () => {

    const normdatenCallback = jest.fn()
    const graphql: GraphQLQuery = {
      query: findGNDEntityFacts('1'),
      variables: null,
      queryParamter: 'id'
    }

    findGNDEntity('/rest/graphql', graphql, normdatenCallback)

    await waitFor(() => {
      expect(normdatenCallback.mock.calls.length).toBe(1)
    })

  })
  it('findGNDEntitiesByLabel', async () => {

    return findGNDEntities('/rest/graphql', 'Place', '')
      .then(function (gndEntities: GNDEntity[]) {
        expect(gndEntities.length).toBe(2)
      })
  })

  it('findGNDEntitiesByName', async () => {

    return findGNDEntities('/rest/graphql', 'Place', 'Berlin')
      .then(function (gndEntities: GNDEntity[]) {
        expect(gndEntities.length).toBe(1)
      })
  })

})
