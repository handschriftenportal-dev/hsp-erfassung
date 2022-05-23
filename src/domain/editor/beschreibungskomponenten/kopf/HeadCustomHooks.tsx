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

import { BaseEditor, Node } from 'slate'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from '../../../erfassung/Erfassung'
import { useDispatch, useSelector } from 'react-redux'
import { selectBeschreibung } from '../../../erfassung/ErfassungsState'
import { findPath, getParentNodeSlate, insertSlateNodes } from '../../../../infrastructure/slate/SlateBoundary'
import { ErfassungsRules } from '../../../erfassung/ErfassungRules'
import { createElementWithRandomIds, setRandomIdsForTemplate } from '../BeschreibungsKomponentenCustomHooks'
import { Dispatch } from '@reduxjs/toolkit'

/**
 * Author: Christoph Marten on 25.04.2022 at 10:23
 */

export function useGetRuleForTerm(rule: string, dataIndexName: string, dataType: string) {

  function getElementByDataType(childrenArray: any) {
    for (const elementNode of childrenArray) {
      if (Object.keys(elementNode)[0] === dataType) {
        return JSON.parse(JSON.stringify(elementNode))
      }
    }
  }

  try {
    const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
    const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
    const termElementRules = (ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + dataIndexName]) ? ErfassungsRules[beschreibungSubtype].erfassungsElemente['index' + dataIndexName].term : []

    const termElementRulesForDataType = getElementByDataType(termElementRules)
    const termElementRuleObject = (termElementRulesForDataType) ? Object.values(termElementRulesForDataType)[0] : undefined
    // @ts-ignore
    const termElementRule = (termElementRuleObject) ? termElementRuleObject[rule] : false
    return () => {
      return termElementRule
    }
  } catch (e) {
    return () => {
      return false
    }
  }
}

function findPosForHeadIndex(dataIndexName: string, editor: BaseEditor, elementToFindInsertBasePosition: any) {
  const indexElement: any = getParentNodeSlate(editor, elementToFindInsertBasePosition)
  const headElement: any = getParentNodeSlate(editor, indexElement)
  const indexNameChilds = headElement.children.filter((child: any) => child.data_origin === 'index').filter((indexChild: any) => indexChild.data_indexName === dataIndexName)
  const headPath = findPath(editor, indexNameChilds[indexNameChilds.length - 1])
  if (headPath) {
    headPath[headPath.length - 1] = headPath[headPath.length - 1] + 1
  }
  return headPath
}

function findPosForHeadIndexNormdata(dataType: string, editor: BaseEditor, elementToFindInsertBasePosition: any) {
  const indexElement: any = getParentNodeSlate(editor, elementToFindInsertBasePosition)
  const termElementsByDataType = indexElement.children.filter((term: any) => term.data_type === dataType)

  const posForHeadIndexNormdata = findPath(editor, termElementsByDataType[termElementsByDataType.length - 1])
  if (posForHeadIndexNormdata) {
    posForHeadIndexNormdata[posForHeadIndexNormdata.length - 1] = posForHeadIndexNormdata[posForHeadIndexNormdata.length - 1] + 1
    return posForHeadIndexNormdata
  }
}

function insertNodeSetRandomIds(editor: BaseEditor, templateElement: any, pathToInsert: number[], dispatch:Dispatch<any>, childrenPosFormIndexNode?: number) {
  try {

    if (templateElement) {
      if (childrenPosFormIndexNode === undefined) {
        setRandomIdsForTemplate(templateElement)
        insertSlateNodes(editor, templateElement as Node, pathToInsert, dispatch)
      } else {
        const element = createElementWithRandomIds(templateElement)
        insertSlateNodes(editor, element, pathToInsert, dispatch)
      }
    }
  } catch (error) {
    console.log('Can\'t insert templateElement because of ')
    console.log(error)
  }
}

function getChildrenElementByDataIndexName(childrenArray: any, dataIndexName: string, childPosForTemplate?: number) {
  for (const element of childrenArray) {
    if (element.data_indexName === dataIndexName) {
      if (childPosForTemplate) {
        return JSON.parse(JSON.stringify(element.children[childPosForTemplate]))
      }
      return JSON.parse(JSON.stringify(element))
    }
  }
  return null
}

function insertNewTEINodeForIndex(dataIndexName: string, editor: BaseEditor, pathToInsert: number[], beschreibungSubtype: string, dispatch:Dispatch<any>, childrenPosFromIndexNode?: number) {

  const msHeadDefaultChildren = ErfassungsRules[beschreibungSubtype].head.defaultChildren
  const templateElement = getChildrenElementByDataIndexName(msHeadDefaultChildren, dataIndexName, childrenPosFromIndexNode)

  if (pathToInsert) {
    insertNodeSetRandomIds(editor, templateElement, pathToInsert, dispatch, childrenPosFromIndexNode)
  }
}

export function useInsertNewTEINodeForIndex(dataIndexName: string, editor: BaseEditor, elementToFindInsertBasePosition: any, childrenPosFromIndexNode?: number) {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const dispatch = useDispatch()

  return () => {

    const posForHeadIndex = findPosForHeadIndex(dataIndexName, editor, elementToFindInsertBasePosition)
    if (posForHeadIndex) {
      insertNewTEINodeForIndex(dataIndexName, editor, posForHeadIndex, beschreibungSubtype, dispatch, childrenPosFromIndexNode)
    }
  }
}

export function useInsertNewTEINodeForIndexNormData(dataIndexName: string, editor: BaseEditor, elementToFindInsertBasePosition: any, dataType: string, childrenPosFromIndexNode?: number) {
  const globalBeschreibung: BeschreibungsObject = useSelector(selectBeschreibung)
  const beschreibungSubtype = globalBeschreibung.subtype && globalBeschreibung.subtype !== '' ? globalBeschreibung.subtype : BESCHREIBUNG_DEFAULT_SUBTYPE
  const dispatch = useDispatch()

  return () => {
    const posForIndexNormdata = findPosForHeadIndexNormdata(dataType, editor, elementToFindInsertBasePosition)

    if (posForIndexNormdata) {
      insertNewTEINodeForIndex(dataIndexName, editor, posForIndexNormdata, beschreibungSubtype, dispatch, childrenPosFromIndexNode)
    }
  }
}
