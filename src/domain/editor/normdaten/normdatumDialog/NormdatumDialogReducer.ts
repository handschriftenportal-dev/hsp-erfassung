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

import { Normdatum, NormdatumDialogState } from './NormdatumDialogState'

type SetText = { type: 'set_text'; text: string }
type SetRollen = { type: 'set_rollen'; rollen: string[] }
type SetSearch = { type: 'set_search'; search: string }
type SetNormdatum = {
  type: 'set_normdatum'
  normdatum: Normdatum | null
}

type Action = SetText | SetRollen | SetSearch | SetNormdatum

type DialogReducer<T, S = NormdatumDialogState> = (state: S, action: T) => S

const setText: DialogReducer<SetText> = (state, { text }) => {
  return state.view === NormdatumDialogState.view.read
    ? state
    : { ...state, text }
}

const setRollen: DialogReducer<SetRollen> = (state, { rollen }) => {
  return state.view === NormdatumDialogState.view.read
    ? state
    : { ...state, rollen }
}

const setSearch: DialogReducer<SetSearch> = (state, { search }) => {
  if (state.view === NormdatumDialogState.view.read) {
    return state
  }
  return { ...state, search, status: NormdatumDialogState.status.search }
}

const setNormdatum: DialogReducer<SetNormdatum> = (state, { normdatum }) => {
  if (state.view === NormdatumDialogState.view.edit) {
    return normdatum === null
      ? { ...state, status: NormdatumDialogState.status.idle }
      : {
          ...state,
          status: NormdatumDialogState.status.idle,
          normdatum,
        }
  } else if (state.view === NormdatumDialogState.view.create) {
    return normdatum === null
      ? ({
          ...state,
          status:
            'normdatum' in state
              ? NormdatumDialogState.status.filled
              : NormdatumDialogState.status.empty,
        } as any)
      : {
          ...state,
          status: NormdatumDialogState.status.filled,
          normdatum,
        }
  }
  return state
}

const lookup: Record<Action['type'], DialogReducer<any, any>> = {
  set_text: setText,
  set_rollen: setRollen,
  set_search: setSearch,
  set_normdatum: setNormdatum,
}

export function NormdatumDialogReducer(
  state: NormdatumDialogState,
  action: Action
): NormdatumDialogState {
  const fn = lookup[action.type]
  return fn(state, action)
}
