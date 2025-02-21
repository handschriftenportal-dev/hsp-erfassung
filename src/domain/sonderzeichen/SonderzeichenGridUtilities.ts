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

import { Dispatch } from 'react'

import { SonderzeichenAPI } from './SonderzeichenAPI'
import { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

const generateTable = (state: SonderzeichenAuswahlState) => {
  const { spalten, sonderzeichenKeys, auswahlIndex } = state
  const columns = [...Array(spalten).keys()]
  const rows = [...Array(Math.ceil(sonderzeichenKeys.length / spalten)).keys()]

  return `<tbody>${rows
    .map(
      (row) =>
        `<tr role="row">
      ${columns
        .map((column) => {
          const index = row * spalten + column
          const key = sonderzeichenKeys[index]
          if (!key) {
            return '<td role="gridcell" aria-disabled="true"></td>'
          }
          return `<td
              role="gridcell"
              aria-disabled="false"
              data-row="${row}"
              data-column="${column}"
              data-index="${index}"
              data-key="${key}"
              aria-selected="${index === auswahlIndex ? 'true' : 'false'}"
              tabIndex="-1"
            >
              ${SonderzeichenAPI.getSonderzeichen(key).sign}
            </td>`
        })
        .join('')}
    </tr>`
    )
    .join('')}
  </tbody>`
}

const generateKeyHandler = (
  state: SonderzeichenAuswahlState,
  dispatch: Dispatch<SonderzeichenAuswahlAction>,
  onSubmit: (key: string) => void
): Record<string, (isCtrlPressed: boolean) => number | undefined> => {
  const { auswahlIndex, sonderzeichenKeys, spalten } = state
  const setAuswahlIndex = (payload: number): number => {
    dispatch({ type: 'setAuswahlIndex', payload })
    return payload
  }

  return {
    ArrowLeft: () => {
      if (auswahlIndex > 0) {
        return setAuswahlIndex(auswahlIndex - 1)
      }
    },
    ArrowRight: () => {
      if (auswahlIndex < sonderzeichenKeys.length - 1) {
        return setAuswahlIndex(auswahlIndex + 1)
      }
    },
    ArrowUp: () => {
      if (auswahlIndex > 2) {
        return setAuswahlIndex(auswahlIndex - spalten)
      }
    },
    ArrowDown: () => {
      if (auswahlIndex < sonderzeichenKeys.length - spalten - 1) {
        return setAuswahlIndex(auswahlIndex + spalten)
      }
    },
    Home: (isCtrlPressed) => {
      if (isCtrlPressed) {
        return setAuswahlIndex(0)
      } else {
        return setAuswahlIndex(auswahlIndex - (auswahlIndex % spalten))
      }
    },
    End: (isCtrlPressed) => {
      if (isCtrlPressed) {
        return setAuswahlIndex(sonderzeichenKeys.length - 1)
      } else {
        return setAuswahlIndex(
          Math.min(
            sonderzeichenKeys.length - 1,
            auswahlIndex - (auswahlIndex % spalten) + spalten - 1
          )
        )
      }
    },
    PageUp: () => {
      return setAuswahlIndex(auswahlIndex % spalten)
    },
    PageDown: () => {
      const lastRowIndex =
        sonderzeichenKeys.length -
        (sonderzeichenKeys.length % spalten) +
        (auswahlIndex % spalten)
      return setAuswahlIndex(
        lastRowIndex < sonderzeichenKeys.length
          ? lastRowIndex
          : lastRowIndex - spalten
      )
    },
    Enter: () => {
      onSubmit(sonderzeichenKeys[auswahlIndex])
      return undefined
    },
  }
}

const selectGridElement = (
  table: HTMLTableElement | null,
  state: SonderzeichenAuswahlState
): void => {
  const { auswahlIndex } = state
  if (table === null) {
    return
  }
  table
    .querySelectorAll('td[role="gridcell"][aria-selected="true"]')
    .forEach((el) => {
      el.setAttribute('aria-selected', 'false')
    })
  const next: any = table.querySelector(`td[data-index="${auswahlIndex}"]`)
  if (next) {
    next.setAttribute('aria-selected', 'true')
  }
}

const MAX_GRID_CELL_WIDTH = 70

const resizeBackgroundGridPattern =
  (
    table: HTMLTableElement | null,
    dispatch: Dispatch<SonderzeichenAuswahlAction>
  ) =>
  (entry: ResizeObserverEntry): void => {
    if (entry.contentBoxSize && table) {
      const inlineSize = entry.contentBoxSize[0].inlineSize
      const spalten = Math.floor(inlineSize / MAX_GRID_CELL_WIDTH)

      table.style.backgroundSize = `${inlineSize / spalten}px 54px`
      dispatch({ type: 'setSpalten', payload: spalten })
    }
  }

const updateFocus = (table: HTMLTableElement, index: number): void => {
  const selected: any = table.querySelector(`td[data-index="${index}"]`)
  if (selected) {
    selected.focus()
  }
}

export const SonderzeichenGridUtilities = Object.freeze({
  generateTable,
  generateKeyHandler,
  selectGridElement,
  resizeBackgroundGridPattern,
  updateFocus,
})
