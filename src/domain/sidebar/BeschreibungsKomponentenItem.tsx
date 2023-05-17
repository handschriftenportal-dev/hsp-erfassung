/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Collapse, IconButton, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { BaseEditor } from 'slate'
import { useSelector } from 'react-redux'
import { selectSidebarState } from '../erfassung/ErfassungsState'
import { RemoveBlackIcon } from '../editor/icons/RemoveBlackIcon'
import { AddBlackIcon } from '../editor/icons/AddBlackIcon'
import { PlaceholderIcon } from '../editor/icons/PlaceholderIcon'
import { findSlateNodeWithBeschreibung } from '../../infrastructure/slate/SlateBoundary'
import { findComponentPosition } from '../erfassung/ErfassungsGuidline'
import { BeschreibungsKomponente } from './BeschreibungsKomponenteFactory'
import { TEI_ELEMENT_ITEM } from '../editor/beschreibungskomponenten/BeschreibungsKomponenteAbschnitt'
import { BeschreibungsKomponenteTextLabel } from './BeschreibungsKomponenteTextLabel'
import { ContextMenuFactory } from './ContextMenuFactory'
import { createSubtitleForComponent } from '../../infrastructure/XMLConverter'

export const useStyles = makeStyles({
  copiedElement: { backgroundColor: '#efbd97' },
  activeElement: {
    backgroundColor: '#89F9EE',
  },
  normalElement: {
    backgroundColor: 'white',
  },
  itemSeperator: {
    border: '1px solid #f7f7f7',
    margin: '0px'
  }
})

interface BeschreibungsKomponentenItemProps {
  beschreibung: BeschreibungsKomponente
  setSelection: any
  change: boolean
  index: number
  editor: BaseEditor
}

export const BeschreibungsKomponentenItem = React.memo(({
  beschreibung,
  setSelection,
  change,
  index, editor
}: BeschreibungsKomponentenItemProps) => {

  const [open, setOpen] = React.useState(beschreibung.children.length > 0)
  const styleSheet = useStyles()
  const sidebar = useSelector(selectSidebarState)

  useEffect(() => {
    setOpen(beschreibung.children.length > 0)
  }, [beschreibung.children.length])

  const switchOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const isScrollTop = useCallback((beschreibung: any) => {
    // TODO Must be new implemented because of Accordion
    return false
  }, [change])

  const createCollapseIconButtons = useCallback(() => {
    return open
      ? <IconButton disableTouchRipple={true} onClick={switchOpen}><RemoveBlackIcon
            style={{
              marginRight: '5px',
              cursor: 'pointer',
              marginTop: '3px'
            }}/></IconButton>
      : <IconButton disableTouchRipple={true} onClick={switchOpen}><AddBlackIcon style={{
        marginRight: '5px',
        cursor: 'pointer',
        marginTop: '3px'
      }}/></IconButton>
  }, [open])

  const setSelectionCallback = useCallback(() => {
    setSelection(beschreibung)
  }, [beschreibung])

  return (
      <>
        {index !== 0 ? <hr className={styleSheet.itemSeperator}/> : ''}
        <ListItem disableGutters={true}
                  className={isScrollTop(beschreibung) ? styleSheet.activeElement : styleSheet.normalElement}>
          {beschreibung.children.length > 0
            ? createCollapseIconButtons()
            : <IconButton disabled={true}><PlaceholderIcon style={{
              marginRight: '5px',
            }}/></IconButton>
          }
          <ListItemText
              primary={BeschreibungsKomponenteTextLabel(beschreibung.label,
                createSubtitleForComponent(beschreibung, findSlateNodeWithBeschreibung(beschreibung, editor), findComponentPosition(sidebar, beschreibung, TEI_ELEMENT_ITEM))
              )}
              style={{ cursor: 'pointer' }}
              onClick={setSelectionCallback}>
          </ListItemText>
          <ContextMenuFactory beschreibung={beschreibung} editor={editor}/>
        </ListItem>
        {beschreibung.children.length > 0 && open
          ? (<ListItem style={{ paddingRight: '0px' }}>
              <Collapse in={open} style={{ width: '100%' }}>
                <List style={{ marginLeft: '1.5em' }}>
                  {beschreibung.children.map((beschreibung: BeschreibungsKomponente) => {
                    return (
                        <BeschreibungsKomponentenItem key={beschreibung.id} beschreibung={beschreibung}
                                                      index={0}
                                                      change={false}
                                                      editor={editor}
                                                      setSelection={setSelection}/>
                    )
                  })}
                </List>
              </Collapse>
            </ListItem>)
          : ''
        }
      </>
  )
})
