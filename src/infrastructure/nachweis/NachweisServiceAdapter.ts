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

import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import i18n from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Node } from 'slate'

import { prefetchNormdata } from '../../domain/editor/normdaten/useNormdaten'
import { AlertMessage } from '../../domain/erfassung/AlertMessage'
import {
  ChangedComponent,
  INITIAL_LOAD,
} from '../../domain/erfassung/ChangedComponent'
import { Configuration } from '../../domain/erfassung/Configuration'
import {
  selectConfiguration,
  updateApplicationBusy,
  updateBeschreibung,
  updateComponentChangedHistory,
  updateNormdatum,
  updateSlate,
} from '../../domain/erfassung/ErfassungsState'
import { DetailError } from '../../domain/erfassung/transformation/DetailError'
import { AxiosHeader } from '../AxiosHeader'
import { APICall } from '../normdaten/APICall'
import { LocalStorageFavoritePersistenceAdapter } from '../persistence/LocalStorageFavoritePersistenceAdapter'
import { extractNormdatumLinks } from '../slate/SlateNormdataBoundary'
import { XMLPipeline } from '../slate/transformation/XMLPipeline'
import { Beschreibung } from './Beschreibung'
import {
  ImportValidationResponse,
  NachweisValidationResponse,
} from './ValidationResponse'

export interface NachweisSperren {
  id: string
  bearbeiter: {
    id: string
    rolle: string
  }
}

export const speichern = (
  beschreibungsUrl: string,
  authorizationToken: string,
  acceptLanguage: Configuration['language'],
  serializedXml: string
): Promise<AlertMessage> => {
  return axios
    .post(
      beschreibungsUrl,
      serializedXml,
      AxiosHeader.xml({
        acceptLanguage,
        authorizationToken,
      })
    )
    .then((response) => response.data)
}

export const useSpeichern = (): ((
  serializedXml: string
) => Promise<AlertMessage>) => {
  const { beschreibungsUrl, authorizationToken, language } =
    useSelector(selectConfiguration)

  return (serializedXml: string) =>
    speichern(beschreibungsUrl, authorizationToken, language, serializedXml)
}

export const findKODSignaturen = (
  beschreibungsUrl: string,
  authorizationToken: string,
  dispatch: Dispatch
): void => {
  const axiosConfig = AxiosHeader.json({
    authorizationToken,
  })
  const url = `${beschreibungsUrl}/signaturen`
  axios
    .get(url, axiosConfig)
    .then(function (response) {
      const signaturen = response.data
      if (signaturen) {
        dispatch(updateBeschreibung({ kodsignaturen: signaturen }))
      }
    })
    .catch(function (error) {
      console.error('Finding KOD Signature failed', {
        url,
        axiosConfig,
        error,
      })
    })
}

export const useFindKODSignaturen = () => {
  const dispatch = useDispatch()
  const { beschreibungsUrl, authorizationToken, standalone } =
    useSelector(selectConfiguration)
  return () => {
    if (!standalone) {
      findKODSignaturen(beschreibungsUrl, authorizationToken, dispatch)
    }
  }
}

export const findBeschreibungSperren = (
  beschreibungsUrl: string,
  authorizationToken: string
): Promise<NachweisSperren[]> => {
  const axiosConfig = AxiosHeader.json({
    authorizationToken,
  })
  const url = `${beschreibungsUrl}/sperren`
  return axios
    .get(url, axiosConfig)
    .then((response: AxiosResponse<NachweisSperren[]>) => response.data)
    .catch(function (error) {
      console.error('Finding description lock failed', {
        url,
        axiosConfig,
        error,
      })
      return []
    })
}

export function useFindBeschreibungsSperren(): () => Promise<
  NachweisSperren[]
> {
  const { beschreibungsUrl, authorizationToken } =
    useSelector(selectConfiguration)
  return () => findBeschreibungSperren(beschreibungsUrl, authorizationToken)
}

type Preferences = {
  sonderzeichen: string[]
}

const bearbeiterConfigEndpoint = '/rest/bearbeiter/config'

export const saveBearbeiterConfig = (
  preferences: Preferences,
  authorizationToken: string
): Promise<AxiosResponse<any>> => {
  const axiosConfig = AxiosHeader.json({
    authorizationToken,
  })
  return axios.post(bearbeiterConfigEndpoint, preferences, axiosConfig)
}

