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

import { APICall } from '../../../../infrastructure/normdaten/APICall'
import { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'
import { NormdatenServiceError } from './NormdatenServiceError'

type SetPageAction = { type: 'set_page'; page: number }
type SetSearchTermAction = { type: 'set_search_term'; searchTerm: string }
type SetRowsPerPageAction = { type: 'set_rows_per_page'; rowsPerPage: number }
type SetApiResult = { type: 'set_api_result'; result: APICall<any> }
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

const lookup: Record<Action['type'], DialogReducer<any>> = {
  set_page: setPage,
  set_search_term: setSearchTerm,
  set_rows_per_page: setRowsPerPage,
  set_api_result: setApiResult,
  set_selected: setSelected,
  set_import_failed: setImportFailed,
}

export function ImportiereNormdatumDialogReducer(
  state: ImportiereNormdatumDialogState,
  action: Action
): ImportiereNormdatumDialogState {
  const fn = lookup[action.type]
  return fn(state, action)
}
