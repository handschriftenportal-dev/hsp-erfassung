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

import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { cloneDeep } from 'lodash'
import { FC, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Path } from 'slate'
import { useSlateStatic } from 'slate-react'
import { v4 as uuid } from 'uuid'

import { ErfassungsRuleDefaultChildrenOneElementFactory } from '../../../../infrastructure/slate/ErfassungsRules'
import {
  findPath,
  insertSlateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../erfassung/ErfassungsState'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from '../../../erfassung/TEIConstants'

interface Props {
  msIdentifierChildren: any
  dataTypeToAdd: string
  dataOrigin: string
  buttonLabel: string
  isAltIdentifier: boolean
  path: string
}

export const AddElementButtonForIdentification: FC<Props> = memo(
  ({
    msIdentifierChildren,
    dataTypeToAdd,
    dataOrigin,
    buttonLabel,
    isAltIdentifier,
    path,
  }) => {
    const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
    const editor = useSlateStatic()
    const dispatch = useDispatch()

    const ELEMENT_SEQUENCE = [
      TEI_ELEMENT_SETTLEMENT + '#',
      TEI_ELEMENT_REPOSITORY + '#',
      TEI_ELEMENT_IDNO + '#',
      TEI_ELEMENT_ALT_IDENTIFIER + '#' + SAMMLUNG_DATA_TYPE,
      TEI_ELEMENT_ALT_IDENTIFIER + '#' + VORBESITZER_DATA_TYPE,
    ]

    const increaseLastPositionInPath = useCallback((pathPos: Path | null) => {
      if (pathPos) pathPos[pathPos.length - 1] = pathPos[pathPos.length - 1] + 1
    }, [])

    const findPosition = useCallback(
      (origin: string, type: string) => {
        let pathPos: Path | null

        const positionInSequence = ELEMENT_SEQUENCE.indexOf(origin + '#' + type)
        const identifierAncestors =
          ELEMENT_SEQUENCE[
            positionInSequence === 0
              ? 0
              : type === VORBESITZER_DATA_TYPE
                ? positionInSequence - 2
                : positionInSequence - 1
          ].split('#')
        const identifierDescdant =
          ELEMENT_SEQUENCE[
            positionInSequence === ELEMENT_SEQUENCE.length - 1
              ? ELEMENT_SEQUENCE.length - 1
              : positionInSequence + 1
          ].split('#')

        const sameElements = msIdentifierChildren.filter(
          (child: any) =>
            child.data_origin === origin &&
            (child.data_type === undefined || child.data_type === type)
        )

        if (sameElements.length !== 0) {
          pathPos = findPath(editor, sameElements[sameElements.length - 1])
          increaseLastPositionInPath(pathPos)
          return pathPos
        }

        const ancestorsElements = msIdentifierChildren.filter(
          (child: any) =>
            child.data_origin === identifierAncestors[0] &&
            (child.data_type === undefined ||
              child.data_type === identifierAncestors[1])
        )

        if (ancestorsElements.length !== 0) {
          pathPos = findPath(
            editor,
            ancestorsElements[ancestorsElements.length - 1]
          )
          increaseLastPositionInPath(pathPos)
          return pathPos
        }

        const descendantElements = msIdentifierChildren.filter(
          (child: any) =>
            child.data_origin === identifierDescdant[0] &&
            (child.data_type === undefined ||
              child.data_type === identifierDescdant[1])
        )

        if (descendantElements.length !== 0) {
          return findPath(editor, descendantElements[0])
        }

        if (
          sameElements.length === 0 &&
          ancestorsElements.length === 0 &&
          descendantElements.length === 0
        ) {
          pathPos = findPath(editor, msIdentifierChildren[0])
          increaseLastPositionInPath(findPath(editor, msIdentifierChildren[0]))
          return pathPos
        }

        return null
      },
      [msIdentifierChildren, dataTypeToAdd, editor, increaseLastPositionInPath]
    )

    const createElementWithRandomIds = useCallback(
      (template: any, dataOrigin: string) => {
        const newElement = cloneDeep(template)
        newElement.id = uuid()
        newElement.path = path + '-' + dataOrigin
        newElement.children[0].id = uuid()
        if (newElement.children[1]) {
          newElement.children[1].id = uuid()
        }
        if (newElement.children[2]) {
          newElement.children[2].id = uuid()
        }

        return newElement
      },
      []
    )

    const addElement = useCallback(
      (event: any) => {
        event.preventDefault()
        const templateElement = ErfassungsRuleDefaultChildrenOneElementFactory(
          beschreibungSubtype,
          TEI_ELEMENT_IDENTIFICATION,
          dataOrigin,
          dataTypeToAdd
        )
        const pos = findPosition(dataOrigin, dataTypeToAdd)
        if (pos !== null) {
          const element = createElementWithRandomIds(
            templateElement,
            dataOrigin
          )
          insertSlateNodes(editor, element, pos, dispatch)
        }
      },
      [
        beschreibungSubtype,
        dataTypeToAdd,
        editor,
        createElementWithRandomIds,
        findPosition,
      ]
    )

    return (
      <Button
        startIcon={<Add />}
        className={
          isAltIdentifier ? 'black-add-button-style' : 'grey-add-button-style'
        }
        onClick={(event) => addElement(event)}
        size="small"
        variant="text"
      >
        {buttonLabel}
      </Button>
    )
  }
)
