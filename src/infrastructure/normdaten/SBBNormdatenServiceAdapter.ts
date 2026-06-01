import axios from 'axios'
import type {
  NodeLabel,
  NormdatenService,
} from 'src/domain/erfassung/NormdatenService'
import { AxiosHeader } from 'src/infrastructure/AxiosHeader'

import { APICall } from './APICall'
import { GraphQLQueries } from './GraphQLQueries'

const nodeLabelLookup: Record<NodeLabel, string> = {
  person: 'Person',
  ort: 'Place',
  koerperschaft: 'CorporateBody',
  sprache: 'Language',
}

export function createSBBNormdatenServiceAdapter(): NormdatenService {
  let normdatenUrl = ''
  let authorizationToken = ''

  function query(body: unknown, signal?: AbortSignal) {
    return axios.post(normdatenUrl, body, AxiosHeader.json({ signal }))
  }
  function mutation(body: unknown, signal?: AbortSignal) {
    return authorizationToken
      ? axios.post(
          normdatenUrl,
          body,
          AxiosHeader.json({
            authorizationToken,
            signal,
          })
        )
      : Promise.reject('No authorization token supplied')
  }

  const result: NormdatenService = {
    updateConfiguration(config) {
      normdatenUrl = config.normdatenUrl ?? normdatenUrl
      authorizationToken = config.authorizationToken ?? authorizationToken
    },
    fetchEntityById(id) {
      return query(GraphQLQueries.findGNDEntityFacts(id)).then((response) => {
        const entities = response.data?.data?.findGNDEntityFacts
        if (!Array.isArray(entities)) {
          return APICall.failed({
            error: 'findGNDEntityFacts not on response',
            cause: response.data,
          })
        }
        return entities.length === 0
          ? APICall.notFound()
          : entities.length > 1
            ? APICall.tooManyResults()
            : APICall.success(entities[0])
      })
    },
    fetchEntitiesByIds(ids) {
      return query(GraphQLQueries.findGNDEntitiesByIds(ids)).then(
        (response) => {
          const entities = response.data?.data?.findGNDEntityFactsByIds
          if (!Array.isArray(entities)) {
            return APICall.failed({
              error: 'findGNDEntityFactsByIds not on response',
              cause: response.data,
            })
          }
          return APICall.success(entities)
        }
      )
    },
    fetchLanguageById(id) {
      return query(GraphQLQueries.findLanguageByIDQuery(id)).then(
        (response) => {
          const language = response.data?.data?.findLanguageWithID
          return language ? APICall.success(language) : APICall.notFound()
        }
      )
    },
    findGNDEntity(nodeLabel, searchTerm) {
      const label = nodeLabelLookup[nodeLabel]
      return query(
        searchTerm
          ? GraphQLQueries.findGNDEntitiesByNodeWithVariantName(
              label,
              searchTerm
            )
          : GraphQLQueries.findGNDEntitiesByNode(label)
      ).then((response) => {
        const entities = response.data?.data?.findGNDEntityFacts
        if (!Array.isArray(entities)) {
          return APICall.failed({
            error: 'findGNDEntityFacts not on response',
            cause: response.data,
          })
        }
        return APICall.success(entities)
      })
    },
    putGNDEntity(entity) {
      return mutation(GraphQLQueries.createGNDEntity(entity))
        .then((response) => {
          const entity = response.data?.data?.create
          if (!entity) {
            return APICall.failed({
              error: 'Mutation error',
              cause: response.data,
            })
          }
          return APICall.success(entity)
        })
        .catch((error) => APICall.failed(error))
    },
    findSubjectArea(notation) {
      return query(GraphQLQueries.findSubjectArea(notation)).then(
        (response) => {
          const themenbereich = response.data?.data?.findSubjectArea
          if (themenbereich) {
            return APICall.success(themenbereich)
          } else if (themenbereich === null) {
            return APICall.notFound()
          } else {
            return APICall.failed({
              error:
                'Invalid response: Expected "{ data: { findSubjectArea: [Object object] } }"',
              cause: response.data,
            })
          }
        }
      )
    },
    findInitiumByText(text, signal) {
      return query(GraphQLQueries.findInitiumByText(text), signal).then(
        (response) => {
          const initien = response.data?.data?.findInitia?.items
          if (initien) {
            return APICall.success(initien)
          } else if (initien === null) {
            return APICall.notFound()
          } else {
            return APICall.failed({
              error:
                'Invalid response: Expected "{ data: { findInitia: { items: [Object object] } } }"',
              cause: response.data,
            })
          }
        }
      )
    },
    findInitiumById(id, signal) {
      return query(GraphQLQueries.findInitiumById(id), signal).then(
        (response) => {
          const initien = response.data?.data?.findInitia?.items
          if (initien) {
            return APICall.success(initien)
          } else if (initien === null) {
            return APICall.notFound()
          } else {
            return APICall.failed({
              error:
                'Invalid response: Expected "{ data: { findInitia: { items: [Object object] } } }"',
              cause: response.data,
            })
          }
        }
      )
    },
    putInitium(text, languages, signal) {
      return mutation(GraphQLQueries.createInitium(text, languages), signal)
        .then((response) => {
          if (response.data?.errors) {
            return APICall.failed({
              error: 'Error creating initium',
              cause: response.data.errors,
            })
          }

          const initium = response.data?.data?.createInitium
          if (initium) {
            return APICall.success(initium)
          }

          return APICall.failed({
            error:
              'Invalid response: Expected "{ data: { createInitium: [Object object] } }"',
            cause: response.data,
          })
        })
        .catch((cause) => {
          return APICall.failed({
            error: 'Server error',
            cause,
          })
        })
    },
  }

  return Object.freeze(result)
}

export const SBBNormdatenServiceAdapter = createSBBNormdatenServiceAdapter()
