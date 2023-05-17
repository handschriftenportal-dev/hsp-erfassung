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

import { Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core'
import { HSPRightButton } from '../styles/HSPRightButton'
import { DeleteWhiteIcon } from '../icons/DeleteWhiteIcon'
import { OpenInNew } from '@material-ui/icons'
import { BaseElement, Editor, Node, Path, Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { selectReadOnly } from '../../erfassung/ErfassungsState'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import { useTranslation } from 'react-i18next'
import '../../../index.css'
import { NormdatenTEIElement } from './NormdatenTEIElement'
import { DNB_INFO_GND_URL, NormdatenForm } from './NormdatenForm'
import { ActionCancelButton, ActionDetermineButton, CloseIconButtonStyled } from './styles/NormdatenStyle'
import CloseIcon from '@material-ui/icons/Close'
import { deleteSlate, insertSlateNodes } from '../../../infrastructure/slate/SlateBoundary'


export const NormdatenDialog = React.memo((props: any) => {

  const autoCompleteGndEntityInit = {
    preferredName: '',
    gndIdentifier: '',
    variantName: [],
    error: '',
    id: ''
  } as GNDEntity
  const normdatenTEIElementInit = {
    normdatenText: '',
    role: '',
    gndIdentifierOption: '',
    dataOrigin: ''
  } as NormdatenTEIElement

  const [normdatenTEIElement, setNormdatenTEIElement] = React.useState(normdatenTEIElementInit)
  const [autoCompleteGndEntity, setAutoCompleteGndEntity] = React.useState<GNDEntity>(autoCompleteGndEntityInit)

  const { t } = useTranslation()
  const editor = useSlateStatic()
  const readOnly = useSelector(selectReadOnly)
  const dispatch = useDispatch()

  function initAutoCompleteGndEntityfromSlateValue(element: any, normDatenElementTextPath: Path, normDatenWrapperElementPath: Path, normDatenWrapperNode: any, normDatenTextNode: any, forceValuesFromTEI: boolean) {
    const autoCompleteGndEntityShallowCopy = { ...autoCompleteGndEntity }
    // Da er hier den Namen aus dem TextElement holt was ja bei Normdatentext auch verwendet wird, soll er das nur beim Erstenmal, wenn es leer ist setzten
    if ((forceValuesFromTEI || autoCompleteGndEntity.preferredName === '' || autoCompleteGndEntity.preferredName === undefined) && normDatenTextNode && normDatenTextNode.text) {
      autoCompleteGndEntityShallowCopy.preferredName = normDatenTextNode.text.replace(/\s\s+/g, ' ')
    }
    if (normDatenWrapperNode && normDatenWrapperNode.data_ref) {
      autoCompleteGndEntityShallowCopy.gndIdentifier = normDatenWrapperNode.data_ref.substr(21).trim()
    }
    return autoCompleteGndEntityShallowCopy
  }

  function initNormdatenTEIElementfromSlateValue(element: any, normDatenElementTextPath: Path, normDatenWrapperElementPath: Path, normDatenWrapperNode: any, normDatenTextNode: any) {
    const normdatenTEIElementShallowCopy = { ...normdatenTEIElementInit }
    if (normDatenWrapperNode && normDatenWrapperNode.data_role) {
      normdatenTEIElementShallowCopy.role = normDatenWrapperNode.data_role.trim()
    }
    if (normDatenWrapperNode && normDatenWrapperNode.data_ref) {
      normdatenTEIElementShallowCopy.gndIdentifierOption = normDatenWrapperNode.data_ref.substr(21).trim()
    }
    if (normDatenTextNode && normDatenTextNode.text) {
      normdatenTEIElementShallowCopy.normdatenText = normDatenTextNode.text.replace(/\s\s+/g, ' ')
    }
    if (element && element.data_origin) {
      normdatenTEIElementShallowCopy.dataOrigin = element.data_origin
    }

    return normdatenTEIElementShallowCopy
  }

  function initNormdatenDialogFromTEI(element: any, forceValuesFromTEI: boolean) {
    if ((element) && (element.children) && (element.children[0].children)) {
      const normDatenElementTextPath: Path = ReactEditor.findPath(editor as ReactEditor, element.children[0].children[0])
      const normDatenWrapperElementPath: Path = ReactEditor.findPath(editor as ReactEditor, element)
      const normDatenWrapperNode: any = Editor.node(editor, normDatenWrapperElementPath)[0]
      const normDatenTextNode: any = Editor.node(editor, normDatenElementTextPath)[0]
      setNormdatenTEIElement(initNormdatenTEIElementfromSlateValue(props.element, normDatenElementTextPath, normDatenWrapperElementPath, normDatenWrapperNode, normDatenTextNode))
      setAutoCompleteGndEntity(initAutoCompleteGndEntityfromSlateValue(props.element, normDatenElementTextPath, normDatenWrapperElementPath, normDatenWrapperNode, normDatenTextNode, forceValuesFromTEI))
    }
  }

  useEffect(() => {
    if (props.open) {
      initNormdatenDialogFromTEI(props.element, false)
    }
  }, [props.open])

  function deleteSlateDataOrigin(element: any) {
    const normdatenElementPath: Path = ReactEditor.findPath(editor as ReactEditor, element)
    const normdatenElementChildrenNode = element.children[0]

    if (normdatenElementChildrenNode.children[0] && normdatenElementChildrenNode.children[0].text) {

      deleteSlate(editor, normdatenElementPath, element.id, element.data_origin, dispatch)

      const newChild = {
        region: normdatenElementChildrenNode.children[0].region,
        text: ' ' + normdatenElementChildrenNode.children[0].text + ' '
      }

      insertSlateNodes(editor, {
        data_origin: normdatenElementChildrenNode.data_origin,
        region: normdatenElementChildrenNode.region,
        children: [newChild]
      } as Node, normdatenElementPath, dispatch)
    }
  }

  function fillSlateContentWithChangedContent(element: any) {

    const normDatenWrapperElementPath: Path = ReactEditor.findPath(editor as ReactEditor, element)
    const normDatenElementTextPath: Path = ReactEditor.findPath(editor as ReactEditor, element.children[0].children[0])

    Transforms.setNodes(editor, { data_role: normdatenTEIElement.role } as Partial<BaseElement>, { at: normDatenWrapperElementPath })
    if (normdatenTEIElement.gndIdentifierOption) {
      Transforms.setNodes(editor, { data_ref: DNB_INFO_GND_URL + normdatenTEIElement.gndIdentifierOption } as Partial<BaseElement>, { at: normDatenWrapperElementPath })
    } else {
      Transforms.setNodes(editor, { data_ref: '' } as Partial<BaseElement>, { at: normDatenWrapperElementPath })
    }
    Transforms.insertText(editor, normdatenTEIElement.normdatenText, { at: normDatenElementTextPath })
  }

  function dialogTitle() {
    return <DialogTitle style={{
      padding: '10px',
      minWidth: '65vw'
    }}
                        id="normdatenDialog-edit-mode">{props.title}
      <CloseIconButtonStyled title={t('editor.close_dialog')}
                             onClick={() => {
                               props.setOpen(!props.open)
                             }}>
        <CloseIcon fontSize={'small'}/>
      </CloseIconButtonStyled>
    </DialogTitle>
  }

  function showNormdatenDialogInEditMode() {

    function dialogActionsInEditMode() {
      return <DialogActions style={{
        display: 'block',
        padding: '10px'
      }}>
        <ActionDetermineButton id="festlegenElementButton"
                               disableTouchRipple={true}
                               disabled={false}
                               onClick={() => {
                                 fillSlateContentWithChangedContent(props.element)
                                 props.setOpen(!props.open)
                               }}>{t('editor.determine')}</ActionDetermineButton>
        <ActionCancelButton id="abbruchElementButton"
                            disableTouchRipple={true}
                            disabled={false}
                            onClick={() => {
                              props.setOpen(!props.open)
                              initNormdatenDialogFromTEI(props.element, true)
                            }}>{t('editor.cancellation')}</ActionCancelButton>
        <HSPRightButton id="deleteElementButton"
                        title="deleteElementButton"
                        disableTouchRipple={true}
                        disabled={false}
                        onClick={() => {
                          deleteSlateDataOrigin(props.element)
                          props.setOpen(!props.open)
                        }}
                        style={{
                          float: 'right',
                          backgroundColor: 'white'
                        }}>
          <DeleteWhiteIcon/>
        </HSPRightButton>
      </DialogActions>
    }

    return <Dialog maxWidth="lg" id="normdaten-dialog-in-edit-mode" aria-labelledby="normdatenDialog-edit-mode"
                   open={props.open}>
      {dialogTitle()}
      <NormdatenForm normdatenurl={props.normdatenurl}
                     gndEntity={autoCompleteGndEntity}
                     normdatenTEIElement={normdatenTEIElement as any}
                     setNormdatenTEIElement={setNormdatenTEIElement}
                     setGndEntity={setAutoCompleteGndEntity}/>
      {dialogActionsInEditMode()}
    </Dialog>
  }

  function showNormdatenDialogInReadOnlyMode() {

    function textInReadOnly() {

      return <TextField style={{
        margin: 20,
        width: '65vw'
      }} label={t('normdatenDialog.normdaten_text')} defaultValue={normdatenTEIElement.normdatenText}
                        inputProps={
                          { readOnly: true, }
                        }/>
    }

    function verknuepfungInReadOnlyMode() {

      return <TextField style={{
        margin: 20,
        width: '65vw'
      }} id="standard-basic" label={t('normdatenDialog.normdaten_verknüfpung')}
                        defaultValue={normdatenTEIElement.normdatenText} InputProps={{
                          readOnly: true,
                          endAdornment: (
          <InputAdornment position="end">
              <span><a target="_blank"
                       href={DNB_INFO_GND_URL + normdatenTEIElement.gndIdentifierOption}>{normdatenTEIElement.gndIdentifierOption}</a></span>
          </InputAdornment>
                          ),
                        }}/>
    }

    function roleInReadOnly() {
      return <TextField id="Beziehung"
                        style={{
                          margin: 20,
                          width: '65vw'
                        }}
                        label={t('normdatenDialog.rolle')}
                        defaultValue={normdatenTEIElement.role ? t('normdatenRole.' + normdatenTEIElement.role) : ''}
                        inputProps={{ readOnly: true }}/>
    }

    return <>
      <Dialog maxWidth="lg" aria-labelledby="normdatenDialog-readonly" open={props.open}>
        {dialogTitle()}
        {textInReadOnly()}
        {verknuepfungInReadOnlyMode()}
        {roleInReadOnly()}

        <DialogActions style={{ padding: '10px' }}>
          <HSPRightButton id="openElementButton"
                          disableTouchRipple={true}
                          disabled={false}
                          style={{
                            float: 'right',
                            backgroundColor: 'white'
                          }}>
            <OpenInNew/>
          </HSPRightButton>
        </DialogActions>
      </Dialog>)
    </>
  }

  return (<>{readOnly
    ? <React.Fragment>
      {showNormdatenDialogInReadOnlyMode()}
    </React.Fragment>
    : <React.Fragment>
      {showNormdatenDialogInEditMode()}
    </React.Fragment>}
  </>)
})
