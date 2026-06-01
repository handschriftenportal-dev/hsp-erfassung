import { uniq } from 'lodash'
import { ThemenbereichNotationen } from 'src/domain/erfassung/ThemenbereicheAPI'
import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import type { VolltextThemenbereich } from 'src/infrastructure/slate/volltext/VolltextElement'

import { AuswahlItem } from './AuswahlItem'

export interface ThemenbereichDialogState {
  linkedText: string
  suche: string
  notation: string
  readOnly: boolean
  collapsed: Set<string>
  auswahl: AuswahlItem[]
}

function typeToNotation(type: VolltextSemantik): string {
  const notation = ThemenbereichNotationen[type]
  if (!notation) {
    throw new Error(`Unknown mapping for ${type}`)
  }
  return notation
}

export const ThemenbereichDialogState = Object.freeze({
  new(linkedText: string, notation: string): ThemenbereichDialogState {
    return {
      linkedText,
      notation,
      suche: '',
      readOnly: false,
      collapsed: new Set(),
      auswahl: [],
    }
  },
  forType(
    type: VolltextSemantik,
    linkedText: string
  ): ThemenbereichDialogState {
    return {
      linkedText,
      suche: '',
      notation: typeToNotation(type),
      readOnly: false,
      auswahl: [],
      collapsed: new Set(),
    }
  },
  fromElement(
    element: VolltextThemenbereich,
    readOnly: boolean
  ): ThemenbereichDialogState {
    const { content: linkedText, auswahl } = element
    const notation = typeToNotation(element.data_origin)
    return {
      readOnly,
      notation,
      linkedText,
      suche: '',
      auswahl: auswahl.map(({ id }) => ({ id })),
      collapsed: new Set(),
    }
  },
  canSubmit(state: ThemenbereichDialogState): boolean {
    return state.auswahl.length > 0 && state.auswahl.every(AuswahlItem.isValid)
  },
  typeToNotation,
  uniqueSelection(state: ThemenbereichDialogState): string[] {
    return uniq(
      state.auswahl.reduce<string[]>(
        (result, item) =>
          AuswahlItem.isFachbegriffItem(item)
            ? result.concat([item.id, ...item.beziehungen.auswahl])
            : result.concat(item.id),
        []
      )
    )
  },
})
