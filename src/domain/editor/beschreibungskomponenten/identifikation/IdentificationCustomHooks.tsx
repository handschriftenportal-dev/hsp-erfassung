import type { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import type { Descendant, Editor, Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import {
  findPath,
  insertSlateNodes,
} from 'src/infrastructure/slate/SlateBoundary'

function insertNodeSetRandomIdsForAltIdentifier(
  editor: Editor,
  elementToFindInsertBasePosition: Element,
  node: Descendant,
  childInsertPosition: number,
  dispatch: Dispatch
): void {
  const path = findPath(editor, elementToFindInsertBasePosition)
  if (!path) {
    console.error("Can't find path of element", elementToFindInsertBasePosition)
    return
  }

  path.splice(-1, 1, childInsertPosition)
  insertSlateNodes(editor, node, path, dispatch)
}

export function useInsertNewTEINodeForAltIdentifier() {
  const editor = useSlateStatic()
  const dispatch = useDispatch()

  return (
    dataType: string,
    elementToFindInsertBasePosition: Element,
    childInsertPosition: number,
    childrenPosFromIndexNode: number
  ) => {
    function findElementOfDataType(child: Descendant): child is Element {
      return (
        HSPElement.isElement(child) && HSPElement.checkType(dataType, child)
      )
    }

    const { children } = ErfassungsRegeln.komponenteElement('msIdentifier')
    const node = children.find(findElementOfDataType)?.children?.[
      childrenPosFromIndexNode
    ]
    if (node === undefined) {
      return () => {
        return
      }
    }
    return () => {
      insertNodeSetRandomIdsForAltIdentifier(
        editor,
        elementToFindInsertBasePosition,
        node,
        childInsertPosition,
        dispatch
      )
    }
  }
}
