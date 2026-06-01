import type { Initium } from 'src/domain/erfassung/Initium'

const status = Object.freeze({
  loadingFromTei: 'loadingFromTei',
  withInitium: 'withInitium',
  withoutInitium: 'withoutInitium',
  loadingError: 'loadingError',
} as const satisfies Record<string, string>)

type LoadingFromTeiState = {
  status: 'loadingFromTei'
  readOnly: boolean
  text: string
  id: string
  uri: string
}
type WithoutInitiumState = {
  status: 'withoutInitium'
  readOnly: boolean
  text: string
}
type WithInitiumState = {
  status: 'withInitium'
  readOnly: boolean
  text: string
  initium: Initium
}
type LoadingErrorState = {
  status: 'loadingError'
  readOnly: boolean
  text: string
  reason: string
}

export type InitiumDialogState =
  | LoadingFromTeiState
  | WithoutInitiumState
  | WithInitiumState
  | LoadingErrorState

type InitParams =
  | {
      text: string
      readOnly?: boolean
    }
  | {
      text: string
      readOnly?: boolean
      uri: string
      id: string
    }
  | {
      text: string
      initium: Initium
      readOnly?: boolean
    }

export const InitiumDialogState = Object.freeze({
  status,
  is: Object.freeze({
    submittable(state: InitiumDialogState): boolean {
      return (
        !state.readOnly &&
        state.status === status.withInitium &&
        state.text.trim() !== ''
      )
    },
    loadingFromTeiState(
      state: InitiumDialogState
    ): state is LoadingFromTeiState {
      return state.status === status.loadingFromTei
    },
    withoutInitiumState(
      state: InitiumDialogState
    ): state is WithoutInitiumState {
      return state.status === status.withoutInitium
    },
    withInitiumState(state: InitiumDialogState): state is WithInitiumState {
      return state.status === status.withInitium
    },
    loadingErrorState(state: InitiumDialogState): state is LoadingErrorState {
      return state.status === status.loadingError
    },
  }),
  new(initParams: InitParams): InitiumDialogState {
    const { text, readOnly = false } = initParams
    if ('initium' in initParams) {
      return {
        status: status.withInitium,
        text,
        readOnly,
        initium: initParams.initium,
      }
    }
    if ('uri' in initParams) {
      return {
        status: status.loadingFromTei,
        uri: initParams.uri,
        id: initParams.id,
        text,
        readOnly,
      }
    }
    return { status: status.withoutInitium, text, readOnly }
  },
  initium(state: InitiumDialogState): Initium | null {
    return state.status === status.withInitium ? state.initium : null
  },
})
