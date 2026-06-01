import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import type { Editor } from 'slate'
import { HSP_EDITOR_CONTAINER_ID } from 'src/domain/editor/HSPEditor'
import { AddBlackIcon } from 'src/domain/editor/icons/AddBlackIcon'
import { LineOne } from 'src/domain/editor/icons/LineOne'
import { RemoveBlackIcon } from 'src/domain/editor/icons/RemoveBlackIcon'
import { findComponentPosition } from 'src/domain/erfassung/ErfassungsGuideline'
import {
  selectSidebarState,
  updateExpandSelectedAccordionWithNestedAccordions,
} from 'src/domain/erfassung/ErfassungsState'
import { TEI_ELEMENT_ITEM } from 'src/domain/erfassung/TEIConstants'
import { findSlateNodeAtPath } from 'src/infrastructure/slate/SlateBoundary'

import { ContextMenuFactory } from './ContextMenuFactory'
import { SidebarComponentFactory } from './SidebarComponentFactory'
import type { SidebarEintragModel } from './SidebarEintragFactory'
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
          disableGutters
          classes={{ root: 'sidebar-item-list-item-root' }}
          className={'sidebar-item-normal-element'}
        >
          {beschreibung.children.length > 0 ? (
            <IconButton
              classes={{ root: 'sidebar-item-icon-button-root' }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={switchOpen}
              size="large"
            >
              {open ? <RemoveBlackIcon /> : <AddBlackIcon />}
            </IconButton>
          ) : (
            <IconButton
              className={'sidebar-item-one-line-icon-button'}
              disabled
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
                  findSlateNodeAtPath(editor, beschreibung.path),
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
