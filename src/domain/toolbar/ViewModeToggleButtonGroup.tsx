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

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { memo, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectMode,
  selectReadOnly,
  updateApplicationBusy,
  updateMode,
} from '../erfassung/ErfassungsState'
import { ViewMode, ViewModes } from '../erfassung/ViewMode'
import { DiscountOutlinedIcon } from './icons/DiscountOutlinedIcon'
import { NormalansichtIcon } from './icons/NormalansichtIcon'

function selectedView(viewMode: ViewMode) {
  return {
    beschreibung: viewMode === ViewModes.edit || viewMode === ViewModes.preview,
    normdata: viewMode === ViewModes.normdata,
  }
}

export const ViewModeToggleButtonGroup = memo(() => {
  const readOnly = useSelector(selectReadOnly)
  const viewMode = useSelector(selectMode)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleSelection = useCallback(
    (event: MouseEvent, value: ViewMode): void => {
      if (value) {
        event.preventDefault()
      }
      dispatch(updateApplicationBusy(true))
      setTimeout((): void => {
        dispatch(updateMode(value || ViewModes.preview))
        dispatch(updateApplicationBusy(false))
      }, 0)
    },
    [dispatch]
  )

  const isSelected = selectedView(viewMode)

  return (
    <ToggleButtonGroup
      value={viewMode}
      size="small"
      exclusive
      onChange={handleSelection}
      aria-label="Auswahl Ansichtsmodus"
    >
      <ToggleButton
        value={readOnly ? ViewModes.preview : ViewModes.edit}
        selected={isSelected.beschreibung}
        disabled={isSelected.beschreibung}
        title={t('toolbar.show_description')}
        disableTouchRipple={true}
        aria-label={t('toolbar.show_description')}
      >
        <NormalansichtIcon />
      </ToggleButton>
      <ToggleButton
        value={ViewModes.normdata}
        selected={isSelected.normdata}
        disabled={isSelected.normdata}
        title={t('toolbar.show_normdata_view')}
        disableTouchRipple={true}
        aria-label={t('toolbar.show_normdata_view')}
      >
        <DiscountOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
})
