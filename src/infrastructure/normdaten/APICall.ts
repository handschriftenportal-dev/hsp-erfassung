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

import { useTranslation } from 'react-i18next'

export type APICallSuccess<T> = { status: 'success'; value: T }
export type APICallLoading = { status: 'loading' }
export type APICallNotFound = { status: 'not_found' }
export type APICallFailed<E = any> = { status: 'failed'; reason: E }
export type APICall<T, E = any> =
  | APICallSuccess<T>
  | APICallLoading
  | APICallNotFound
  | APICallFailed<E>

const status = {
  success: 'success',
  loading: 'loading',
  not_found: 'not_found',
  failed: 'failed',
} as const

export const APICall = Object.freeze({
  status,
  loading(): APICallLoading {
    return { status: status.loading }
  },
  notFound(): APICallNotFound {
    return { status: status.not_found }
  },
  tooManyResults(): APICallFailed<string> {
    return {
      status: status.failed,
      reason: 'Too many results',
    }
  },
  success<T>(value: T): APICallSuccess<T> {
    return { status: status.success, value }
  },
  failed<E>(reason: E): APICallFailed<E> {
    return { status: status.failed, reason }
  },
  isSuccess<T, E>(apiCall: APICall<T, E>): apiCall is APICallSuccess<T> {
    return apiCall.status === status.success
  },
  isNotFound<T, E>(apiCall: APICall<T, E>): apiCall is APICallNotFound {
    return apiCall.status === status.not_found
  },
})

export function useAPICallTranslation<T>() {
  const { t } = useTranslation()
  return (
    apiCall: APICall<T>,
    successValueToString: (value: T) => string = () => ''
  ): string => {
    switch (apiCall.status) {
      case APICall.status.success:
        return successValueToString(apiCall.value)
      case APICall.status.loading:
        return t('api_call.state.loading')
      case APICall.status.not_found:
        return t('api_call.state.not_found')
      case APICall.status.failed:
        return t('api_call.state.failed')
    }
  }
}
