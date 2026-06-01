import type { Configuration } from 'src/domain/erfassung/Configuration'

import { MimeTypes } from './MimeTypes'

type AxiosHeaderOpts = {
  acceptLanguage: Configuration['language']
  contentType: string
  authorizationToken: string
  timeout: number
  signal?: AbortSignal | null
}
interface AxiosConfig {
  headers: {
    'Content-Type': string
    'Accept-Language'?: string
    'de.staatsbibliothek.berlin.hsp.schema'?: 'ODD'
    Authorization?: string
  }
  timeout?: number
}
type CreateAxiosConfigFn = (opt: Partial<AxiosHeaderOpts>) => AxiosConfig

const generic: CreateAxiosConfigFn = ({
  acceptLanguage,
  contentType,
  authorizationToken,
  timeout,
}: Partial<AxiosHeaderOpts>): AxiosConfig => {
  const axiosConfig: AxiosConfig = {
    headers: {
      'Content-Type': contentType ?? MimeTypes.applicationXmlUtf8,
    },
  }
  if (authorizationToken) {
    axiosConfig.headers['Authorization'] = `Bearer ${authorizationToken}`
  }
  if (acceptLanguage) {
    axiosConfig.headers['Accept-Language'] = acceptLanguage
  }
  if (timeout) {
    axiosConfig.timeout = timeout
  }
  return axiosConfig
}

const xml: CreateAxiosConfigFn = (opts) =>
  generic({ ...opts, contentType: MimeTypes.applicationXmlUtf8 })
const json: CreateAxiosConfigFn = (opts) =>
  generic({ ...opts, contentType: MimeTypes.applicationJsonUtf8 })

export const AxiosHeader = Object.freeze({
  generic,
  xml,
  json,
})
