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

import axios from 'axios'

import {
  NodeLabel,
  NormdatenService,
} from '../../domain/erfassung/NormdatenService'
import { AxiosHeader } from '../AxiosHeader'
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

  function query(body: any) {
    return axios.post(normdatenUrl, body, AxiosHeader.json({}))
  }
  function mutation(body: any) {
    return authorizationToken
      ? axios.post(
          normdatenUrl,
          body,
          AxiosHeader.json({
            authorizationToken,
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
  }

  return Object.freeze(result)
}

export const SBBNormdatenServiceAdapter = createSBBNormdatenServiceAdapter()
