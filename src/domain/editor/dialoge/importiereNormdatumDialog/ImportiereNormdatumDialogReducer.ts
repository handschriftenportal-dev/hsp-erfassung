import { APICall } from 'src/infrastructure/normdaten/APICall'
import type { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'

import { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'
import { NormdatenServiceError } from './NormdatenServiceError'

type LobidResult = {
  items: LobidEntity[]
  total: number
}

type SetPageAction = { type: 'set_page'; page: number }
type SetSearchTermAction = { type: 'set_search_term'; searchTerm: string }
type SetRowsPerPageAction = { type: 'set_rows_per_page'; rowsPerPage: number }
type SetApiResult = { type: 'set_api_result'; result: APICall<LobidResult> }
type SetSelected = { type: 'set_selected'; selected: number }
type SetImportFailed = { type: 'set_import_failed'; error: unknown }

type Action =
  | SetSearchTermAction
  | SetPageAction
  | SetRowsPerPageAction
  | SetApiResult
  | SetSelected
  | SetImportFailed

type DialogReducer<T> = (
  state: ImportiereNormdatumDialogState,
  action: T
) => ImportiereNormdatumDialogState

const setPage: DialogReducer<SetPageAction> = (state, { page }) => {
  const position = page * state.rowsPerPage
  if (page === state.page || position > state.total) {
    return state
  }
  return {
    ...state,
    status: ImportiereNormdatumDialogState.status.loading,
    selected: 0,
    page,
  }
}

const setRowsPerPage: DialogReducer<SetRowsPerPageAction> = (
  state,
  { rowsPerPage }
) => {
  if (rowsPerPage === state.rowsPerPage) {
    return state
  }
  const position = state.selected + state.rowsPerPage * state.page
  return {
    ...state,
    status: ImportiereNormdatumDialogState.status.loading,
    rowsPerPage: rowsPerPage,
    page: Math.floor(position / rowsPerPage),
    selected: position % rowsPerPage,
  }
}

const setSearchTerm: DialogReducer<SetSearchTermAction> = (
  state,
  { searchTerm }
) => {
  if (searchTerm === state.searchTerm) {
    return state
  }
  return {
    ...state,
    status: ImportiereNormdatumDialogState.status.loading,
    page: 0,
    selected: 0,
    searchTerm: searchTerm,
  }
}

const setApiResult: DialogReducer<SetApiResult> = (state, { result }) => {
  if (APICall.isSuccess(result)) {
    const { items, total } = result.value
    return {
      ...state,
      items,
      total,
      status: result.status,
      selected: 0,
      page: Math.min(state.page, Math.floor(total / state.rowsPerPage)),
    }
  } else {
    return {
      ...state,
      status: result.status,
    }
  }
}

const setSelected: DialogReducer<SetSelected> = (state, { selected }) => {
  if (state.items.length > selected && selected >= 0) {
    return {
      ...state,
      status: ImportiereNormdatumDialogState.status.success,
      selected,
    }
  }
  return state
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (NormdatenServiceError.isNormdatenServiceError(error)) {
    return error.reason.error
  }
  return `Unknown error: ${JSON.stringify(error)}`
}

const setImportFailed: DialogReducer<SetImportFailed> = (state, { error }) => {
  return {
    ...state,
    status: ImportiereNormdatumDialogState.status.import_failed,
    error: errorMessage(error),
  }
}

export function ImportiereNormdatumDialogReducer(
  state: ImportiereNormdatumDialogState,
  action: Action
): ImportiereNormdatumDialogState {
  switch (action.type) {
    case 'set_page':
      return setPage(state, action)
    case 'set_search_term':
      return setSearchTerm(state, action)
    case 'set_rows_per_page':
      return setRowsPerPage(state, action)
    case 'set_api_result':
      return setApiResult(state, action)
    case 'set_selected':
      return setSelected(state, action)
    case 'set_import_failed':
      return setImportFailed(state, action)
    default:
      return state
  }
}
