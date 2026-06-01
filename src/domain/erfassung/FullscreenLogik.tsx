import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'

import { selectIsFullscreen, updateIsFullscreen } from './ErfassungsState'

export const FullscreenLogik: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const isFullscreen = useSelector(selectIsFullscreen)
  const dispatch = useDispatch()

  useEffect(() => {
    if (document.fullscreenElement && !isFullscreen) {
      void document.exitFullscreen()
    } else if (isFullscreen) {
      const editor = document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)
      if (editor) {
        editor.requestFullscreen().catch((error) => {
          alert(t('toolbar.fullscreen_error', error))
        })
      } else {
        console.error(`Can't find element with id ${HSP_ERFASSUNGS_EDITOR_ID}`)
      }
    }
  }, [isFullscreen, dispatch, t])

  useEffect(() => {
    const handleFullscreenChange = () => {
      dispatch(updateIsFullscreen(document.fullscreenElement !== null))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [dispatch])

  return <>{children}</>
}
