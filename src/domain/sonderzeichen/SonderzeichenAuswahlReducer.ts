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

import { SonderzeichenAPI } from './SonderzeichenAPI'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

export type SonderzeichenAuswahlAction = {
  type: string
  payload: any
}

type Reducer = (
  state: SonderzeichenAuswahlState,
  action: SonderzeichenAuswahlAction
) => SonderzeichenAuswahlState

function applyFilter(
  state: SonderzeichenAuswahlState
): SonderzeichenAuswahlState {
  const { gruppe, suche: descriptionFilter } = state
  const key = state.sonderzeichenKeys[state.auswahlIndex]
  const sonderzeichenKeys = SonderzeichenAuswahlState.zeigeFavoriten(state)
    ? state.api.getList(descriptionFilter)
    : SonderzeichenAPI.getList({
        gruppe,
        descriptionFilter,
      })
  const auswahlIndex = Math.max(
    sonderzeichenKeys.findIndex((k) => k === key),
    0
  )
  return { ...state, sonderzeichenKeys, auswahlIndex }
}

const setSuche: Reducer = (state, { payload: suche }) => {
  if (suche === state.suche) {
    return state
  }
  return applyFilter({ ...state, suche })
}

const setGruppe: Reducer = (state, { payload: gruppe }) => {
  if (gruppe === state.gruppe) {
    return state
  }
  return applyFilter({ ...state, gruppe })
}

const setAuswahlIndex: Reducer = (state, { payload: auswahlIndex }) => {
  if (
    auswahlIndex === state.auswahlIndex ||
    auswahlIndex < 0 ||
    auswahlIndex >= state.sonderzeichenKeys.length
  ) {
    return state
  }
  return { ...state, auswahlIndex }
}

const setSpalten: Reducer = (state, { payload: spalten }) => {
  if (spalten === state.spalten) {
    return state
  }
  return { ...state, spalten }
}

const toggleFavorite: Reducer = (state, { payload: key }) => {
  if (state.api.isFavorit(key)) {
    state.api.remove(key)
  } else {
    state.api.add(key)
  }
  return SonderzeichenAuswahlState.zeigeFavoriten(state)
    ? applyFilter(state)
    : // Create a shallow copy of state to trigger rerender
      { ...state }
}

const setAnsicht: Reducer = (state, { payload: ansicht }) => {
  if (
    ansicht === SonderzeichenAuswahlState.ansicht.favoriten ||
    ansicht === SonderzeichenAuswahlState.ansicht.zeichensaetze
  ) {
    return applyFilter({ ...state, ansicht })
  } else {
    return state
  }
}

const lookup: Record<string, Reducer> = {
  setAuswahlIndex,
  setSpalten,
  setGruppe,
  setSuche,
  toggleFavorite,
  setAnsicht,
}

export function SonderzeichenAuswahlReducer(
  state: SonderzeichenAuswahlState,
  action: SonderzeichenAuswahlAction
): SonderzeichenAuswahlState {
  const fn = lookup[action.type]
  return fn(state, action)
}
