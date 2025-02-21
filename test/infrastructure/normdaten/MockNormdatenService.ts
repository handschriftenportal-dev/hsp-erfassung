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

import { GNDEntityFact } from '../../../src/domain/erfassung/GNDEntityFact'
import einband from './fixtures/einband.json'

export const MockNormdatenService = (
  url: string = 'http://normdaten.staatsbibliothek-berlin.de:9299/rest/graphql'
) => {
  const fixture: Record<string, any> = {
    '118575449': {
      id: 'NORM-258c6031-1128-325c-82ee-3859e6930fe1',
      gndIdentifier: '118575449',
      preferredName: 'Luther, Martin',
      typeName: 'Person',
      identifier: [{ text: '31711049', type: '' }],
      variantName: null,
    },
    '1228671265': {
      id: 'NORM-faeac4e1-eef3-37c2-ab7b-0a3821e6c667',
      gndIdentifier: '1228671265',
      preferredName: 'Robert Giel',
      typeName: 'Person',
      identifier: [{ text: '06', type: '' }],
      variantName: [{ name: 'Giel, Robert', languageCode: null }],
    },
    de: {
      id: 'NORM-5f02f088-9301-3d7b-a1ac-972c11bf3e7d',
      gndIdentifier: '4113292-0',
      preferredName: 'deutsch',
      typeName: 'Language',
      identifier: [
        { text: 'deu', type: 'ISO_639-2' },
        { text: 'de', type: 'ISO_639-1' },
        { text: 'ger', type: 'ISO_639-2' },
      ],
      variantName: [
        { name: 'Hochdeutsch', languageCode: 'de' },
        { name: 'Deutsche Sprache', languageCode: 'de' },
        { name: 'Neuhochdeutsch', languageCode: 'de' },
        { name: 'Deutsch', languageCode: 'de' },
      ],
    },
    '4005728-8': {
      id: 'NORM-ee1611b6-1f56-38e7-8c12-b40684dbb395',
      gndIdentifier: '4005728-8',
      preferredName: 'Berlin',
      typeName: 'Place',
      identifier: [],
      variantName: null,
    },
    '2122805-X': {
      id: 'NORM-27b42637-1017-3469-aa55-2988b28648f1',
      gndIdentifier: '2122805-X',
      preferredName: 'Geheimes Staatsarchiv - Preußischer Kulturbesitz',
      typeName: 'CorporateBody',
      identifier: [],
      variantName: [],
    },
    '5036103-X': {
      id: 'NORM-774909e2-f687-30cb-a5c4-ddc95806d6be',
      gndIdentifier: '5036103-X',
      preferredName: 'Staatsbibliothek zu Berlin',
      typeName: 'CorporateBody',
      identifier: [],
      variantName: [],
    },
  }

  function graphQlMethod(query: string): string {
    return query.split('{')[1].split('(')[0].trim()
  }

  function isDefined(x: unknown) {
    return x !== undefined && x !== null
  }

  function second(entry: [string, any]): any {
    return entry[1]
  }

  function fuzzyHit(entityFact: GNDEntityFact, searchTerm: string): boolean {
    const { id, gndIdentifier, preferredName, identifier, variantName } =
      entityFact
    return (
      id.includes(searchTerm) ||
      gndIdentifier.includes(searchTerm) ||
      preferredName.includes(searchTerm) ||
      (!!identifier &&
        identifier.some(({ text }) => text.includes(searchTerm))) ||
      (!!variantName &&
        variantName.some(({ name }) => name.includes(searchTerm)))
    )
  }

  const methodLookup: Record<string, (vars: any) => any> = {
    findGNDEntityFacts({ nodeLabel, nameOrId, id }) {
      if (id) {
        return id in fixture ? [fixture[id]] : []
      }
      return Object.entries(fixture)
        .map(second)
        .filter((gndEntityFact) => {
          return (
            gndEntityFact.typeName === nodeLabel &&
            (!nameOrId || fuzzyHit(gndEntityFact, nameOrId))
          )
        })
    },
    findGNDEntityFactsByIds({ ids }) {
      return ids.map((id: string) => fixture[id]).filter(isDefined)
    },
    findLanguageWithID({ id }) {
      return fixture[id] ?? null
    },
    create({ gndEntityFact }) {
      fixture[gndEntityFact.gndIdentifier] = gndEntityFact
      return gndEntityFact
    },
    findSubjectArea({ notation }) {
      return notation === 'BNDG' ? einband.data.findSubjectArea : null
    },
  }

  return setupServer(
    http.post(url, async ({ request }) => {
      const { query, variables } = (await request.json()) as any
      const method = graphQlMethod(query)

      return HttpResponse.json({
        data: {
          [method]:
            method in methodLookup ? methodLookup[method](variables) : [],
        },
      })
    })
  )
}
