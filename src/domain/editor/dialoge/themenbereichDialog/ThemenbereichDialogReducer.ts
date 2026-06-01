import { cloneDeep, uniqBy } from 'lodash'

import { AuswahlItem } from './AuswahlItem'
import type { ThemenbereichDialogState } from './ThemenbereichDialogState'

export type ThemenbereichDialogAction =
  | { type: 'addBegriffe'; payload: AuswahlItem | AuswahlItem[] }
  | { type: 'removeBegriff'; payload: string }
  | { type: 'setLinkedText'; payload: ThemenbereichDialogState['linkedText'] }
  | { type: 'setSuche'; payload: ThemenbereichDialogState['suche'] }
  | { type: 'toggleCollapseIdentifier'; payload: string }
  | {
      type: 'toggleBeziehungsAuswahl'
      payload: { item: AuswahlItem; id: string }
    }
  | {
      type: 'selectFromMenge'
      payload: {
        item: AuswahlItem
        menge: { id: string; elemente: readonly string[] }
        value: string
      }
    }

export function ThemenbereichDialogReducer(
  state: ThemenbereichDialogState,
  action: ThemenbereichDialogAction
): ThemenbereichDialogState {
  if (state.readOnly) {
    return state
  }

  switch (action.type) {
    case 'addBegriffe': {
      const { payload } = action
      return {
        ...state,
        auswahl: uniqBy(state.auswahl.concat(payload), 'id'),
      }
    }

    case 'removeBegriff': {
      const { payload } = action
      return {
        ...state,
        auswahl: state.auswahl.filter(({ id }) => id !== payload),
      }
    }

    case 'setLinkedText': {
      const { payload: linkedText } = action
      return {
        ...state,
        linkedText,
      }
    }

    case 'setSuche': {
      const { payload: suche } = action
      return {
        ...state,
        suche,
      }
    }

    case 'toggleCollapseIdentifier': {
      const { payload } = action
      const collapsed = new Set(state.collapsed)
      if (collapsed.has(payload)) {
        collapsed.delete(payload)
      } else {
        collapsed.add(payload)
      }
      return { ...state, collapsed }
    }

    case 'toggleBeziehungsAuswahl': {
      const {
        payload: { item, id },
      } = action
      if (!AuswahlItem.isFachbegriffItem(item)) {
        return state
      }
      const newItem = cloneDeep(item)
      const { auswahl } = newItem.beziehungen
      if (auswahl.has(id)) {
        auswahl.delete(id)
      } else {
        auswahl.add(id)
      }
      return {
        ...state,
        auswahl: state.auswahl.map((auswahlItem) =>
          auswahlItem === item ? newItem : auswahlItem
        ),
      }
    }

    case 'selectFromMenge': {
      const {
        payload: { item, menge, value },
      } = action
      if (!AuswahlItem.isFachbegriffItem(item)) {
        return state
      }
      const newItem = cloneDeep(item)
      const { auswahl } = newItem.beziehungen
      const { elemente } = menge
      elemente.forEach((element) => auswahl.delete(element))
      auswahl.add(value)
      return {
        ...state,
        auswahl: state.auswahl.map((auswahlItem) =>
          auswahlItem === item ? newItem : auswahlItem
        ),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
    }
  }
}
