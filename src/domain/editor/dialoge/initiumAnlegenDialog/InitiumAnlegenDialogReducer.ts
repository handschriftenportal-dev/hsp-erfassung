import { uniq } from 'lodash'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { Initium } from 'src/domain/erfassung/Initium'

export type InitiumAnlegenDialogAction =
  | { type: 'set_text'; text: string }
  | { type: 'set_languages'; languages: GNDEntityFact[] }
  | { type: 'show_error'; message: string }
  | { type: 'confirm_unknown_language' }
  | { type: 'check_duplicates' }
  | { type: 'duplicates_found'; duplicates: Initium[] }
  | { type: 'use_initium'; initium: Initium }
  | { type: 'enter_initium' }
  | { type: 'create_initium' }
  | { type: 'submit' }
  | { type: 'cancel' }

function submit(state: InitiumAnlegenDialogState): InitiumAnlegenDialogState {
  switch (state.type) {
    case 'entering_initium':
      if (InitiumAnlegenDialogState.isUnknownLanguageState(state)) {
        return {
          ...state,
          type: 'confirming_unknown_language',
          languages: uniq([...state.languages, state.unknownLanguage]),
        }
      } else {
        return {
          ...state,
          type: 'checking_for_duplicates',
        }
      }
    case 'confirming_unknown_language':
      return {
        ...state,
        type: 'checking_for_duplicates',
      }
    case 'resolving_duplicates':
      return {
        ...state,
        type: 'creating_initium',
      }
    case 'error': {
      return { ...state, type: 'cancel' }
    }

    default:
      return state
  }
}

export function InitiumAnlegenDialogReducer(
  state: InitiumAnlegenDialogState,
  action: InitiumAnlegenDialogAction
): InitiumAnlegenDialogState {
  switch (action.type) {
    case 'submit':
      return submit(state)
    case 'cancel':
      return { ...state, type: 'cancel' }
    case 'set_text':
      return {
        ...state,
        type: 'entering_initium',
        text: action.text,
      }
    case 'set_languages':
      return {
        ...state,
        type: 'entering_initium',
        languages: uniq(action.languages),
      }
    case 'show_error':
      return {
        ...state,
        type: 'error',
        message: action.message,
      }
    case 'confirm_unknown_language':
      return {
        ...state,
        type: 'confirming_unknown_language',
      }
    case 'check_duplicates':
      return {
        ...state,
        type: 'checking_for_duplicates',
      }
    case 'duplicates_found':
      return {
        ...state,
        type: 'resolving_duplicates',
        duplicates: action.duplicates,
      }
    case 'enter_initium':
      return {
        ...state,
        type: 'entering_initium',
      }
    case 'use_initium':
      return {
        ...state,
        type: 'apply_initium',
        initium: action.initium,
      }
    case 'create_initium': {
      return {
        ...state,
        type: 'creating_initium',
      }
    }
  }
}
