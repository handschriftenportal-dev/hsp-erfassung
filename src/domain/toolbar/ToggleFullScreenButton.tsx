/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import React, { useCallback, useState } from 'react'
import { HSPRightToolbarButton } from './styles/HSPRightToolbarButton'
import { StartFullscreenIcon } from './icons/StartFullscreenIcon'
import { ExitFullscreenIcon } from './icons/ExitFullscreenIcon'
import { useTranslation } from 'react-i18next'

/**
 * Author: Christoph Marten on 23.03.2021 at 11:15
 */
export const ToggleFullScreenButton = React.memo(() => {

  const { t } = useTranslation()
  const [fullscreenActive, setFullscreenActive] = useState(false)

  const toggleFullscreen = useCallback((event: any) => {
    event.preventDefault()

    const elem = document.getElementById('hsp-erfassungseditor')

    if (elem && !document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
      })
    } else {
      document.exitFullscreen()
    }
  }, [])

  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      setFullscreenActive(true)
    } else {
      setFullscreenActive(false)
    }
  })

  return (
      <HSPRightToolbarButton id="toggleFullscreenButton"
                             title={t('toolbar.fullscreen')}
                             style={{ float: 'right' }}
                             onMouseDown={toggleFullscreen}>
        {fullscreenActive ? <ExitFullscreenIcon/> : <StartFullscreenIcon/>}

      </HSPRightToolbarButton>)
})
