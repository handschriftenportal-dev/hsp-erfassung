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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  Tooltip
} from '@material-ui/core'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import i18next from 'i18next'
import { AddCircleOutlined, DeleteOutline } from '@material-ui/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeschreibungsKomponente } from './BeschreibungsKomponenteFactory'
import {
  selectBeschreibung,
  selectReadOnly,
  selectSidebarState,
  updateContentChanged,
  updateLoadSidebar,
  updateSlate
} from '../erfassung/ErfassungsState'
import {
  BeschreibungsKomponenteOption,
  createBeschreibungsComponents,
  findAllowedComponentsForComponent,
  findComponentById,
  findExistingComponents,
  findFollowingComponentById
} from '../erfassung/ErfassungsGuidline'
import { ErfassungsRules } from '../erfassung/ErfassungRules'
import { AddChildIcon } from '../editor/icons/AddChildIcon'
import { KomponentenAuswahlDialog } from './KomponentenAuswahlDialog'
import { sendValidateTEIEvent } from '../editor/HSPEditorDomainEvents'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../erfassung/Erfassung'
import {
  createTargetPath,
  deleteSlateNodeWithWrapper,
  findSlateTargetPath,
  findWrapper,
  insertSlateNode
} from '../../infrastructure/slate/SlateBoundary'
import { HSP_EDITOR_ID } from '../editor/HSPEditor'
import { SettingsBlackIcon } from '../editor/icons/SettingsBlackIcon'
import CloseIcon from '@material-ui/icons/Close'
import { DuplicateBlackIcon } from '../editor/icons/DuplicateBlackIcon'
import { DuplicateDialog } from './DuplicateDialog'
import { BaseEditor } from 'slate'

interface ContextMenuFactoryProps {
  beschreibung: BeschreibungsKomponente
  editor: BaseEditor
}

