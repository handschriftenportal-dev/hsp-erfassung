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

import { AddCircleOutlined, DeleteOutline, MoreVert } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Menu, Tooltip } from '@mui/material'
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from 'slate'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { ErfassungsRules } from '../../infrastructure/slate/ErfassungsRules'
import {
  findSlateTargetPath,
  findWrapper,
  insertSlateNode,
} from '../../infrastructure/slate/SlateBoundary'
import { HSP_EDITOR_ID } from '../editor/HSPEditor'
import { sendValidateTEIEvent } from '../editor/HSPEditorDomainEvents'
import { AddChildIcon } from '../editor/icons/AddChildIcon'
import { DuplicateBlackIcon } from '../editor/icons/DuplicateBlackIcon'
import {
  allowedChildComponentOptions,
  allowedFollowerComponentOptions,
  createBeschreibungsComponents,
  firstValidPosition,
  isDeletableComponent,
} from '../erfassung/ErfassungsGuideline'
import {
  selectBeschreibungsSubtype,
  selectReadOnly,
  selectSidebarState,
  updateContentChanged,
  updateSlate,
} from '../erfassung/ErfassungsState'
import { DuplicateDialog } from './DuplicateDialog'
import { KomponenteLoeschenDialog } from './KomponenteLoeschenDialog'
import { KomponentenAuswahlDialog } from './KomponentenAuswahlDialog'
import { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  beschreibung: SidebarEintragModel
  editor: Editor
}

export const ContextMenuFactory: FC<Props> = memo(
  ({ beschreibung, editor }) => {
    const { showModal } = useGlobalModalContext()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
    const readOnly = useSelector(selectReadOnly)
    const sidebar = useSelector(selectSidebarState)
    const hspEditorContainer = document.getElementById(HSP_EDITOR_ID)
    const popupState = usePopupState({
      variant: 'popover',
      popupId: 'sidebarcontextmenu',
    })

    const childKomponentOptions = allowedChildComponentOptions(
      beschreibungSubtype,
      sidebar,
      beschreibung
    )
    const addKomponentOptions = allowedFollowerComponentOptions(
      beschreibungSubtype,
      sidebar,
      beschreibung
    )
    const isDuplicable =
      ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].duplicate

    const updateSidebarAndValidate = useCallback(
      (newEditorContent: any) => {
        dispatch(updateSlate(newEditorContent))
        popupState.close()
        sendValidateTEIEvent()
        dispatch(updateContentChanged(true))
      },
      [popupState]
    )

    const insertChildComponent = useCallback(
      (beschreibung: SidebarEintragModel, element: string) => {
        const existingWrapper = ErfassungsRules[beschreibungSubtype][element]
          .wrapperElement
          ? findWrapper(
              element,
              beschreibung,
              beschreibungSubtype,
              sidebar,
              editor,
              true
            )
          : undefined
        const komponente = createBeschreibungsComponents(
          beschreibung,
          beschreibungSubtype,
          element,
          existingWrapper !== undefined,
          true,
          sidebar
        )

        const firstValidChildPosition = firstValidPosition(
          beschreibungSubtype,
          beschreibung.children,
          element
        )
        const path = existingWrapper?.[1] || beschreibung.path
        const targetPath = [...path, firstValidChildPosition]

        insertSlateNode(
          komponente,
          targetPath,
          editor,
          dispatch,
          beschreibung.id
        )
        updateSidebarAndValidate(editor.children)
      },
      []
    )

    const insertComponent = useCallback(
      (beschreibung: SidebarEintragModel, element: string) => {
        const existingWrapper = ErfassungsRules[beschreibungSubtype][element]
          .wrapperElement
          ? findWrapper(
              element,
              beschreibung,
              beschreibungSubtype,
              sidebar,
              editor,
              false
            )
          : undefined
        const komponente = createBeschreibungsComponents(
          beschreibung,
          beschreibungSubtype,
          element,
          !!existingWrapper,
          false,
          sidebar
        )
        const targetPath = findSlateTargetPath(
          element,
          beschreibung,
          beschreibungSubtype,
          existingWrapper,
          editor,
          sidebar
        )
        insertSlateNode(
          komponente,
          targetPath,
          editor,
          dispatch,
          beschreibung.id
        )
        updateSidebarAndValidate(editor.children)
      },
      [beschreibungSubtype, dispatch, editor, sidebar, updateSidebarAndValidate]
    )

    const showDuplicateDialog = () => {
      popupState.close()
      showModal(<DuplicateDialog beschreibung={beschreibung} editor={editor} />)
    }
    const showComponentKomponentenAuswahlDialog = () => {
      popupState.close()
      showModal(
        <KomponentenAuswahlDialog
          type="component"
          beschreibung={beschreibung}
          komponentOptions={addKomponentOptions}
          insert={insertComponent}
        />
      )
    }
    const showChildKomponentenAuswahlDialog = () => {
      popupState.close()
      showModal(
        <KomponentenAuswahlDialog
          type="child"
          beschreibung={beschreibung}
          komponentOptions={childKomponentOptions}
          insert={insertChildComponent}
        />
      )
    }
    const showKomponenteLoeschenDialog = () => {
      popupState.close()
      showModal(
        <KomponenteLoeschenDialog
          editor={editor}
          beschreibung={beschreibung}
          callback={updateSidebarAndValidate}
        />
      )
    }

    return readOnly ? (
      <></>
    ) : (
      <div role="menu">
        <Tooltip title={t('sidebar.add_and_delete')} arrow>
          <IconButton
            role="openContextMenuButton"
            {...bindTrigger(popupState)}
            size="large"
            disableRipple={true}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu {...bindMenu(popupState)} container={hspEditorContainer}>
          <Tooltip title={t('sidebar.close')} arrow>
            <IconButton
              role="closeContextMenuButton"
              onClick={popupState.close}
              size="large"
            >
              <CloseIcon fontSize={'small'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('sidebar.add_component')} arrow>
            <>
              {/* Fragment necessary: disabled button cannot have tooltip */}
              <IconButton
                onClick={showComponentKomponentenAuswahlDialog}
                id="addComponentButton"
                disableTouchRipple={true}
                disabled={addKomponentOptions.length === 0}
                size="large"
              >
                <AddCircleOutlined fontSize={'small'} />
              </IconButton>
            </>
          </Tooltip>
          <Tooltip title={t('sidebar.add_child_component')} arrow>
            <>
              {/* Fragment necessary: disabled button cannot have tooltip */}
              <IconButton
                onClick={showChildKomponentenAuswahlDialog}
                id="addChildInComponentButton"
                disableTouchRipple={true}
                disabled={childKomponentOptions.length === 0}
                size="large"
              >
                <AddChildIcon />
              </IconButton>
            </>
          </Tooltip>
          {isDuplicable && (
            <Tooltip title={t('sidebar.duplicate')} arrow>
              <IconButton
                onClick={showDuplicateDialog}
                id="duplicateElementButton"
                disableTouchRipple={true}
                className={'override-duplicate-svgicon-color'}
                size="large"
              >
                <DuplicateBlackIcon />
              </IconButton>
            </Tooltip>
          )}
          {isDeletableComponent(beschreibungSubtype, beschreibung) && (
            <Tooltip title={t('sidebar.delete_component')} arrow>
              <IconButton
                onClick={showKomponenteLoeschenDialog}
                disableTouchRipple={true}
                size="large"
              >
                <DeleteOutline fontSize={'small'} />
              </IconButton>
            </Tooltip>
          )}
        </Menu>
      </div>
    )
  }
)
