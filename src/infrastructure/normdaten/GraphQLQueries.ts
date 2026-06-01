import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'

interface Query {
  query: string
  variables: Record<string, unknown> | null
}

const gndEntityFact = `
    id
    uri
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
    }`
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
        hasKeyFeature
        hasAdditionalFeature
        hasOneKeyFeatureFrom {
          id
          members
        }
        hasSomeKeyFeaturesFrom {
          id
          members
        }
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
const findInitienByText = `query initien($text: String!) {
  findInitia(filter: { text: $text }, limit: 10) {
    items {
      id
      uri
      text
      alternativeText
      languages {
        id
        gndIdentifier
        variantName {
          isoCode: languageCode
          text: name
        } 
      }
    }
  }
}
`

const findInitiumById = `query initien($id: String!) {
  findInitia(filter: { id: $id }, limit: 1) {
    items {
      id
      uri
      text
      alternativeText
      languages {
        id
        gndIdentifier
        variantName {
          isoCode: languageCode
          text: name
        } 
      }
    }
  }
}`

const createInitium = `mutation createInitium($text: String!, $languages: [String]!) {
  createInitium(initiumInput: { text: $text, languages: $languages }) {
    id
    uri
    text
    alternativeText
    languages {
      id
      gndIdentifier
      variantName {
        isoCode: languageCode
        text: name
      } 
    }
  }
}`

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
  findInitiumByText(text: string): Query {
    return {
      query: findInitienByText,
      variables: { text },
    }
  },
  findInitiumById(id: string): Query {
    return {
      query: findInitiumById,
      variables: { id },
    }
  },
  createGNDEntity(gndEntityFact: Partial<GNDEntityFact>): Query {
    return {
      query: createEntity,
      variables: { gndEntityFact },
    }
  },
  createInitium(text: string, languages: string[]): Query {
    return {
      query: createInitium,
      variables: { text, languages },
    }
  },
})
