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

import { VolltextThemenbereich } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { ThemenbereichNotationen } from '../../../erfassung/ThemenbereicheAPI'
import { VolltextSemantik } from '../../../erfassung/VolltextSemantik'

export interface ThemenbereichDialogState {
  linkedText: string
  suche: string
  notation: string
  readOnly: boolean
  auswahl: string[]
  collapsed: Set<string>
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
      auswahl: [],
      collapsed: new Set(),
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
      auswahl: auswahl.map(({ id }) => id),
      collapsed: new Set(),
    }
  },
  canSubmit(state: ThemenbereichDialogState): boolean {
    return state.auswahl.length > 0
  },
  typeToNotation,
})
