import { DialogContent } from '@mui/material'
import type { Dispatch, FC, MouseEvent } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsFullscreen } from 'src/domain/erfassung/ErfassungsState'

import type { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import type { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'
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
  const isFullscreen = useSelector(selectIsFullscreen)

  useEffect(() => {
    table.current!.innerHTML = SonderzeichenGridUtilities.generateTable(state)
    //   Don't rerender on change of selected
    //   The selected element should stay the same by resizing
  }, [state.sonderzeichenKeys, state.spalten, state.gruppe])

  useEffect(() => {
    const handleHoverEvent = (event: Event) => {
      const target = event.target as HTMLElement
      const key = target?.getAttribute('data-key')
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
        <div
          className="sonderzeichen-grid-scroll-container scrollbar"
          data-fullscreen={isFullscreen}
        >
          <table
            role="grid"
            className="sonderzeichen-grid"
            aria-readonly
            ref={table}
            onClick={handleClick}
            tabIndex={0}
          />
        </div>
      </SonderzeichenTooltip>
    </DialogContent>
  )
})
