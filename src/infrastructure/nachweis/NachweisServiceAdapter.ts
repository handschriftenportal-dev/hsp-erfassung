import type { Dispatch } from '@reduxjs/toolkit'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import i18n from 'i18next'
import type { Descendant } from 'slate'
import { prefetchNormdata } from 'src/domain/editor/normdaten/useNormdaten'
import type { ChangedComponent } from 'src/domain/erfassung/ChangedComponent'
import { INITIAL_LOAD } from 'src/domain/erfassung/ChangedComponent'
import type { Configuration } from 'src/domain/erfassung/Configuration'
import {
  updateApplicationBusy,
  updateBeschreibung,
  updateComponentChangedHistory,
  updateNormdatum,
  updateSlate,
} from 'src/domain/erfassung/ErfassungsState'
import { DetailError } from 'src/domain/erfassung/transformation/DetailError'
import { AxiosHeader } from 'src/infrastructure/AxiosHeader'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { LocalStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'
import { extractNormdatumLinks } from 'src/infrastructure/slate/SlateNormdataBoundary'
import { XMLPipeline } from 'src/infrastructure/slate/transformation/XMLPipeline'

import { Beschreibung } from './Beschreibung'
import type {
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

export type SpeichernResponse = {
  success: boolean
  message: string
  level: 'info' | 'warning' | 'error'
  content: string
}

function isSpeichernResponse(x: unknown): x is SpeichernResponse {
  return (
    typeof x === 'object' &&
    x !== null &&
    'success' in x &&
    typeof x.success === 'boolean' &&
    'message' in x &&
    typeof x.message === 'string' &&
    'level' in x &&
    typeof x.level === 'string'
  )
}

const malformedSpeichernResponse: SpeichernResponse = {
  success: true,
  level: 'warning',
  content: '',
  message: 'Unexpected NachweisService Response',
}

export const speichern = (
  beschreibungsUrl: string,
  authorizationToken: string,
  acceptLanguage: Configuration['language'],
  serializedXml: string
): Promise<SpeichernResponse> => {
  return axios
    .post(
      beschreibungsUrl,
      serializedXml,
      AxiosHeader.xml({
        acceptLanguage,
        authorizationToken,
      })
    )
    .then((response) =>
      isSpeichernResponse(response.data)
        ? response.data
        : malformedSpeichernResponse
    )
    .catch((error) => {
      return {
        success: false,
        message: error.message,
        level: 'error',
        content: '',
      }
    })
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

type Preferences = {
  sonderzeichen: string[]
}

const bearbeiterConfigEndpoint = '/rest/bearbeiter/config'

export const saveBearbeiterConfig = (
  preferences: Preferences,
  authorizationToken: string
): Promise<AxiosResponse<unknown>> => {
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
    .then((beschreibung: Descendant) =>
      extractNormdatumLinks(beschreibung).map((link) => link.id)
    )
    .then((normdatenIds) => prefetchNormdata(normdatenIds))
    .catch((error) => {
      console.error('Invalid Normdata Link: ', error)
      return []
    })
    .then((normdaten) => {
      normdaten.forEach((fact) => {
        dispatch(
          updateNormdatum([
            fact.gndIdentifier ?? fact.id,
            APICall.success(fact),
          ])
        )
      })
    })
    .finally(() => {
      dispatch(updateApplicationBusy(false))
    })
}

export const validateTEI = (
  validationUrl: string,
  data: string,
  withODD: boolean
): Promise<ImportValidationResponse> => {
  const axiosConfig = AxiosHeader.xml({
    acceptLanguage: i18n.language as 'en' | 'de',
    timeout: 10000,
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
