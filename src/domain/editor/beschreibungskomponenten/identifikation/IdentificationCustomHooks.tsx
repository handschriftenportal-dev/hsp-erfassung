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

import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Editor, Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../../../infrastructure/slate/ErfassungsRules'
import {
  findPath,
  insertSlateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../erfassung/ErfassungsState'
import {
  createElementWithRandomIds,
  getChildrenElementByDataType,
  setRandomIdsForTemplate,
} from '../BeschreibungsKomponentenCustomHooks'

function insertNodeSetRandomIdsForAltIdentifier(
  editor: Editor,
  elementToFindInsertBasePosition: Element,
  template: unknown,
  childInsertPosition: number,
  dispatch: Dispatch,
  childrenPosFromIndexNode?: number
): void {
  if (!Element.isElement(template)) {
    console.error('Template is not a valid element', template)
    return
  }
  const path = findPath(editor, elementToFindInsertBasePosition)
  if (!path) {
    console.error("Can't find path of element", elementToFindInsertBasePosition)
    return
  }

  if (childrenPosFromIndexNode === undefined) {
    setRandomIdsForTemplate(template)
    path.splice(-2, 2, childInsertPosition)
    insertSlateNodes(editor, template, path, dispatch)
  } else {
    path.splice(-1, 1, childInsertPosition)
    const element = createElementWithRandomIds(template)
    insertSlateNodes(editor, element, path, dispatch)
  }
}

export function useInsertNewTEINodeForAltIdentifier() {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const editor = useSlateStatic()
  const dispatch = useDispatch()

  return (
    dataType: string,
    elementToFindInsertBasePosition: any,
    childInsertPosition: number,
    childrenPosFromIndexNode?: number
  ) => {
    const msIdentifierDefaultChildren =
      ErfassungsRules[beschreibungSubtype].msIdentifier.defaultChildren
    const templateElement = getChildrenElementByDataType(
      msIdentifierDefaultChildren,
      dataType,
      childrenPosFromIndexNode
    )
    return () => {
      insertNodeSetRandomIdsForAltIdentifier(
        editor,
        elementToFindInsertBasePosition,
        templateElement,
        childInsertPosition,
        dispatch,
        childrenPosFromIndexNode
      )
    }
  }
}
