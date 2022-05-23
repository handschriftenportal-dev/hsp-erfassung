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
import { List, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPositionChanged,
  selectSidebarState,
  updateExpandSelectedAccordionWithNestedAccordions
} from '../erfassung/ErfassungsState'
import { BeschreibungsKomponentenItem } from './BeschreibungsKomponentenItem'
import { useTranslation } from 'react-i18next'
import { BeschreibungsKomponente } from './BeschreibungsKomponenteFactory'
import { Scrollbars } from 'react-custom-scrollbars'
import { HSP_EDITOR_ID } from '../editor/HSPEditor'
import { BaseEditor } from 'slate'

export interface HSPSidebarProps {
  editor: BaseEditor
}

export const SIDEBAR_TEXT_LENGTH = 25

export const HSPSidebar = React.memo(({ editor }: HSPSidebarProps) => {

  const positionChanged = useSelector(selectPositionChanged)
  const sidebarValue = useSelector(selectSidebarState)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const setSelection = useCallback((beschreibung: BeschreibungsKomponente) => {

    try {
      const htmlElement = document.getElementById(beschreibung.id)
      const hspeditor = document.getElementById(HSP_EDITOR_ID)
      const hspsidebar = document.getElementById('hspsidebar')

      if (hspeditor && hspsidebar && htmlElement) {
        hspeditor.scrollTop = (htmlElement.offsetTop - 100)
      }
      dispatch(updateExpandSelectedAccordionWithNestedAccordions(beschreibung.id))

    } catch (error) {
      console.log('Cant set selection', error)
    }
  }, [])

  const useStyles = makeStyles({
    sidebar: {
      padding: '5px',
      backgroundColor: 'white',
      marginRight: '2em'
    }
  })

  return (
      <Scrollbars autoHide>
        <List id={'hspsidebar'} className={useStyles().sidebar}>
          {sidebarValue.length > 0
            ? sidebarValue.map((beschreibung: BeschreibungsKomponente, index: number) => {
              return (
                    <BeschreibungsKomponentenItem key={beschreibung.id} index={index} beschreibung={beschreibung}
                                                  change={positionChanged}
                                                  editor={editor}
                                                  setSelection={setSelection}></BeschreibungsKomponentenItem>
              )
            })
            : t('sidebar.componentsnotfound')}
        </List>
      </Scrollbars>
  )
})
