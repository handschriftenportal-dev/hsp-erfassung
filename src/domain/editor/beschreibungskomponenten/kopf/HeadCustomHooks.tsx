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
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Editor, Node, Path } from 'slate'

import { ErfassungsRules } from '../../../../infrastructure/slate/ErfassungsRules'
import {
  findPath,
  getParentNodeSlate,
  insertSlateNodes,
} from '../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../erfassung/ErfassungsState'
import {
  createElementWithRandomIds,
  setRandomIdsForTemplate,
} from '../BeschreibungsKomponentenCustomHooks'

export function useGetRuleForTerm(
  rule: string,
  dataIndexName: string,
  dataType: string
) {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  return (
    ErfassungsRules?.[beschreibungSubtype]?.erfassungsElemente?.[
      'index' + dataIndexName
    ]?.term?.[dataType]?.[rule] || false
  )
}

function findPosForHeadIndex(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: any
) {
  const indexElement: any = getParentNodeSlate(
    editor,
    elementToFindInsertBasePosition
  )
  const headElement: any = getParentNodeSlate(editor, indexElement)
  const indexNameChilds = headElement.children
    .filter((child: any) => child.data_origin === 'index')
    .filter((indexChild: any) => indexChild.data_indexName === dataIndexName)
  const headPath = findPath(editor, indexNameChilds[indexNameChilds.length - 1])
  if (headPath) {
    headPath[headPath.length - 1] = headPath[headPath.length - 1] + 1
  }
  return headPath
}

function findPosForHeadIndexNormdata(
  dataType: string,
  editor: Editor,
  elementToFindInsertBasePosition: any
) {
  const indexElement: any = getParentNodeSlate(
    editor,
    elementToFindInsertBasePosition
  )
  const termElementsByDataType = indexElement.children.filter(
    (term: any) => term.data_type === dataType
  )

  const posForHeadIndexNormdata = findPath(
    editor,
    termElementsByDataType[termElementsByDataType.length - 1]
  )
  if (posForHeadIndexNormdata) {
    posForHeadIndexNormdata[posForHeadIndexNormdata.length - 1] =
      posForHeadIndexNormdata[posForHeadIndexNormdata.length - 1] + 1
    return posForHeadIndexNormdata
  }
}

function insertNodeSetRandomIds(
  editor: Editor,
  templateElement: any,
  pathToInsert: Path,
  dispatch: Dispatch<any>,
  childrenPosFormIndexNode?: number
) {
  try {
    if (templateElement) {
      if (childrenPosFormIndexNode === undefined) {
        setRandomIdsForTemplate(templateElement)
        insertSlateNodes(
          editor,
          templateElement as Node,
          pathToInsert,
          dispatch
        )
      } else {
        const element = createElementWithRandomIds(templateElement)
        insertSlateNodes(editor, element, pathToInsert, dispatch)
      }
    }
  } catch (error) {
    console.error("Can't insert templateElement", error)
  }
}

function getChildrenElementByDataIndexName(
  childrenArray: any,
  dataIndexName: string,
  childPosForTemplate?: number
) {
  for (const element of childrenArray) {
    if (element.data_indexName === dataIndexName) {
      if (childPosForTemplate) {
        return cloneDeep(element.children[childPosForTemplate])
      }
      return cloneDeep(element)
    }
  }
  return null
}

function insertNewTEINodeForIndex(
  dataIndexName: string,
  editor: Editor,
  pathToInsert: Path,
  beschreibungSubtype: string,
  dispatch: Dispatch<any>,
  childrenPosFromIndexNode?: number
): void {
  const msHeadDefaultChildren =
    ErfassungsRules[beschreibungSubtype].head.defaultChildren
  const templateElement = getChildrenElementByDataIndexName(
    msHeadDefaultChildren,
    dataIndexName,
    childrenPosFromIndexNode
  )

  if (pathToInsert) {
    insertNodeSetRandomIds(
      editor,
      templateElement,
      pathToInsert,
      dispatch,
      childrenPosFromIndexNode
    )
  }
}

export function useInsertNewTEINodeForIndex(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: any,
  childrenPosFromIndexNode?: number
): () => void {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const dispatch = useDispatch()

  return () => {
    const posForHeadIndex = findPosForHeadIndex(
      dataIndexName,
      editor,
      elementToFindInsertBasePosition
    )
    if (posForHeadIndex) {
      insertNewTEINodeForIndex(
        dataIndexName,
        editor,
        posForHeadIndex,
        beschreibungSubtype,
        dispatch,
        childrenPosFromIndexNode
      )
    }
  }
}

export function useInsertNewTEINodeForIndexNormData(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: any,
  dataType: string,
  childrenPosFromIndexNode?: number
): () => void {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const dispatch = useDispatch()

  return () => {
    const posForIndexNormdata = findPosForHeadIndexNormdata(
      dataType,
      editor,
      elementToFindInsertBasePosition
    )

    if (posForIndexNormdata) {
      insertNewTEINodeForIndex(
        dataIndexName,
        editor,
        posForIndexNormdata,
        beschreibungSubtype,
        dispatch,
        childrenPosFromIndexNode
      )
    }
  }
}
