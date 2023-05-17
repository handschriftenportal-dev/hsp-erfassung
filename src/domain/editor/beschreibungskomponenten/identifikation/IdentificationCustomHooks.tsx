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

import { BaseEditor, Node } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { insertSlateNodes } from '../../../../infrastructure/slate/SlateBoundary'
import { createElementWithRandomIds, getChildrenElementByDataType, setRandomIdsForTemplate } from '../BeschreibungsKomponentenCustomHooks'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../erfassung/ErfassungsState'
import { ErfassungsRules } from '../../../erfassung/ErfassungRules'
import { Dispatch } from '@reduxjs/toolkit'

/**
 * Author: Christoph Marten on 25.04.2022 at 10:37
 */
function insertNodeSetRandomIdsForAltIdentifier(editor: BaseEditor, elementToFindInsertBasePosition: any, templateElement: any, childInsertPosition: number, dispatch:Dispatch<any>, childrenPosFormIndexNode?: number) {

  try {

    let insertBasePosition = ReactEditor.findPath(editor as ReactEditor, elementToFindInsertBasePosition)

    if (insertBasePosition !== undefined && templateElement) {
      if (childrenPosFormIndexNode === undefined) {
        setRandomIdsForTemplate(templateElement)
        insertBasePosition = insertBasePosition.slice(0, -1)
        insertBasePosition[insertBasePosition.length - 1] = childInsertPosition
        insertSlateNodes(editor, templateElement as Node, insertBasePosition, dispatch)
      } else {
        insertBasePosition[insertBasePosition.length - 1] = childInsertPosition
        const element = createElementWithRandomIds(templateElement)
        insertSlateNodes(editor, element, insertBasePosition, dispatch)
      }
    }
  } catch (error) {
    console.log('Can\'t insert templateElement because of ')
    console.log(error)
  }
}

export function useInsertNewTEINodeForAltIdentifier(dataType: string, elementToFindInsertBasePosition: any, childInsertPosition: number, childrenPosFromIndexNode?: number) {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const editor = useSlateStatic()
  const dispatch = useDispatch()

  return () => {

    const msIdentifierDefaultChildren = ErfassungsRules[beschreibungSubtype].msIdentifier.defaultChildren
    const templateElement = getChildrenElementByDataType(msIdentifierDefaultChildren, dataType, childrenPosFromIndexNode)

    insertNodeSetRandomIdsForAltIdentifier(editor, elementToFindInsertBasePosition, templateElement, childInsertPosition, dispatch, childrenPosFromIndexNode)
  }
}
