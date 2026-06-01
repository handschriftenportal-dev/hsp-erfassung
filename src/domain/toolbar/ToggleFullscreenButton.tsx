import type { MouseEvent } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsFullscreen,
  updateIsFullscreen,
} from 'src/domain/erfassung/ErfassungsState'

import { ExitFullscreenIcon } from './icons/ExitFullscreenIcon'
import { StartFullscreenIcon } from './icons/StartFullscreenIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

export const ToggleFullscreenButton = memo(() => {
  const { t } = useTranslation()
  const isFullscreen = useSelector(selectIsFullscreen)
  const dispatch = useDispatch()
  const toggleFullscreen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(updateIsFullscreen(!isFullscreen))
  }

  return (
    <HSPToolbarButton
      title={t('toolbar.fullscreen')}
      onMouseDown={toggleFullscreen}
    >
      {isFullscreen ? <ExitFullscreenIcon /> : <StartFullscreenIcon />}
    </HSPToolbarButton>
  )
})
