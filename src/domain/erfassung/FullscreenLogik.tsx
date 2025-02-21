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

import { FC, PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { HSP_ERFASSUNGS_EDITOR_ID } from '../editor/HSPEditor'
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
