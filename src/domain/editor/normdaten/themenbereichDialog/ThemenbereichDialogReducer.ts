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

import { uniq } from 'lodash'

import { ThemenbereichDialogState } from './ThemenbereichDialogState'

export type ThemenbereichDialogAction = {
  type: string
  payload: any
}

type Reducer = (
  state: ThemenbereichDialogState,
  action: ThemenbereichDialogAction
) => ThemenbereichDialogState

const addBegriffe: Reducer = (state, { payload }) => {
  return {
    ...state,
    auswahl: uniq(state.auswahl.concat(payload)),
  }
}

const removeBegriff: Reducer = (state, { payload }) => {
  return {
    ...state,
    auswahl: state.auswahl.filter((notation) => notation !== payload),
  }
}

const setLinkedText: Reducer = (state, { payload: linkedText }) => {
  return {
    ...state,
    linkedText,
  }
}

const setSuche: Reducer = (state, { payload: suche }) => {
  return {
    ...state,
    suche,
  }
}

const toggleCollapseIdentifier: Reducer = (state, { payload }) => {
  const collapsed = new Set(state.collapsed)
  if (collapsed.has(payload)) {
    collapsed.delete(payload)
  } else {
    collapsed.add(payload)
  }
  return { ...state, collapsed }
}

const lookup: Record<string, Reducer> = {
  addBegriffe,
  setLinkedText,
  removeBegriff,
  toggleCollapseIdentifier,
  setSuche,
}

export function ThemenbereichDialogReducer(
  state: ThemenbereichDialogState,
  action: ThemenbereichDialogAction
): ThemenbereichDialogState {
  if (state.readOnly) {
    return state
  }
  const fn = lookup[action.type]
  return fn(state, action)
}
