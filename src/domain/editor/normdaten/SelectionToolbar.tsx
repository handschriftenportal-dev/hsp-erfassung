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

import { AddOutlined } from '@material-ui/icons'
import React, { useCallback, useEffect, useRef } from 'react'
import { ReactEditor, useSlate } from 'slate-react'
import { Editor, Node, Path, Range } from 'slate'
import { LinkNormdatenDialog } from './LinkNormdatenDialog'
import { useSelector } from 'react-redux'
import { selectBeschreibung, selectPositionChanged } from '../../erfassung/ErfassungsState'
import { deselect } from '../../../infrastructure/slate/SlateBoundary'
import i18next from 'i18next'
import { HSPHoveringToolbar } from './HSPHoveringToolbar'
import { PlusButton } from './styles/SelectionToolbarStyle'
import { ErfassungsRules } from '../../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../erfassung/Erfassung'

interface SelectionToolbarProps {
  normdatenurl: string
}

export const SelectionToolbar = React.memo((props: SelectionToolbarProps) => {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const editor = useSlate() as ReactEditor
  const { selection } = editor
  const domSelection = window.getSelection()
  const positionChanged = useSelector(selectPositionChanged)
  const ref = useRef<HTMLDivElement>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const hideToolbar = useCallback(() => {
    const toolbar = ref.current
    if (toolbar) {
      toolbar.style.opacity = '0'
      toolbar.style.top = '-10000px'
      toolbar.style.left = '-10000px'
    }
  }, [])

  const showToolbar = useCallback(() => {
    const toolbar = ref.current
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()
      if (toolbar) {
        toolbar.style.opacity = '1'
        toolbar.style.top = `${rect.top + window.pageYOffset - toolbar.offsetHeight - 10}px`
        toolbar.style.left = `${rect.left + window.pageXOffset - toolbar.offsetWidth / 2 + rect.width / 2}px`
      }
    }
  }, [domSelection])

  const showDialog = useCallback(() => {
    hideToolbar()
    setDialogOpen(true)
  }, [])

  const isNormdataAllowed = useCallback(() => {
    if (selection &&
        !Range.isCollapsed(selection) &&
        selection.anchor &&
        selection.focus &&
        // anchor und focus müssen im selben parentNode liegen:
        selection.anchor.path.length > 2 &&
        selection.focus.path.length > 2 &&
        Path.equals(selection.anchor.path.slice(0, selection.anchor.path.length - 2),
          selection.focus.path.slice(0, selection.focus.path.length - 2))) {

      const parentNode = Node.get(editor, selection.anchor.path.slice(0, selection.anchor.path.length - 2)) as any

      // parentNode darf Normdaten-Auszeichnung enthalten:
      if (parentNode &&
          parentNode.data_origin &&
          ErfassungsRules[beschreibungSubtype].normdata.allowedIn.includes(parentNode.data_origin)) {

        // alle ausgewählten children müssen allowedFollower sein
        const focusChild = selection.focus.path[selection.focus.path.length - 2]
        const anchorChild = selection.anchor.path[selection.anchor.path.length - 2]
        const forward = Range.isForward(selection)
        const firstChild = forward ? anchorChild : focusChild
        const lastChild = forward ? focusChild : anchorChild

        let allowed = lastChild >= firstChild
        parentNode.children.slice(firstChild, lastChild + 1).forEach((child: any) => {
          allowed = allowed &&
              child.data_origin &&
              ErfassungsRules[beschreibungSubtype].normdata.allowedFollower.includes(child.data_origin)
        })
        return allowed
      }
    }
    return false
  }, [editor, selection])

  useEffect(() => {
    try {
      if (selection &&
          ReactEditor.isFocused(editor) &&
          domSelection &&
          Editor.string(editor, selection).trim() !== '' &&
          isNormdataAllowed()) {
        showToolbar()
      } else {
        hideToolbar()
      }
    } catch (e) {
      console.log('error updating selection-toolbar ' + e)
    }
  }, [selection])

  useEffect(() => {
    hideToolbar()
    deselect(editor)
  }, [positionChanged])

  return (
      <>
        <HSPHoveringToolbar id={'SelectionToolbar'}
                            ref={ref}>
          <PlusButton title={i18next.t('editor.link_normdaten')}
                      size={'small'}
                      role={'SelectionToolbarButton'}
                      onClick={showDialog}>
            <AddOutlined/>
          </PlusButton>
        </HSPHoveringToolbar>
        <LinkNormdatenDialog open={dialogOpen}
                             setOpen={setDialogOpen}
                             normdatenurl={props.normdatenurl}/>
      </>
  )
})
