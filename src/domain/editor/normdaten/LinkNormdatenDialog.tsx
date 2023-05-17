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

import React, { MouseEvent } from 'react'
import { ReactEditor, useSlate } from 'slate-react'
import { Dialog, DialogActions, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NormdatenIconFactory } from '../icons/NormdatenIcons'
import { Editor, Location, Node } from 'slate'
import { insertSlateNodes } from '../../../infrastructure/slate/SlateBoundary'
import { ErfassungsRules } from '../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../erfassung/Erfassung'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung } from '../../erfassung/ErfassungsState'
import { NormdatenTEIElement } from './NormdatenTEIElement'
import { DNB_INFO_GND_URL, NormdatenForm } from './NormdatenForm'
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import { ActionCancelButton, ActionDetermineButton, CloseIconButtonStyled } from './styles/NormdatenStyle'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'

interface LinkNormdatenDialogProps {
  open: boolean,
  normdatenurl: string

  setOpen(open: boolean): void
}

export const LinkNormdatenDialog = React.memo((props: LinkNormdatenDialogProps) => {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const editor = useSlate() as ReactEditor
  const { t } = useTranslation()
  const normdata = ErfassungsRules[beschreibungSubtype].normdata.allowedTypes

  const modeInit = 'select'
  const titleKeyInit = 'editor.link_normdaten'
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

  const [mode, setMode] = React.useState<string>(modeInit)
  const [titleKey, setTitleKey] = React.useState<string>(titleKeyInit)
  const [normdatenTEIElement, setNormdatenTEIElement] = React.useState<NormdatenTEIElement>(normdatenTEIElementInit)
  const [autoCompleteGndEntity, setAutoCompleteGndEntity] = React.useState<GNDEntity>(autoCompleteGndEntityInit)
  const [selectedNormdatum, setSelectedNormdatum] = React.useState<string>('')
  const [nodePosition, setNodePosition] = React.useState<Location>()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (props.open) {
      setMode(modeInit)
      setTitleKey(titleKeyInit)
      setNormdatenTEIElement(normdatenTEIElementInit)
      setAutoCompleteGndEntity(autoCompleteGndEntityInit)
    }
  }, [props.open])

  const closeDialog = React.useCallback((event: MouseEvent) => {
    props.setOpen(false)
  }, [])

  const LinkNormdatenDialogTitle = React.useCallback((props: any) => {
    return <DialogTitle id="linkNormdatenDialogTitle" style={{ padding: '10px' }}>
      {props.title}
      <CloseIconButtonStyled title={t('editor.close_dialog')}
                             onClick={closeDialog}>
        <CloseIcon fontSize={'small'}/>
      </CloseIconButtonStyled>
    </DialogTitle>
  }, [])

  const NormdatenOptions = React.useCallback(() => {
    const { selection } = editor

    const selectNormdatenTyp = React.useCallback((normdatum: string) => {
      setSelectedNormdatum(normdatum)
      const selectedDefaultElement = normdata[normdatum].defaultElement

      if (selection && selection.anchor && selection.focus && selectedDefaultElement) {
        setTitleKey('editor.' + normdatum)
        setMode('edit')

        let text: string = Editor.string(editor, selection)

        const insertPosition = {
          anchor: { ...selection.anchor },
          focus: { ...selection.focus }
        }

        let textLength = text.length
        text = text.trimLeft()
        const offsetLeft = textLength - text.length
        if (offsetLeft > 0) {
          insertPosition.anchor.offset += offsetLeft
        }

        textLength = text.length
        text = text.trimRight()
        const offsetRight = textLength - text.length
        if (offsetRight > 0) {
          insertPosition.focus.offset -= offsetRight
        }
        setNodePosition(insertPosition)

        setNormdatenTEIElement({
          normdatenText: text,
          role: '',
          gndIdentifierOption: '',
          dataOrigin: selectedDefaultElement.data_origin
        } as NormdatenTEIElement)
      }

    }, [editor, selection])

    return (<List>{
      Object.keys(normdata).map((normdatum: any) => {
        return (
            <ListItem key={normdatum}
                      dense
                      button
                      onClick={() => selectNormdatenTyp(normdatum)}
                      disabled={normdata[normdatum].disabled}>
              <ListItemIcon>
                <NormdatenIconFactory type={normdatum}/>
              </ListItemIcon>
              <ListItemText primary={t('editor.' + normdatum)}/>
            </ListItem>
        )
      })
    }</List>)
  }, [editor])

  const LinkNormdatenDialogActions = React.useCallback(() => {

    const linkNormdatum = React.useCallback(() => {
      const { selection } = editor
      const selectedDefaultElement = normdata[selectedNormdatum].defaultElement

      if (selection && selection.anchor && selection.focus && selectedDefaultElement) {
        const normdatumNode = JSON.parse(JSON.stringify(selectedDefaultElement))

        let region = ''
        let path = ''
        if (selection.anchor.path.length > 2) {
          const ancestorNode = Node.get(editor, selection.anchor.path.slice(0, selection.anchor.path.length - 2)) as any

          if (ancestorNode) {
            if (ancestorNode.region) {
              region = ancestorNode.region
            }
            if (ancestorNode.path) {
              path = ancestorNode.path + '-' + normdatumNode.data_origin
            }
          }
        }

        normdatumNode.id = (Math.random() * 1000000).toString()
        normdatumNode.region = region
        normdatumNode.path = path
        if (normdatenTEIElement.role) {
          normdatumNode.data_role = normdatenTEIElement.role
        }
        if (normdatenTEIElement.gndIdentifierOption) {
          normdatumNode.data_ref = DNB_INFO_GND_URL + normdatenTEIElement.gndIdentifierOption
        }
        if (normdatumNode.children[0] && normdatumNode.children[0].children[0]) {
          normdatumNode.children[0].region = region
          normdatumNode.children[0].children[0].region = region
          normdatumNode.children[0].children[0].text = normdatenTEIElement.normdatenText
          insertSlateNodes(editor, normdatumNode as Node, nodePosition, dispatch)
        }
      }
      props.setOpen(false)
    }, [editor, selectedNormdatum, normdatenTEIElement])

    return <DialogActions style={{
      display: 'block',
      padding: '10px'
    }}>
      <ActionDetermineButton id="festlegenElementButton"
                             disableTouchRipple={true}
                             disabled={false}
                             onClick={linkNormdatum}>{t('editor.determine')}</ActionDetermineButton>
      <ActionCancelButton id="abbruchElementButton"
                          disableTouchRipple={true}
                          disabled={false}
                          onClick={closeDialog}>{t('editor.cancellation')}</ActionCancelButton>
    </DialogActions>
  }, [editor, selectedNormdatum, normdatenTEIElement])

  return (
      <Dialog id="linkNormdatenDialog"
              open={props.open}
              contentEditable={false}
              maxWidth="lg">
        <LinkNormdatenDialogTitle title={t(titleKey)}/>
        {mode === 'select'
          ? <NormdatenOptions/>
          : <>
              <NormdatenForm normdatenurl={props.normdatenurl}
                             gndEntity={autoCompleteGndEntity}
                             normdatenTEIElement={normdatenTEIElement as any}
                             setNormdatenTEIElement={setNormdatenTEIElement}
                             setGndEntity={setAutoCompleteGndEntity}/>
              <LinkNormdatenDialogActions/>
            </>
        }
      </Dialog>
  )

})
