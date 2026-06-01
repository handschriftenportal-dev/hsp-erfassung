import type { Normdatum } from './NormdatumDialogState'
import { NormdatumDialogState } from './NormdatumDialogState'

export type NormdatumDialogAction =
  | { type: 'set_text'; text: string }
  | { type: 'set_rollen'; rollen: string[] }
  | { type: 'set_search'; search: string }
  | { type: 'set_normdatum'; normdatum: Normdatum | null }

function setText(
  state: NormdatumDialogState,
  text: string
): NormdatumDialogState {
  return state.view === NormdatumDialogState.view.read
    ? state
    : { ...state, text }
}

function setRollen(
  state: NormdatumDialogState,
  rollen: string[]
): NormdatumDialogState {
  return state.view === NormdatumDialogState.view.read
    ? state
    : { ...state, rollen }
}

function setSearch(
  state: NormdatumDialogState,
  search: string
): NormdatumDialogState {
  if (state.view === NormdatumDialogState.view.read) {
    return state
  }
  return { ...state, search, status: NormdatumDialogState.status.search }
}

function setNormdatum(
  state: NormdatumDialogState,
  normdatum: Normdatum | null
): NormdatumDialogState {
  switch (state.view) {
    case 'read': {
      return state
    }
    case 'edit': {
      if (normdatum !== null) {
        return {
          ...state,
          status: NormdatumDialogState.status.idle,
          normdatum,
        }
      }
      if (state.status === 'init') {
        return state
      }
      return {
        ...state,
        status: NormdatumDialogState.status.idle,
      }
    }
    case 'create': {
      if (normdatum !== null) {
        return {
          ...state,
          status: NormdatumDialogState.status.filled,
          normdatum,
        }
      }
      if ('normdatum' in state) {
        return {
          ...state,
          status: NormdatumDialogState.status.filled,
        }
      }
      return {
        ...state,
        status: NormdatumDialogState.status.empty,
      }
    }
  }
  return state
}

export function NormdatumDialogReducer(
  state: NormdatumDialogState,
  action: NormdatumDialogAction
): NormdatumDialogState {
  switch (action.type) {
    case 'set_text':
      return setText(state, action.text)
    case 'set_rollen':
      return setRollen(state, action.rollen)
    case 'set_search':
      return setSearch(state, action.search)
    case 'set_normdatum':
      return setNormdatum(state, action.normdatum)
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
    }
  }
}
