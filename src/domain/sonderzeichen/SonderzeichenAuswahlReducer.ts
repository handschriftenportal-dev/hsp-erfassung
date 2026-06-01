import { SonderzeichenAPI } from './SonderzeichenAPI'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

type SetSucheAction = {
  type: 'setSuche'
  payload: string
}
type SetGruppeAction = {
  type: 'setGruppe'
  payload: string
}
type SetAuswahlIndexAction = {
  type: 'setAuswahlIndex'
  payload: number
}
type SetSpaltenAction = {
  type: 'setSpalten'
  payload: number
}
type ToggleFavoriteAction = {
  type: 'toggleFavorite'
  payload: string
}
type SetAnsichtAction = {
  type: 'setAnsicht'
  payload: string
}

export type SonderzeichenAuswahlAction =
  | SetSucheAction
  | SetGruppeAction
  | SetAuswahlIndexAction
  | SetSpaltenAction
  | ToggleFavoriteAction
  | SetAnsichtAction

type Reducer<T = SonderzeichenAuswahlAction> = (
  state: SonderzeichenAuswahlState,
  action: T
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

const setSuche: Reducer<SetSucheAction> = (state, { payload: suche }) => {
  if (suche === state.suche) {
    return state
  }
  return applyFilter({ ...state, suche })
}

const setGruppe: Reducer<SetGruppeAction> = (state, { payload: gruppe }) => {
  if (gruppe === state.gruppe) {
    return state
  }
  return applyFilter({ ...state, gruppe })
}

const setAuswahlIndex: Reducer<SetAuswahlIndexAction> = (
  state,
  { payload: auswahlIndex }
) => {
  if (
    auswahlIndex === state.auswahlIndex ||
    auswahlIndex < 0 ||
    auswahlIndex >= state.sonderzeichenKeys.length
  ) {
    return state
  }
  return { ...state, auswahlIndex }
}

const setSpalten: Reducer<SetSpaltenAction> = (state, { payload: spalten }) => {
  if (spalten === state.spalten) {
    return state
  }
  return { ...state, spalten }
}

const toggleFavorite: Reducer<ToggleFavoriteAction> = (
  state,
  { payload: key }
) => {
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

const setAnsicht: Reducer<SetAnsichtAction> = (state, { payload: ansicht }) => {
  if (
    ansicht === SonderzeichenAuswahlState.ansicht.favoriten ||
    ansicht === SonderzeichenAuswahlState.ansicht.zeichensaetze
  ) {
    return applyFilter({ ...state, ansicht })
  } else {
    return state
  }
}

export function SonderzeichenAuswahlReducer(
  state: SonderzeichenAuswahlState,
  action: SonderzeichenAuswahlAction
): SonderzeichenAuswahlState {
  switch (action.type) {
    case 'setAuswahlIndex':
      return setAuswahlIndex(state, action)
    case 'setSpalten':
      return setSpalten(state, action)
    case 'setGruppe':
      return setGruppe(state, action)
    case 'setSuche':
      return setSuche(state, action)
    case 'toggleFavorite':
      return toggleFavorite(state, action)
    case 'setAnsicht':
      return setAnsicht(state, action)
  }
}
