import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { MouseEvent } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMode,
  selectReadOnly,
  updateApplicationBusy,
  updateMode,
} from 'src/domain/erfassung/ErfassungsState'
import type { ViewMode } from 'src/domain/erfassung/ViewMode'
import { ViewModes } from 'src/domain/erfassung/ViewMode'

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
        disableTouchRipple
        aria-label={t('toolbar.show_description')}
      >
        <NormalansichtIcon />
      </ToggleButton>
      <ToggleButton
        value={ViewModes.normdata}
        selected={isSelected.normdata}
        disabled={isSelected.normdata}
        title={t('toolbar.show_normdata_view')}
        disableTouchRipple
        aria-label={t('toolbar.show_normdata_view')}
      >
        <DiscountOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
})
