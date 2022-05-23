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

import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataFromNachweis } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { Transforms } from 'slate'
import { AutoRenewWhiteIcon } from './icons/AutoRenewWhiteIcon'
import { HSPRightToolbarButton } from './styles/HSPRightToolbarButton'
import { ReactEditor } from 'slate-react'
import { Draft, PayloadAction } from '@reduxjs/toolkit'

interface TEIDokumentLadenButtonProps {
  title: string
  url: string
  editor: ReactEditor
  loadSidebar: boolean

  setLoadSidebar(loadSidebar: boolean): void
}

export const TEIDokumentLadenButton = React.memo(({
  title,
  url,
  editor,
  setLoadSidebar,
  loadSidebar,

}: TEIDokumentLadenButtonProps) => {

  const dispatch = useDispatch()

  const loaddata = useCallback((event: any) => {
    event.preventDefault()
    fetchDataFromNachweis(url, dispatch, setLoadSidebar, loadSidebar)
    Transforms.deselect(editor)
  }, [])

  return (
      <HSPRightToolbarButton id='ladenButton' title={title}
                             disableTouchRipple={true}
                             onMouseDown={loaddata}>
        <AutoRenewWhiteIcon/>
      </HSPRightToolbarButton>)
})
