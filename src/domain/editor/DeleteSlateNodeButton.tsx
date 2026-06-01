import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import type { FC, MouseEventHandler } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { Editor, Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { selectComponentChangedHistory } from 'src/domain/erfassung/ErfassungsState'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import {
  deleteElementSlate,
  getParentNode,
  getSiblingNodes,
} from 'src/infrastructure/slate/SlateBoundary'

import { sendValidateTEIEvent } from './HSPEditorDomainEvents'

interface Props {
  element: Element
}

const checkTerm = HSPElement.checkOrigin('term')
const checkIndex = HSPElement.checkOrigin('index')
const checkType = HSPElement.checkType(['former', 'corpus'])

function isRequired(parent: Element | undefined, element: Element): boolean {
  const { data_type = '', data_indexName = '', region = '' } = element
  const parentIndexName = parent?.data_indexName ?? ''
  if (checkTerm(element)) {
    return ErfassungsRegeln.termRegel(parentIndexName, data_type).required
  } else if (checkIndex(element)) {
    return ErfassungsRegeln.indexRegel(data_indexName).required
  } else if (checkType(element)) {
    return ErfassungsRegeln.regionRegel(region).required
  } else {
    return false
  }
}

function checkForLastChildrenInParentNode(editor: Editor, element: Element) {
  const { data_type, data_indexName } = element
  const match = checkIndex(element)
    ? HSPElement.checkIndexName(data_indexName)
    : HSPElement.checkType(data_type)
  return (
    getSiblingNodes(editor, element).filter(
      (child) => HSPElement.isElement(child) && match(child)
    ).length === 1
  )
}

export const DeleteSlateNodeButton: FC<Props> = memo(({ element }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(true)
  const { t } = useTranslation()
  const editor = useSlateStatic()
  const componentChangedHistory = useSelector(selectComponentChangedHistory)
  const dispatch = useDispatch()

  const parentNode = getParentNode(editor, element)

  const required = isRequired(parentNode, element)

  const deleteElement: MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault()
      if (deleteElementSlate(editor, element, dispatch)) {
        sendValidateTEIEvent()
      }
    },
    [dispatch, editor, element]
  )

  useEffect(() => {
    const isLastChild = checkForLastChildrenInParentNode(editor, element)
    setShowDeleteButton(!(isLastChild && required))
  }, [componentChangedHistory, editor, element, required, showDeleteButton])

  return (
    <>
      {' '}
      {showDeleteButton && (
        <IconButton
          title={t('editor.delete')}
          disableTouchRipple
          style={{ color: 'black', float: 'left' }}
          onClick={deleteElement}
          size="large"
        >
          <Delete />
        </IconButton>
      )}
    </>
  )
})
