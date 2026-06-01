import type { Dispatch } from 'react'

import { SonderzeichenAPI } from './SonderzeichenAPI'
import type { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import type { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

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
  const next: HTMLTableCellElement | null = table.querySelector(
    `td[data-index="${auswahlIndex}"]`
  )
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
  const selected: HTMLTableCellElement | null = table.querySelector(
    `td[data-index="${index}"]`
  )
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
