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

import { Button } from '@material-ui/core'
import React, { useCallback } from 'react'
import { ErfassungsRuleDefaultChildrenOneElementFactory } from '../../../erfassung/ErfassungRules'

import { findPath, insertSlateNodes } from '../../../../infrastructure/slate/SlateBoundary'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../erfassung/ErfassungsState'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Path } from 'slate'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE
} from './BeschreibungsKomponenteIdentifikation'
import { createUUID } from '../../../../infrastructure/XMLConverter'

/**
 * Author: Christoph Marten on 25.02.2022 at 08:31
 */

export const FIRST_ELEMENT_INSERT_POSITION = 'FIRST'

interface AddDataTypeButtonForIndentificationProps {
  msIdentifierChildren: any,
  dataTypeToAdd: string,
  dataOrigin: string,
  buttonLabel: string,
  buttonClass: string,
  path: string
}

export const AddElementButtonForIdentification = React.memo(({
  msIdentifierChildren,
  dataTypeToAdd,
  dataOrigin,
  buttonLabel, buttonClass,
  path
}: AddDataTypeButtonForIndentificationProps) => {

  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const editor = useSlateStatic()
  const dispatch = useDispatch()
  const ELEMENT_SEQUENCE = [TEI_ELEMENT_SETTLEMENT + '#', TEI_ELEMENT_REPOSITORY + '#', TEI_ELEMENT_IDNO + '#',
    TEI_ELEMENT_ALT_IDENTIFIER + '#' + SAMMLUNG_DATA_TYPE, TEI_ELEMENT_ALT_IDENTIFIER + '#' + VORBESITZER_DATA_TYPE]

  const increaseLastPositionInPath = useCallback((pathPos: Path | null) => {
    if (pathPos) pathPos[pathPos.length - 1] = pathPos[pathPos.length - 1] + 1
  }, [])


  const findPosition = useCallback((origin: string, type: string) => {
    let pathPos: Path | null

    const positionInSequence = ELEMENT_SEQUENCE.indexOf(origin + '#' + type)
    const identifierAncestors: Array<string> = ELEMENT_SEQUENCE[positionInSequence === 0 ? 0 : positionInSequence - 1].split('#')
    const identifierDescdant: Array<string> = ELEMENT_SEQUENCE[positionInSequence === ELEMENT_SEQUENCE.length - 1 ? ELEMENT_SEQUENCE.length - 1 : positionInSequence + 1].split('#')

    const sameElements = msIdentifierChildren.filter((child: any) => child.data_origin === origin && (child.data_type === undefined || child.data_type === type))

    if (sameElements.length !== 0) {
      pathPos = findPath(editor as ReactEditor, sameElements[sameElements.length - 1])
      increaseLastPositionInPath(pathPos)
      return pathPos
    }

    const ancestorsElements = msIdentifierChildren.filter((child: any) => child.data_origin === identifierAncestors[0] && (child.data_type === undefined || child.data_type === identifierAncestors[1]))

    if (ancestorsElements.length !== 0) {
      pathPos = findPath(editor as ReactEditor, ancestorsElements[ancestorsElements.length - 1])
      increaseLastPositionInPath(pathPos)
      return pathPos
    }

    const descedantElements = msIdentifierChildren.filter((child: any) => child.data_origin === identifierDescdant[0] && (child.data_type === undefined || child.data_type === identifierDescdant[1]))

    if (descedantElements.length !== 0) {
      return findPath(editor as ReactEditor, descedantElements[0])
    }

    if (sameElements.length === 0 && ancestorsElements.length === 0 && descedantElements.length === 0) {
      pathPos = findPath(editor as ReactEditor, msIdentifierChildren[0])
      increaseLastPositionInPath(findPath(editor as ReactEditor, msIdentifierChildren[0]))
      return pathPos
    }

    return null
  }, [msIdentifierChildren, dataTypeToAdd, editor, increaseLastPositionInPath])

  const createElementWithRandomIds = useCallback((template: any, dataOrigin: string) => {

    const newElement = JSON.parse(JSON.stringify(template))
    newElement.id = createUUID()
    newElement.path = path + '-' + dataOrigin
    newElement.children[0].id = createUUID()
    if (newElement.children[1]) {
      newElement.children[1].id = createUUID()
    }
    if (newElement.children[2]) {
      newElement.children[2].id = createUUID()
    }

    return newElement
  }, [])

  const addElement = useCallback((event: any) => {
    event.preventDefault()
    const templateElement = ErfassungsRuleDefaultChildrenOneElementFactory(beschreibungSubtype, TEI_ELEMENT_IDENTIFICATION, dataOrigin, dataTypeToAdd)
    const pos = findPosition(dataOrigin, dataTypeToAdd)
    if (pos !== null) {
      const element = createElementWithRandomIds(templateElement, dataOrigin)
      insertSlateNodes(editor, element, pos, dispatch)
    }
  }, [beschreibungSubtype, dataTypeToAdd, editor, createElementWithRandomIds, findPosition])

  return (
      <Button role={dataTypeToAdd + 'Add'}
              className={buttonClass}
              onClick={(event) => addElement(event)}
              variant="text">{buttonLabel}</Button>
  )
})
