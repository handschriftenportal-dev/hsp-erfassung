import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'

export type InitiumDialogAction =
  | { type: 'set_text'; text: string }
  | { type: 'set_initium'; initium: Initium }
  | { type: 'clear_initium' }
  | { type: 'set_error'; reason: string }

export function InitiumDialogReducer(
  state: InitiumDialogState,
  action: InitiumDialogAction
): InitiumDialogState {
  if (state.status === InitiumDialogState.status.loadingError) {
    return state
  }
  const { readOnly, text } = state
  switch (action.type) {
    case 'set_text':
      return { ...state, text: action.text }
    case 'set_initium':
      return {
        status: InitiumDialogState.status.withInitium,
        initium: action.initium,
        readOnly,
        text,
      }
    case 'clear_initium':
      return {
        status: InitiumDialogState.status.withoutInitium,
        readOnly,
        text,
      }
    case 'set_error':
      return {
        status: InitiumDialogState.status.loadingError,
        reason: action.reason,
        readOnly,
        text,
      }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
    }
  }
}
