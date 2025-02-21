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

import { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from 'slate'

import { useGlobalerEinfuegeContext } from '../../infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import {
  selectBeschreibungsSubtype,
  selectComponentChangedHistory,
  selectSidebarComponentType,
  updateSidebar,
  updateSidebarComponentType,
} from '../erfassung/ErfassungsState'
import { ScrollContainer } from '../erfassung/ScrollContainer'
import { SonderzeichenAuswahl } from '../sonderzeichen/SonderzeichenAuswahl'
import { SidebarComponentFactory } from './SidebarComponentFactory'
import { SidebarComponentType } from './SidebarComponentType'
import { StrukturAnsicht } from './StrukturAnsicht'

export interface Props {
  editor: Editor
}

export const HSPSidebar: FC<Props> = memo(({ editor }) => {
  const dispatch = useDispatch()
  const { insertCharacter } = useGlobalerEinfuegeContext()
  const sidebarComponentType = useSelector(selectSidebarComponentType)
  const componentChangedHistory = useSelector(selectComponentChangedHistory)
  const beschreibungsSubtype = useSelector(selectBeschreibungsSubtype)

  useEffect(() => {
    const beschreibungsKomponenten = SidebarComponentFactory.createComponents(
      editor,
      beschreibungsSubtype
    )
    dispatch(updateSidebar(beschreibungsKomponenten))
  }, [beschreibungsSubtype, componentChangedHistory, dispatch, editor])

  return sidebarComponentType === SidebarComponentType.struktur ? (
    <ScrollContainer>
      <StrukturAnsicht editor={editor} />
    </ScrollContainer>
  ) : (
    <SonderzeichenAuswahl
      onSubmit={insertCharacter}
      onClose={() =>
        dispatch(updateSidebarComponentType(SidebarComponentType.struktur))
      }
    />
  )
})
