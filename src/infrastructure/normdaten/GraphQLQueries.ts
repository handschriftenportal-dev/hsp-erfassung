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

import { GNDEntityFact } from '../../domain/erfassung/GNDEntityFact'

interface Query {
  query: string
  variables: Record<string, any> | null
}

const gndEntityFact = `
    id
    gndIdentifier
    preferredName
    typeName
    identifier {
      text
      type
    }
    variantName {
      name
      languageCode
    }
      `
const findGNDEntity = `query FindGNDEntity($id: String!) {
  findGNDEntityFacts(idOrName: $id) {${gndEntityFact}}
}`
const findFacts = `query FindFacts($ids: [String]) {
  findGNDEntityFactsByIds(ids: $ids) {${gndEntityFact}}
}`
const findGNDEntitiesByNodeLabel = `query findGNDEntitiesByNodeLabel($nodeLabel: String!) {
  findGNDEntityFacts(nodeLabel: $nodeLabel) {${gndEntityFact}}
}`
const findGNDEntitiesByNodeLabelAndNameOrId = `query findGNDEntitiesByNodeLabelAndNameOrId($nodeLabel: String, $nameOrId: String!) {
  findGNDEntityFacts(nodeLabel: $nodeLabel, idOrName: $nameOrId) {${gndEntityFact}}
}`
const findLanguage = `query findLanguage($id: String!) {
  findLanguageWithID(id: $id) {${gndEntityFact}}
}`
const createEntity = `mutation createEntity($gndEntityFact: GNDEntityFactGraphQLInput!) {
  create(gndEntityFact: $gndEntityFact ) {${gndEntityFact}}
}`
const findSubjectArea = `query subjectArea($notation: String!) {
  findSubjectArea(notation: $notation) {
    ...schemeIdentifier
    thesauri {
      ...schemeIdentifier
      concepts {
        id
        notation
        uri
        labels {
          text
          isoCode
        }
        altLabels {
          text
          isoCode
        }
        definition {
          text
          isoCode
        }
        topConcept
        narrower
        broader
      }
    }
  }
}
fragment schemeIdentifier on ConceptSchemeGraphQL {
  id
  notation
  uri
  labels {
    text
    isoCode
  }
}
`

export const GraphQLQueries = Object.freeze({
  findGNDEntityFacts(id: string): Query {
    return {
      query: findGNDEntity,
      variables: { id },
    }
  },
  findGNDEntitiesByIds(ids: string[]): Query {
    return {
      query: findFacts,
      variables: { ids },
    }
  },
  findGNDEntitiesByNode(nodeLabel: string): Query {
    return {
      query: findGNDEntitiesByNodeLabel,
      variables: { nodeLabel },
    }
  },
  findGNDEntitiesByNodeWithVariantName(
    nodeLabel: string,
    nameOrId: string
  ): Query {
    return {
      query: findGNDEntitiesByNodeLabelAndNameOrId,
      variables: { nodeLabel, nameOrId },
    }
  },
  findLanguageByIDQuery(id: string): Query {
    return {
      query: findLanguage,
      variables: { id },
    }
  },
  findSubjectArea(notation: string): Query {
    return {
      query: findSubjectArea,
      variables: { notation },
    }
  },
  createGNDEntity(gndEntityFact: Partial<GNDEntityFact>): Query {
    return {
      query: createEntity,
      variables: { gndEntityFact },
    }
  },
})
