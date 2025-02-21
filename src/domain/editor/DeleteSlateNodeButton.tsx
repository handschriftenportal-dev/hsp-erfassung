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

import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../infrastructure/slate/ErfassungsRules'
import {
  deleteElementSlate,
  getChildrenFromParentNodeSlate,
  getParentNodeSlate,
} from '../../infrastructure/slate/SlateBoundary'
import {
  selectBeschreibungsSubtype,
  selectComponentChangedHistory,
} from '../erfassung/ErfassungsState'
import { useGetRuleForTerm } from './beschreibungskomponenten/kopf/HeadCustomHooks'
import { sendValidateTEIEvent } from './HSPEditorDomainEvents'

interface Props {
  element: Element
}

const TERM = 'term'
const INDEX = 'index'
const FORMER = 'former'
const CORPUS = 'corpus'

export const DeleteSlateNodeButton: FC<Props> = memo(({ element }) => {
  const { data_origin, data_type, data_indexName, region } = element as any
  const [showDeleteButton, setShowDeleteButton] = useState(true)
  const { t } = useTranslation()

  const editor = useSlateStatic()
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  let isLastChildrenInParentNode = false
  const componentChangedHistory = useSelector(selectComponentChangedHistory)
  const dispatch = useDispatch()
  const parentNode = getParentNodeSlate(editor, element)
  const termRule = useGetRuleForTerm(
    'required',
    (parentNode as any)?.data_indexName || '',
    data_type
  )

  const required =
    data_origin === TERM
      ? termRule
      : data_origin === INDEX
        ? ErfassungsRules[beschreibungSubtype].erfassungsElemente?.[
            'index' + data_indexName
          ]?.required || false
        : data_type === FORMER || data_type === CORPUS
          ? ErfassungsRules[beschreibungSubtype].erfassungsElemente?.[region]
              ?.required || false
          : false

  const deleteElement = useCallback(
    (event: any) => {
      event.preventDefault()
      if (deleteElementSlate(element, editor, dispatch)) {
        sendValidateTEIEvent()
      }
    },
    [editor, element]
  )

  function checkForLastChildrenInParentNode() {
    if (data_origin === INDEX) {
      isLastChildrenInParentNode =
        getChildrenFromParentNodeSlate(editor, element).filter(
          (childNode: any) => childNode.data_indexName === data_indexName
        ).length === 1
    } else {
      isLastChildrenInParentNode =
        getChildrenFromParentNodeSlate(editor, element).filter(
          (childNode: any) => childNode.data_type === data_type
        ).length === 1
    }
  }

  useEffect(() => {
    checkForLastChildrenInParentNode()
    const newShowDeleteButtonValue = !(isLastChildrenInParentNode && required)
    if (showDeleteButton !== newShowDeleteButtonValue) {
      setShowDeleteButton(newShowDeleteButtonValue)
    }
  }, [componentChangedHistory])

  return (
    <>
      {' '}
      {showDeleteButton && (
        <IconButton
          title={t('editor.delete')}
          disableTouchRipple={true}
          style={{ color: 'black', float: 'left' }}
          onMouseDown={deleteElement}
          size="large"
        >
          <Delete />
        </IconButton>
      )}
    </>
  )
})
