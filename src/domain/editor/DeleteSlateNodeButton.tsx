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

import { useSlateStatic } from 'slate-react'
import { Delete } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import i18next from 'i18next'
import { deleteElementSlate, getChildrenFromParentNodeSlate, getParentNodeSlate } from '../../infrastructure/slate/SlateBoundary'
import { ErfassungsRules } from '../erfassung/ErfassungRules'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../erfassung/Erfassung'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung, selectComponentChangedHistory } from '../erfassung/ErfassungsState'
import { useGetRuleForTerm } from './beschreibungskomponenten/kopf/HeadCustomHooks'
import { sendValidateTEIEvent } from './HSPEditorDomainEvents'

interface DeleteSlateNodeButtonProps {
  node: any
}

const TERM = 'term'
const INDEX = 'index'
const FORMER = 'former'
const CORPUS = 'corpus'

export const DeleteSlateNodeButton = React.memo(({ node }: DeleteSlateNodeButtonProps) => {

  const [showDeleteButton, setShowDeleteButton] = React.useState(true)

  const editor = useSlateStatic()
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  let isLastChildrenInParentNode = false
  const componentChangedHistory = useSelector(selectComponentChangedHistory)
  const dispatch = useDispatch()

  const checkForRequireRule = () => {
    let requiredRule
    try {
      if (node.data_origin === TERM) {
        const parentNode :any = getParentNodeSlate(editor, node)
        requiredRule = useGetRuleForTerm('required', parentNode.data_indexName, node.data_type)()
      }
      else if (node.data_origin === INDEX) {
        requiredRule = ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + node.data_indexName].required
      }
      else if (node.data_type === FORMER || node.data_type === CORPUS) {
        requiredRule = ErfassungsRules[beschreibungSubtype].erfassungsElemente[node.region].required
      }
    } catch (e) {
      requiredRule = false
    }
    return requiredRule
  }

  const required = checkForRequireRule()

  const deleteElement = useCallback((event: any) => {
    event.preventDefault()
    if (deleteElementSlate(node, editor, dispatch)) {
      sendValidateTEIEvent()
    }
  }, [editor, node])

  function checkForLastChildrenInParentNode () {
    if (node.data_origin === INDEX) {
      isLastChildrenInParentNode = getChildrenFromParentNodeSlate(editor, node).filter((childNode:any) => childNode.data_indexName === node.data_indexName).length === 1
    }
    else {
      isLastChildrenInParentNode = getChildrenFromParentNodeSlate(editor, node).filter((childNode:any) => childNode.data_type === node.data_type).length === 1
    }
  }

  useEffect(() => {
    checkForLastChildrenInParentNode()
    const newShowDeleteButtonValue = !(isLastChildrenInParentNode && required)
    if (showDeleteButton !== newShowDeleteButtonValue) {
      setShowDeleteButton(newShowDeleteButtonValue)
    }
  }, [componentChangedHistory])

  return <> {showDeleteButton && <IconButton id="deleteSlateNodeButton"
                          title={i18next.t('editor.delete')}
                          disableTouchRipple={true}
                          style={{ color: 'black' }}
                          onMouseDown={deleteElement}>
        <Delete/>
      </IconButton>}
    {!showDeleteButton && null}
  </>
}
)