export const ContextMenuFactory = React.memo(({ beschreibung, editor }: ContextMenuFactoryProps) => {

  const readOnly = useSelector(selectReadOnly)
  const sidebar = useSelector(selectSidebarState)
  const hspEditorContainer = document.getElementById(HSP_EDITOR_ID)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'sidebarcontextmenu'
  })
  const dispatch = useDispatch()
  const [openDeleteElementDialog, setDeleteElementOpenDialog] = useState(false)
  const [openDuplicationDialog, setOpenDuplicationDialog] = useState(false)

  const [openAddChildKomponentDialog, setOpenAddChildKomponentDialog] = useState(false)
  const [childKomponentOptions, setChildKomponentOptions] = useState<Array<BeschreibungsKomponenteOption>>([])
  const [selectedChildKomponent, setSelectedChildKomponent] = useState('')

  const [openAddKomponentDialog, setOpenAddKomponentDialog] = useState(false)
  const [addKomponentOptions, setAddKomponentOptions] = useState<Array<BeschreibungsKomponenteOption>>([])
  const [selectedKomponent, setSelectedKomponent] = useState('')
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const duplicate = ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].duplicate

  useEffect(() => {
    const sameBehind = beschreibung.teiElement === findFollowingComponentById(sidebar, beschreibung)?.teiElement
    setChildKomponentOptions(findAllowedComponentsForComponent(beschreibungSubtype, beschreibung, findExistingComponents(sidebar, beschreibung, []), true, findComponentById(sidebar, beschreibung.parent)))
    setAddKomponentOptions(findAllowedComponentsForComponent(beschreibungSubtype, beschreibung, findExistingComponents(sidebar, beschreibung, []), false, findComponentById(sidebar, beschreibung.parent), sameBehind))
  }, [popupState])

  const updateSidebarAndValidate = useCallback((newEditorContent: any) => {
    dispatch(updateSlate(newEditorContent))
    dispatch(updateLoadSidebar(true))
    popupState.close()
    sendValidateTEIEvent()
    dispatch(updateContentChanged(true))
  }, [])

  const insertChildComponent = useCallback((beschreibung: BeschreibungsKomponente, popupState: any, element: string) => {
    const foundAlreadyExistingWrapper = ErfassungsRules[beschreibungSubtype][element].wrapperElement ? findWrapper(element, beschreibung, beschreibungSubtype, sidebar, editor, true) : undefined
    const {
      component,
      children
    }: Record<string, any> | undefined = createBeschreibungsComponents(beschreibung, beschreibungSubtype, element, foundAlreadyExistingWrapper, true, sidebar)

    let targetPath

    if (foundAlreadyExistingWrapper) {
      targetPath = [...foundAlreadyExistingWrapper[1], 0]
    } else {
      targetPath = createTargetPath(editor, beschreibung)
    }

    insertSlateNode(component, children, targetPath, editor, updateSidebarAndValidate, dispatch, beschreibung.id)

  }, [])

  const insertComponent = useCallback((beschreibung: BeschreibungsKomponente, popupState: any, element: string) => {
    const foundAlreadyExistingWrapper = ErfassungsRules[beschreibungSubtype][element].wrapperElement ? findWrapper(element, beschreibung, beschreibungSubtype, sidebar, editor, false) : undefined

    console.log('Found Wrapper ' + element)

    const {
      component,
      children,
    }: Record<string, any> | undefined = createBeschreibungsComponents(beschreibung, beschreibungSubtype, element, foundAlreadyExistingWrapper, false, sidebar)

    const targetPath = findSlateTargetPath(element, beschreibung, beschreibungSubtype, foundAlreadyExistingWrapper, editor, sidebar)

    insertSlateNode(component, children, targetPath, editor, updateSidebarAndValidate, dispatch, beschreibung.id)

    popupState.close()
  }, [popupState])

  const handleCloseContext = useCallback(() => {
    return popupState.close
  }, [])

  const openDeleteElementDialogCallBack = useCallback((event: any) => {
    event.preventDefault()
    setDeleteElementOpenDialog(true)
  }, [])

  const openDuplicateElementDialog = useCallback((event: any) => {
    event.preventDefault()
    setOpenDuplicationDialog(true)
  }, [])

  const openAddChildInComponentDialog = useCallback((event: any) => {
    event.preventDefault()
    setOpenAddChildKomponentDialog(true)

  }, [])

  const openAddComponentDialog = useCallback((event: any) => {
    event.preventDefault()
    setOpenAddKomponentDialog(true)
  }, [])

  const closeDeleteElementDialog = useCallback(() => {
    setDeleteElementOpenDialog(false)
    popupState.close()
  }, [])

  const handleDeleteElementAction = useCallback((event: any) => {
    event.preventDefault()
    const wrapper: string = ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].wrapperElement ? ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].wrapperElement.data_origin : ''
    deleteSlateNodeWithWrapper(wrapper, beschreibung, editor, updateSidebarAndValidate, true, dispatch, beschreibung.id)
    setDeleteElementOpenDialog(false)
  }, [beschreibung])

  const isMsIdentifier = beschreibung.teiElement === 'msIdentifier'

  return (<>{
    !readOnly
      ? <div role="contextmenu" contentEditable={false}>
          <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.edit')}</span>} arrow>
            <IconButton role="openContextMenuButton" id="openContextMenuButton" {...bindTrigger(popupState)}>
              <SettingsBlackIcon></SettingsBlackIcon>
            </IconButton>
          </Tooltip>
          <Menu contentEditable={false} {...bindMenu(popupState)}
                container={hspEditorContainer}>
            <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.close')}</span>} arrow>
              <IconButton role="closeContextMenuButton" onClick={handleCloseContext()}>
                <CloseIcon fontSize={'small'}></CloseIcon>
              </IconButton>
            </Tooltip>
            {!isMsIdentifier &&
              <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.element_delete')}</span>} arrow>
                <IconButton id="deleteElementButton"
                            disableTouchRipple={true}
                            contentEditable={false}
                            style={{ float: 'right' }}
                            onMouseDown={openDeleteElementDialogCallBack}>
                  <DeleteOutline fontSize={'small'}/>
                </IconButton>
              </Tooltip>}
            {duplicate &&
              <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.duplicate')}</span>} arrow>
                <IconButton id="duplicateElementButton"
                            disableTouchRipple={true}
                            contentEditable={false}
                            className={'override-duplicate-svgicon-color'}
                            style={{ float: 'right' }}
                            onMouseDown={openDuplicateElementDialog}>
                  <DuplicateBlackIcon/>
                </IconButton>
              </Tooltip>
            }
            <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.child_add')}</span>} arrow>
              <span>
              <IconButton id="addChildInComponentButton"
                          disableTouchRipple={true}
                          contentEditable={false}
                          disabled={childKomponentOptions.length === 0}
                          style={{ float: 'right' }}
                          onMouseDown={openAddChildInComponentDialog}>
                <AddChildIcon/>
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={<span style={{ fontSize: 'medium' }}>{i18next.t('sidebar.element_add')}</span>} arrow>
              <span>
              <IconButton id="addComponentButton"
                          disableTouchRipple={true}
                          contentEditable={false}
                          style={{ float: 'right' }}
                          disabled={addKomponentOptions.length === 0}
                          onMouseDown={openAddComponentDialog}>
                <AddCircleOutlined fontSize={'small'}/>
              </IconButton>
                </span>
            </Tooltip>
          </Menu>
          <KomponentenAuswahlDialog open={openAddChildKomponentDialog} title={i18next.t('sidebar.addnewchildcomponent')}
                                    setOpen={setOpenAddChildKomponentDialog} popupState={popupState}
                                    value={selectedChildKomponent} beschreibung={beschreibung}
                                    komponentOptions={childKomponentOptions} insert={insertChildComponent}
                                    setKomponent={setSelectedChildKomponent} type={'child'}/>
          <KomponentenAuswahlDialog open={openAddKomponentDialog} title={i18next.t('sidebar.addnewcomponent')}
                                    setOpen={setOpenAddKomponentDialog} popupState={popupState} value={selectedKomponent}
                                    beschreibung={beschreibung} komponentOptions={addKomponentOptions}
                                    insert={insertComponent} setKomponent={setSelectedKomponent} type={'component'}/>
          <Dialog container={document.getElementById(HSP_EDITOR_ID)} aria-labelledby="simple-dialog-title"
                  contentEditable={false}
                  open={openDeleteElementDialog}>
            <DialogTitle
                id="simple-dialog-title">{i18next.t('sidebar.delete')}
            </DialogTitle>
            <DialogContentText
                style={{ padding: '20px' }}>{beschreibung.label + ' mit Anzahl Unterelementen ' + beschreibung.children.length}</DialogContentText>
            <DialogActions>
              <Button onClick={closeDeleteElementDialog} color="primary">
                {i18next.t('sidebar.cancel')}
              </Button>
              <Button autoFocus onClick={handleDeleteElementAction} color="primary">
                {i18next.t('sidebar.delete')}
              </Button>
            </DialogActions>
          </Dialog>
          {duplicate &&
            <DuplicateDialog popupState={popupState} beschreibung={beschreibung} setOpen={setOpenDuplicationDialog}
                             open={openDuplicationDialog} editor={editor}/>
          }
        </div>
      : ''
  }</>)
})