export const fetchBearbeiterConfig = (
  authorizationToken: string
): Promise<Preferences> => {
  const axiosConfig = AxiosHeader.json({
    authorizationToken,
  })
  return axios
    .get(bearbeiterConfigEndpoint, axiosConfig)
    .then(async (response) => {
      let sonderzeichen: string[] = []
      if (typeof response.data !== 'object') {
        sonderzeichen = await LocalStorageFavoritePersistenceAdapter.load()
        void saveBearbeiterConfig({ sonderzeichen }, authorizationToken)
      } else if ('sonderzeichen' in response.data) {
        sonderzeichen = response.data.sonderzeichen
      }
      return {
        sonderzeichen,
      }
    })
}

export const fetchDataFromNachweis = (
  beschreibungsUrl: string,
  authorizationToken: string,
  dispatch: Dispatch
): void => {
  dispatch(updateApplicationBusy(true))

  axios
    .get(beschreibungsUrl, AxiosHeader.xml({ authorizationToken }))
    .then(function (response) {
      const { data: nodes } = XMLPipeline.deserialize({ data: response.data })

      dispatch(updateSlate(nodes))
      dispatch(
        updateComponentChangedHistory({
          dataOrigin: INITIAL_LOAD,
          method: INITIAL_LOAD,
          id: 'Initial fragment load',
        } as ChangedComponent)
      )
      dispatch(updateBeschreibung(Beschreibung.create(nodes)))

      return nodes[0]
    })
    .catch(function (error) {
      console.error('Fetching data from Nachweis failed', {
        beschreibungsUrl,
        error,
      })
      const errorMessage = [
        {
          data_origin: 'error',
          children: [{ text: 'Error during loading document ' + error }],
        },
      ]
      dispatch(updateSlate(errorMessage))
      dispatch(
        updateComponentChangedHistory({
          dataOrigin: INITIAL_LOAD,
          method: INITIAL_LOAD,
          id: 'Initial fragment load error',
        } as ChangedComponent)
      )
      return { text: '' }
    })
    .then((beschreibung: Node) =>
      extractNormdatumLinks(beschreibung).map((link) => link.id)
    )
    .then((normdatenIds) => prefetchNormdata(normdatenIds))
    .catch((error) => {
      console.error('Invalid Normdata Link: ', error)
      return []
    })
    .then((normdaten) => {
      normdaten.forEach((fact) => {
        dispatch(updateNormdatum([fact.gndIdentifier, APICall.success(fact)]))
      })
    })
    .finally(() => {
      dispatch(updateApplicationBusy(false))
    })
}

export const useFetchBeschreibung = () => {
  const dispatch = useDispatch()
  const { beschreibungsUrl, authorizationToken } =
    useSelector(selectConfiguration)

  return () => {
    fetchDataFromNachweis(beschreibungsUrl, authorizationToken, dispatch)
  }
}

export const validateTEI = (
  validationUrl: string,
  data: string,
  withODD: boolean
): Promise<ImportValidationResponse> => {
  const axiosConfig = AxiosHeader.xml({
    acceptLanguage: i18n.language as 'en' | 'de',
  })

  if (withODD) {
    axiosConfig.headers['de.staatsbibliothek.berlin.hsp.schema'] = 'ODD'
  }

  return axios
    .post(validationUrl, data, axiosConfig)
    .then(handleValidationResponse)
}

export function handleValidationResponse(response: {
  data: unknown
}): ImportValidationResponse {
  const { data } = response
  if (isNachweisServiceValidationResponse(data)) {
    const { content } = data
    return Object.assign(content, { details: [] })
  }
  if (isImportServiceValidationResponse(data)) {
    return data
  }
  return {
    column: '',
    line: '',
    message: 'API Error: Unexpected response format',
    valid: false,
    details: [],
  }
}

function isOldContentWithoutDetails(content: unknown): boolean {
  return (
    typeof content === 'object' &&
    content !== null &&
    'column' in content &&
    typeof content.column === 'string' &&
    'line' in content &&
    typeof content.line === 'string' &&
    'message' in content &&
    typeof content.message === 'string' &&
    'valid' in content &&
    typeof content.valid === 'boolean'
  )
}

function isNachweisServiceValidationResponse(
  data: unknown
): data is NachweisValidationResponse {
  return (
    typeof data == 'object' &&
    data !== null &&
    'success' in data &&
    typeof data.success === 'boolean' &&
    'message' in data &&
    typeof data.message === 'string' &&
    'level' in data &&
    typeof data.level === 'string' &&
    ['info', 'warning', 'error'].includes(data.level) &&
    'content' in data &&
    isOldContentWithoutDetails(data.content)
  )
}

function isImportServiceValidationResponse(
  data: unknown
): data is ImportValidationResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    isOldContentWithoutDetails(data) &&
    'details' in data &&
    Array.isArray(data.details) &&
    data.details.every(DetailError.isDetailError)
  )
}
