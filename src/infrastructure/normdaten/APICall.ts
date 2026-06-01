import { useTranslation } from 'react-i18next'

export type APICallSuccess<T> = { status: 'success'; value: T }
export type APICallLoading = { status: 'loading' }
export type APICallNotFound = { status: 'not_found' }
export type APICallFailed<E = unknown> = { status: 'failed'; reason: E }
export type APICall<T, E = unknown> =
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
  isFailed<T, E>(apiCall: APICall<T, E>): apiCall is APICallFailed<E> {
    return apiCall.status === status.failed
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
