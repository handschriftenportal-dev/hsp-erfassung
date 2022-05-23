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

import React, { useCallback, useEffect, useMemo } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { withHistory } from 'slate-history'
import { ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor, Editor } from 'slate'
import { HSPToolbar } from '../toolbar/HSPToolbar'
import { HSPEditor } from '../editor/HSPEditor'
import { HSPSidebar } from '../sidebar/HSPSidebar'
import { createComponents } from '../../infrastructure/XMLConverter'
import { BeschreibungLesenEvent, fetchDataFromNachweis, findKODSignaturen, sendNachweisEventToDocument } from '../../infrastructure/nachweis/NachweisServiceAdapter'
import { useDispatch, useSelector } from 'react-redux'
import { disableStandalone, enableStandalone, readDocument, selectBeschreibung, selectComponentChangedHistory, selectLoadSidebar, selectReadOnly, selectSlateState, selectStandalone, selectUnsavedDocument, updateContentChanged, updateLoadSidebar, updateSidebar, updateSlate, writeDocument } from './ErfassungsState'
import { useTranslation } from 'react-i18next'
import { Beforeunload } from 'react-beforeunload'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from './Erfassung'
import { BeschreibungsKomponente } from '../sidebar/BeschreibungsKomponenteFactory'
import { diff } from 'deep-object-diff'
import { DIRECTION_BACKWARD, DIRECTION_FORWARD, dontRemoveNode, getParentNodeFromPathAboveGivinNode } from '../../infrastructure/slate/SlateBoundary'

export const containerStyles = makeStyles({
  baseGrid: {
    backgroundColor: '#f7f7f7'
  },
  sidebarGrid: {
    overflow: 'auto',
    maxHeight: '90vh'
  }
})

export const HSPErfassungContainer = React.memo((props: any) => {
  const readOnly: boolean = useSelector(selectReadOnly)
  const slateValue = useSelector(selectSlateState)
  const componentChangedHistory = useSelector(selectComponentChangedHistory)
  const standalone: boolean = useSelector(selectStandalone)
  const loadsidebar = useSelector(selectLoadSidebar)
  const dispatch = useDispatch()
  const enableHSPToolBar = JSON.parse(props.enableHSPToolBar)

  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
  const { t } = useTranslation()
  const unsavedChanges = useSelector(selectUnsavedDocument)
  const beschreibungGlobal: BeschreibungsObject = useSelector(selectBeschreibung)

  const setLoadSidebar = useCallback((load: boolean) => {
    dispatch(updateLoadSidebar(load))
  }, [])

  const styleSheet = containerStyles()

  useEffect(() => {
    console.log('Loading data from backend')
    fetchDataFromNachweis(props.url, dispatch, setLoadSidebar, loadsidebar)

    if (props.standalone === 'true') {
      dispatch(enableStandalone(standalone))
    } else {
      findKODSignaturen(props.url, dispatch)
      dispatch(disableStandalone(standalone))
    }
    if (props.readonly === 'true') {
      dispatch(readDocument(props.readonly))
    } else {
      dispatch(writeDocument(props.readonly))
    }
  }, [])

  useEffect(() => {
    const beschreibungsKomponenten: Array<BeschreibungsKomponente> = []
    createComponents(slateValue, beschreibungsKomponenten, editor, 1, 'root', '', beschreibungGlobal.subtype ? beschreibungGlobal.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE)
    dispatch(updateSidebar(beschreibungsKomponenten))
  }, [componentChangedHistory])

  async function checkIfContentHasBeenChanged(document: any) {

    const contentChanged = JSON.stringify(
      diff(slateValue, document)).includes('text') &&
        slateValue[0].data_origin === 'TEI'

    if (contentChanged) {
      dispatch(updateContentChanged(true))
    }
  }

  const updateDocument = useCallback((document: any) => {
    checkIfContentHasBeenChanged(document)
    dispatch(updateSlate(document))

  }, [slateValue])

  const { deleteBackward } = editor

  editor.deleteBackward = unit => {

    const dontDeleteOnNodeTextStart = ((editor.selection) && (editor.selection.focus) && (editor.selection.focus.offset === 0))

    if (dontDeleteOnNodeTextStart || dontRemoveNode(DIRECTION_BACKWARD, editor)) {
      return
    }
    deleteBackward(unit)
  }

  const { deleteForward } = editor

  editor.deleteForward = unit => {

    let dontDeleteOnNodeTextEnd = false

    if ((editor.selection) && (editor.selection.focus)) {
      try {
        const node: any = Editor.node(editor, editor.selection.anchor)
        const textLength = node[0].text.length
        const offset = editor.selection.focus.offset
        if (textLength === offset) {
          dontDeleteOnNodeTextEnd = true
        }
      } catch (e) {
        dontDeleteOnNodeTextEnd = false
      }
    }

    if (dontDeleteOnNodeTextEnd || dontRemoveNode(DIRECTION_FORWARD, editor)) {
      return
    }
    deleteForward(unit)
  }

  const { deleteFragment } = editor

  editor.deleteFragment = () => {

    if (editor.selection) {
      try {
        const parentNodeAnchor = getParentNodeFromPathAboveGivinNode(editor.selection.anchor.path, editor)
        const parentNodeFocus = getParentNodeFromPathAboveGivinNode(editor.selection.focus.path, editor)

        if (parentNodeAnchor.id !== parentNodeFocus.id) {
          return
        }
      } catch (error) {
        console.warn(error)
      }
    }

    deleteFragment()
  }

  editor.children = slateValue

  const beforeUnload = useCallback((event: any) => {
    if (unsavedChanges) {
      event.preventDefault()
    }
    sendNachweisEventToDocument(BeschreibungLesenEvent, {})
  }, [])

  return (
      <Beforeunload onBeforeunload={beforeUnload}>
        <Grid container className={styleSheet.baseGrid}><Grid item xs={3}>
          {!readOnly ? <h4>{t('editor.writeDescription')}</h4> : ''}
        </Grid>
          <Grid item xs={9}><HSPToolbar url={props.url} validationUrl={props.validationUrl}
                                        disabled={!enableHSPToolBar} editor={editor}
                                        workspaceUrl={props.workspaceUrl}></HSPToolbar></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} className={styleSheet.sidebarGrid}>
            <HSPSidebar editor={editor}/>
          </Grid>
          <Grid item xs={9} className={'HSPEditorClass'}>
            <Slate
                editor={editor}
                value={slateValue}
                onChange={updateDocument}>
              <HSPEditor {...props}/>
            </Slate>
          </Grid>
        </Grid>
      </Beforeunload>)
})
