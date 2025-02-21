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

import { DialogContent } from '@mui/material'
import {
  Dispatch,
  FC,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'
import { SonderzeichenGridUtilities } from './SonderzeichenGridUtilities'
import { SonderzeichenTooltip } from './SonderzeichenTooltip'

interface Props {
  state: SonderzeichenAuswahlState
  dispatch: Dispatch<SonderzeichenAuswahlAction>
  onSubmit?: (key: string) => void
}

const noop = () => undefined

export const SonderzeichenGrid: FC<Props> = memo(function SonderzeichenGrid({
  state,
  dispatch,
  onSubmit = noop,
}) {
  const table = useRef<HTMLTableElement>(null)
  const [tooltip, setTooltip] = useState(
    state.sonderzeichenKeys[state.auswahlIndex]
  )

  useEffect(() => {
    table.current!.innerHTML = SonderzeichenGridUtilities.generateTable(state)
    //   Don't rerender on change of selected
    //   The selected element should stay the same by resizing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sonderzeichenKeys, state.spalten, state.gruppe])

  useEffect(() => {
    const handleHoverEvent = (event: any) => {
      const key = event.target?.attributes['data-key']?.nodeValue
      if (key) {
        setTooltip(key)
      }
    }
    const tableNode = table.current!
    tableNode.addEventListener('mouseover', handleHoverEvent, false)
    return () => {
      tableNode.removeEventListener('mouseover', handleHoverEvent)
    }
  }, [setTooltip])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(
        SonderzeichenGridUtilities.resizeBackgroundGridPattern(
          table.current,
          dispatch
        )
      )
    })
    resizeObserver.observe(table.current!)

    return () => {
      resizeObserver.disconnect()
    }
  }, [state.spalten, dispatch])

  useEffect(() => {
    SonderzeichenGridUtilities.selectGridElement(table.current, state)
    const tooltip = state.sonderzeichenKeys[state.auswahlIndex]
    if (tooltip) {
      setTooltip(tooltip)
    }
  }, [state])

  useEffect(() => {
    const keyHandler = SonderzeichenGridUtilities.generateKeyHandler(
      state,
      dispatch,
      onSubmit
    )
    const tableNode = table.current!
    const handleKeyDown = (event: KeyboardEvent) => {
      const callback = keyHandler[event.key]
      if (callback) {
        event.preventDefault()
        const index = callback(event.ctrlKey)
        if (index !== undefined) {
          SonderzeichenGridUtilities.updateFocus(tableNode, index)
        }
      }
    }
    tableNode.addEventListener('keydown', handleKeyDown, false)
    return () => {
      tableNode.removeEventListener('keydown', handleKeyDown)
    }
  }, [state, dispatch, onSubmit])

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement
      if (!target) {
        return
      }
      if (event.detail === 2) {
        const key = target.getAttribute('data-key')
        if (key) {
          onSubmit(key)
        }
      } else {
        const s = target.getAttribute('data-index')
        if (s !== null) {
          dispatch({ type: 'setAuswahlIndex', payload: parseInt(s, 10) })
        }
      }
    },
    [dispatch, onSubmit]
  )

  return (
    <DialogContent className="sonderzeichen-auswahl-content">
      <SonderzeichenTooltip sonderzeichen={tooltip}>
        <div className="sonderzeichen-grid-scroll-container scrollbar">
          <table
            role="grid"
            className="sonderzeichen-grid"
            aria-readonly={true}
            ref={table}
            onClick={handleClick}
            tabIndex={0}
          ></table>
        </div>
      </SonderzeichenTooltip>
    </DialogContent>
  )
})
