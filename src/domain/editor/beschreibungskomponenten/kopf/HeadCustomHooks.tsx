import type { Dispatch } from '@reduxjs/toolkit'
import { last } from 'lodash'
import { useDispatch } from 'react-redux'
import type { Descendant, Editor, Element } from 'slate'
import { Path } from 'slate'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  findPath,
  getParentNode,
  getSiblingNodes,
  insertSlateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

function findPosForHeadIndex(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: Element
): Path | undefined {
  const indexElement = getParentNode(editor, elementToFindInsertBasePosition)
  if (indexElement === undefined) {
    return undefined
  }
  const lastSibling = last(
    getSiblingNodes(editor, indexElement).filter(
      (child) =>
        HSPElement.isElement(child) &&
        HSPElement.checkAttributes(
          {
            origin: 'index',
            indexName: dataIndexName,
          },
          child
        )
    )
  )
  if (lastSibling === undefined) {
    return undefined
  }
  const path = findPath(editor, lastSibling)
  return path && Path.next(path)
}

function findPosForHeadIndexNormdata(
  dataType: string,
  editor: Editor,
  elementToFindInsertBasePosition: Element
): Path | undefined {
  const indexElement = getParentNode(editor, elementToFindInsertBasePosition)
  if (!indexElement) return undefined

  const termElementsByDataType = indexElement.children.filter(
    (child) =>
      HSPElement.isElement(child) && HSPElement.checkType(dataType, child)
  )
  const path = findPath(
    editor,
    termElementsByDataType[termElementsByDataType.length - 1]
  )
  return path && Path.next(path)
}

function getChildrenElementByDataIndexName(
  nodes: Descendant[],
  indexName: string,
  childIndex?: number
): Descendant | undefined {
  const element = nodes.find(
    (node): node is Element =>
      HSPElement.isElement(node) && HSPElement.checkIndexName(indexName, node)
  )
  if (!element) return undefined
  const toCopy =
    childIndex === undefined ? element : element.children[childIndex]
  return toCopy === undefined ? undefined : HSPNode.copy(toCopy)
}

function insertNewTEINodeForIndex(
  dataIndexName: string,
  editor: Editor,
  pathToInsert: Path,
  dispatch: Dispatch,
  childrenPosFromIndexNode?: number
): void {
  const { children } = ErfassungsRegeln.komponenteElement('head')
  const element = getChildrenElementByDataIndexName(
    children,
    dataIndexName,
    childrenPosFromIndexNode
  )

  if (element) {
    insertSlateNodes(editor, element, pathToInsert, dispatch)
  }
}

export function useInsertNewTEINodeForIndex(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: Element,
  childrenPosFromIndexNode?: number
): () => void {
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
        dispatch,
        childrenPosFromIndexNode
      )
    }
  }
}

export function useInsertNewTEINodeForIndexNormData(
  dataIndexName: string,
  editor: Editor,
  elementToFindInsertBasePosition: Element,
  dataType: string,
  childrenPosFromIndexNode?: number
): () => void {
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
        dispatch,
        childrenPosFromIndexNode
      )
    }
  }
}
