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

import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { Editor } from 'slate'

import { findSlateNodeAtPath } from '../../infrastructure/slate/SlateBoundary'
import { HSP_EDITOR_CONTAINER_ID } from '../editor/HSPEditor'
import { AddBlackIcon } from '../editor/icons/AddBlackIcon'
import { LineOne } from '../editor/icons/LineOne'
import { RemoveBlackIcon } from '../editor/icons/RemoveBlackIcon'
import { findComponentPosition } from '../erfassung/ErfassungsGuideline'
import {
  selectSidebarState,
  updateExpandSelectedAccordionWithNestedAccordions,
} from '../erfassung/ErfassungsState'
import { TEI_ELEMENT_ITEM } from '../erfassung/TEIConstants'
import { ContextMenuFactory } from './ContextMenuFactory'
import { SidebarComponentFactory } from './SidebarComponentFactory'
import { SidebarEintragModel } from './SidebarEintragFactory'
import { SidebarEintragTextLabel } from './SidebarEintragTextLabel'

interface Props {
  beschreibung: SidebarEintragModel
  index: number
  editor: Editor
}

export const SidebarEintrag: FC<Props> = memo(
  ({ beschreibung, index, editor }) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(beschreibung.children.length > 0)
    const sidebar = useSelector(selectSidebarState)
    const dispatch = useDispatch()
    const { id } = beschreibung
    const handleClick = useCallback(() => {
      try {
        dispatch(updateExpandSelectedAccordionWithNestedAccordions(id))
        scroller.scrollTo(id, {
          containerId: HSP_EDITOR_CONTAINER_ID,
          smooth: true,
        })
      } catch (error) {
        console.error(`Can't scroll to ${id}`, { error })
      }
    }, [id, dispatch])

    useEffect(() => {
      setOpen(beschreibung.children.length > 0)
    }, [beschreibung.children.length])

    const switchOpen = useCallback(() => {
      setOpen(!open)
    }, [open])

    const foundFirstIdentification =
      beschreibung.xmlpath === '#document-TEI-text-body-msDesc-msIdentifier'
    const styleFirstElementsBold = index !== 0 || foundFirstIdentification

    return (
      <>
        {!foundFirstIdentification && (
          <Divider
            variant="fullWidth"
            component="li"
            classes={{ root: 'sidebar-item-divider-root' }}
          />
        )}
        <ListItem
          disableGutters={true}
          classes={{ root: 'sidebar-item-list-item-root' }}
          className={'sidebar-item-normal-element'}
        >
          {beschreibung.children.length > 0 ? (
            <IconButton
              classes={{ root: 'sidebar-item-icon-button-root' }}
              disableFocusRipple={true}
              disableRipple={true}
              disableTouchRipple={true}
              onClick={switchOpen}
              size="large"
            >
              {open ? <RemoveBlackIcon /> : <AddBlackIcon />}
            </IconButton>
          ) : (
            <IconButton
              className={'sidebar-item-one-line-icon-button'}
              disabled={true}
              size="large"
            >
              <LineOne />
            </IconButton>
          )}
          <ListItemText
            classes={{
              primary: styleFirstElementsBold
                ? 'sidebar-item-list-item-text'
                : '',
            }}
            primary={
              <SidebarEintragTextLabel
                name={t(beschreibung.label)}
                titel={SidebarComponentFactory.createSubtitleForComponent(
                  beschreibung,
                  findSlateNodeAtPath(beschreibung.path, editor),
                  findComponentPosition(sidebar, beschreibung, TEI_ELEMENT_ITEM)
                )}
              />
            }
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
          />
          <ContextMenuFactory beschreibung={beschreibung} editor={editor} />
        </ListItem>
        {beschreibung.children.length > 0 && open && (
          <ListItem classes={{ root: 'sidebar-item-list-item-root' }}>
            <Collapse in={open} style={{ width: '100%' }}>
              <List
                classes={{ padding: 'sidebar-item-list-padding' }}
                style={{ marginLeft: '1.5em' }}
              >
                {beschreibung.children.map((beschreibung) => (
                  <SidebarEintrag
                    key={beschreibung.id}
                    beschreibung={beschreibung}
                    index={0}
                    editor={editor}
                  />
                ))}
              </List>
            </Collapse>
          </ListItem>
        )}
      </>
    )
  }
)
