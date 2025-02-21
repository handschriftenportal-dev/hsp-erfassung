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

import { Configuration } from '../domain/erfassung/Configuration'
import { MimeTypes } from './MimeTypes'

type AxiosHeaderOpts = {
  acceptLanguage: Configuration['language']
  contentType: string
  authorizationToken: string
}
interface AxiosConfig {
  headers: {
    'Content-Type': string
    'Accept-Language'?: string
    'de.staatsbibliothek.berlin.hsp.schema'?: 'ODD'
    Authorization?: string
  }
}
type CreateAxiosConfigFn = (opt: Partial<AxiosHeaderOpts>) => AxiosConfig

const generic: CreateAxiosConfigFn = ({
  acceptLanguage,
  contentType,
  authorizationToken,
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
