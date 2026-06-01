import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { Initium } from 'src/domain/erfassung/Initium'
import { v4 as uuid } from 'uuid'

import einband from './fixtures/einband.json'

interface FindGNDEntityFactsVariables {
  nodeLabel?: string
  nameOrId?: string
  id?: string
}

interface FindGNDEntityFactsByIdsVariables {
  ids: string[]
}

interface FindLanguageWithIDVariables {
  id: string
}

interface CreateVariables {
  gndEntityFact: GNDEntityFact
}

interface FindSubjectAreaVariables {
  notation: string
}

interface FindInitienVariables {
  text: string
}

interface InitiumInput {
  text: string
  languages: string[]
}

type GraphQLVariables =
  | FindGNDEntityFactsVariables
  | FindGNDEntityFactsByIdsVariables
  | FindLanguageWithIDVariables
  | CreateVariables
  | FindSubjectAreaVariables
  | FindInitienVariables
  | InitiumInput

interface GraphQLRequest {
  query: string
  variables: GraphQLVariables
}

export const MockNormdatenService = (
  url: string = 'http://normdaten.staatsbibliothek-berlin.de:9299/rest/graphql',
  delayMs?: number
) => {
  const fixture: Record<string, GNDEntityFact> = {
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

  const initien: Initium[] = [
    {
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-3d27f0b7-6468-481b-8cb4-cbf6abb8de7b',
      id: 'NORM-3d27f0b7-6468-481b-8cb4-cbf6abb8de7b',
      alternativeText: [],
      text: '"In dulci iubilo jubilo nu singet vnd seyt fro"',
      languages: [],
    },
    {
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-8cefac60-f5df-4c7e-bb86-f060cc722e0e',
      id: 'NORM-8cefac60-f5df-4c7e-bb86-f060cc722e0e',
      alternativeText: [],
      text: '"In dulci iubilo, wir singent unde sint vrô"',
      languages: [],
    },
  ]

  function graphQlMethod(query: string): string {
    return query.split('{')[1].split('(')[0].trim()
  }

  function isDefined<T>(x: T | null | undefined): x is T {
    return x !== undefined && x !== null
  }

  function second<T>(entry: [string, T]): T {
    return entry[1]
  }

  function fuzzyHit(entityFact: GNDEntityFact, searchTerm: string): boolean {
    const { id, gndIdentifier, preferredName, identifier, variantName } =
      entityFact
    return (
      id.includes(searchTerm) ||
      gndIdentifier?.includes(searchTerm) ||
      preferredName.includes(searchTerm) ||
      (!!identifier &&
        identifier.some(({ text }) => text.includes(searchTerm))) ||
      (!!variantName &&
        variantName.some(({ name }) => name.includes(searchTerm)))
    )
  }

  const methodLookup: Record<string, (vars: GraphQLVariables) => unknown> = {
    findGNDEntityFacts(vars: GraphQLVariables) {
      const { nodeLabel, nameOrId, id } = vars as FindGNDEntityFactsVariables
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
    findGNDEntityFactsByIds(vars: GraphQLVariables) {
      const { ids } = vars as FindGNDEntityFactsByIdsVariables
      return ids.map((id: string) => fixture[id]).filter(isDefined)
    },
    findLanguageWithID(vars: GraphQLVariables) {
      const { id } = vars as FindLanguageWithIDVariables
      return fixture[id] ?? null
    },
    create(vars: GraphQLVariables) {
      const { gndEntityFact } = vars as CreateVariables
      fixture[gndEntityFact.gndIdentifier ?? gndEntityFact.id] = gndEntityFact
      return gndEntityFact
    },
    findSubjectArea(vars: GraphQLVariables) {
      const { notation } = vars as FindSubjectAreaVariables
      return notation === 'BNDG' ? einband.data.findSubjectArea : null
    },
    findInitia(vars: GraphQLVariables) {
      const { text } = vars as FindInitienVariables
      return {
        items: initien.filter(
          (initium) =>
            initium.text.includes(text) ||
            initium.alternativeText.some((alternativerText) =>
              alternativerText.includes(text)
            )
        ),
      }
    },
    createInitium(vars: GraphQLVariables) {
      const { text, languages } = vars as InitiumInput
      const id = uuid()
      const initium: Initium = {
        id,
        uri: `https://normdaten.staatsbibliothek-berlin.de/hsp/initia/${id}`,
        text,
        languages: languages.map((id) => ({ id, variantName: [] })),
        alternativeText: [],
      }
      initien.push(initium)
      return initium
    },
  }

  return setupServer(
    http.post(url, async ({ request }) => {
      const { query, variables } = (await request.json()) as GraphQLRequest
      const method = graphQlMethod(query)

      if (delayMs !== undefined) {
        await delay(delayMs)
      }

      return HttpResponse.json({
        data: {
          [method]:
            method in methodLookup ? methodLookup[method](variables) : [],
        },
      })
    })
  )
}
