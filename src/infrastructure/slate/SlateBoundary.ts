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

import { BeschreibungsKomponente } from '../../domain/sidebar/BeschreibungsKomponenteFactory'
import { Ancestor, BaseEditor, Descendant, Editor, Location, Node, NodeEntry, Path, Transforms } from 'slate'
import { jsx } from 'slate-hyperscript'
import { ErfassungsRules } from '../../domain/erfassung/ErfassungRules'
import { BaseElement } from 'slate/dist/interfaces/element'
import { findComponentById, findFollowingComponentById } from '../../domain/erfassung/ErfassungsGuidline'
import { ReactEditor } from 'slate-react'
import { SLATE_NODE_TEXTELEMENT } from '../Constants'
import { Dispatch } from '@reduxjs/toolkit'
import { updateComponentChangedHistory } from '../../domain/erfassung/ErfassungsState'
import { ChangedComponent, DELETE_NODE, INSERT_NODE } from '../../domain/erfassung/ChangedComponent'

export const DIRECTION_BACKWARD = 'DIRECTION_BACKWARD'
export const DIRECTION_FORWARD = 'DIRECTION_FORWARD'

export interface HSPSlateNode {
  // eslint-disable-next-line camelcase
  data_origin: string,
  children: Array<any>
}

export function findPath(editor: BaseEditor, childNode: any): Path | null {
  try {
    return ReactEditor.findPath(editor as ReactEditor, childNode)
  } catch (e) {
    return null
  }
}

export function dontRemoveNode(direction: string, editor: BaseEditor) {

  try {
    if (editor.selection && editor.selection.anchor) {
      const node: any = Editor.node(editor, editor.selection.anchor)
      if (node) {
        const anchorPath = [...editor.selection.anchor.path]

        const isFirstLineInBlock = anchorPath[anchorPath.length - 2] === 0
        if (direction === DIRECTION_BACKWARD) {
          if ((isFirstLineInBlock && editor.selection.focus.offset === 0) || (isFirstLineInBlock && node[0] && !node[0].text)) {
            return true
          }
        }
        if (direction === DIRECTION_FORWARD) {
          const selectionElementPath = [...editor.selection.anchor.path]
          selectionElementPath.splice(-1)
          const parentNode = Node.parent(editor, selectionElementPath)
          const anchorOffset = editor.selection.anchor.offset

          if ((selectionElementPath[selectionElementPath.length - 1] === parentNode.children.length - 1) && (anchorOffset === node[0].text.length)) {
            return true
          }
        }
      }
    }
    return false
  } catch (error) {
    console.warn(error)
    return false
  }
}

export const deleteSlate = (editor: BaseEditor, at: Location | undefined, id: string, dataOrigin: string, dispatch: Dispatch<any>) => {
  Transforms.delete(editor, { at })

  setTimeout(() => {
    // Wait for Slate Framework to calculate Location/path [] correctly
    // Without this 1 ms break it does not actualize correctly seems to be a Thread Issue.
    dispatch(updateComponentChangedHistory({ dataOrigin: dataOrigin, method: DELETE_NODE, id: id } as ChangedComponent))
  }, 1)
}

export function getParentNodeFromPathAboveGivinNode(path: number[], editor: BaseEditor) {
  const selectionElementPath = [...path]
  selectionElementPath.splice(-1)
  const parentNode: any = Node.parent(editor, selectionElementPath)
  return parentNode
}

export const isNodeInComponent = (editor: BaseEditor, element: Node, component: string) => {

  let result
  let path = null

  try {
    path = ReactEditor.findPath(editor as ReactEditor, element)
  } catch (e) {
    console.log('Error find Element in path ', e)
    path = null
  }

  if (element && component && editor && path) {
    const nodes = Array.from(Editor.nodes(editor, {
      at: path,
      reverse: true
    }))

    result = nodes.find((element: any) => {
      if ((element[0] as any).component === component) {
        return true
      }
      return false
    })
  }

  return result !== undefined
}

export const findSlateNodeByWrapperID = (teiWrapperElement: string, beschreibung: BeschreibungsKomponente, editor: BaseEditor) => {

  console.log('Finding TEI Wrapper Element ' + teiWrapperElement + ' with Beschreibung')

  const nodes = Array.from(Editor.nodes(editor, {
    at: [0],
    reverse: true
  }))

  const result = nodes.find((element: any) => {
    if ((element[0] as any).data_origin === teiWrapperElement && element[0].id === beschreibung.wrapperID) {
      return element
    }
    return undefined
  })

  return result
}

export const deleteSlateNodeWithWrapper = (teiWrapperElement: string, beschreibung: BeschreibungsKomponente, editor: BaseEditor, callback: any, checkForEmptyMsItemAndDeleteIt: boolean, dispatch: Dispatch<any>, id: string) => {

  console.log('Delete Slate Element ' + beschreibung.teiElement + ' with Wrapper ID ' + beschreibung.wrapperID)

  function deleteNodeAndMsItem(parentNode: any) {
    deleteSlate(editor, beschreibung.path, id, beschreibung.label, dispatch)
    const parentNodePath: Path = ReactEditor.findPath(editor as ReactEditor, parentNode)
    deleteSlate(editor, parentNodePath, id, beschreibung.label, dispatch)
  }

  if (checkForEmptyMsItemAndDeleteIt) {
    const parentNode = Node.parent(editor, beschreibung.path)

    // @ts-ignore
    if (parentNode.data_origin === 'msItem' && parentNode.children.length === 1) {
      deleteNodeAndMsItem(parentNode)
    }
    // @ts-ignore
    else if (parentNode.data_origin === 'msItem' && parentNode.children.length === 2) {
      // @ts-ignore
      const isTextLangNode1 = Node.child(parentNode, 0).data_origin === 'textLang'
      // @ts-ignore
      const isTextLangNode2 = Node.child(parentNode, 1).data_origin === 'textLang'
      if (isTextLangNode1 || isTextLangNode2) {
        deleteNodeAndMsItem(parentNode)
      } else {
        deleteSlate(editor, beschreibung.path, id, beschreibung.label, dispatch)
      }
    } else {
      deleteSlate(editor, beschreibung.path, id, beschreibung.label, dispatch)
    }
  } else {
    deleteSlate(editor, beschreibung.path, id, beschreibung.label, dispatch)
  }

  if (beschreibung.wrapperID !== '') {
    console.log('Delete Slate Beschreibung with Wrapper ' + beschreibung.wrapperID)
    const node: any = findSlateNodeByWrapperID(teiWrapperElement, beschreibung, editor)
    if (node && node[0].children && node[0].children.length === 1 && node[0].children[0].text === '') {
      Transforms.delete(
        // @ts-ignore
        editor, { at: node[1] }
      )
      setTimeout(() => {
        // Wait for Slate Framework to calculate Location/path [] correctly
        // Without this 1 ms break it does not actualize correctly seems to be a Thread Issue.
        dispatch(updateComponentChangedHistory({
          dataOrigin: node.data_origin,
          method: DELETE_NODE,
          id: id
        } as ChangedComponent))

      }, 1)
    }
  }

  callback(editor.children)
}

export function containedElement(editor: BaseEditor, childNode: any, element: string): boolean {
  let result: boolean
  try {
    const path: Path = ReactEditor.findPath(editor as ReactEditor, childNode)
    const parent: any = Editor.node(editor, path)
    result = parent[0].children.find((el: any) => {
      if (el.data_origin === element) {
        return true
      }
      return false
    })
  } catch (e) {
    result = false
  }
  return result !== undefined
}

export function getParentNodeSlate(editor: BaseEditor, childNode: any): Ancestor | null {
  try {
    const childPath: Path = ReactEditor.findPath(editor as ReactEditor, childNode)
    return Node.parent(editor, childPath)
  } catch (e) {
    return null
  }
}

export function getChildrenFromParentNodeSlate(editor: BaseEditor, childNode: any): Descendant[] {

  const parentNodeSlate = getParentNodeSlate(editor, childNode)

  if (parentNodeSlate !== null) {
    return parentNodeSlate.children
  } else {
    return []
  }
}

export const insertSlateNode = (component: Record<string, any>, children: Record<string, any>, targetPath: Array<number>, editor: BaseEditor, callback: any, dispatch: Dispatch<any>, id: string) => {

  console.log('Insert Slate Element ' + component.data_origin + 'at path ' + targetPath)

  Transforms.insertNodes(editor, jsx('element', component, children),
    { at: targetPath })

  setTimeout(() => {
    // Wait for Slate Framework to calculate Location/path [] correctly
    // Without this 1 ms break it does not actualize correctly seems to be a Thread Issue.
    dispatch(updateComponentChangedHistory({
      dataOrigin: component.data_origin,
      method: INSERT_NODE,
      id: id
    } as ChangedComponent))
  }, 1)
  callback(editor.children)
}

export const insertSlateNodes = (editor: BaseEditor, nodes: any, at: Location | undefined, dispatch: Dispatch<any>) => {

  Transforms.insertNodes(editor, nodes, { at })
  setTimeout(() => {
    // Wait for Slate Framework to calculate Location/path [] correctly
    // Without this 1 ms break it does not actualize correctly seems to be a Thread Issue.

    if (!Array.isArray(nodes)) {
      dispatch(updateComponentChangedHistory({
        dataOrigin: nodes.data_origin,
        method: INSERT_NODE,
        id: nodes.id
      } as ChangedComponent))
    } else {
      let dataOrigins = ''
      let ids = ''
      for (const node of nodes) {
        dataOrigins = dataOrigins + ',' + node.data_origin
        ids = ids + ',' + node.id
      }
      dispatch(updateComponentChangedHistory({
        dataOrigin: dataOrigins,
        method: INSERT_NODE,
        id: ids
      } as ChangedComponent))
    }
  }, 1)
}

export const insertSlateText = (editor: BaseEditor, text: string, at: Location | undefined) => {
  Transforms.insertText(editor, text, { at })
}

export function childrenHasTextElementNode(children: any): boolean {
  return (children.data_origin !== undefined) && (children.data_origin === SLATE_NODE_TEXTELEMENT)
}

export function insertTextForChildren(children: any, event: any, editor: any) {
  event.preventDefault()
  Transforms.insertText(
    editor, event.target.value,
    { at: ReactEditor.findPath(editor as ReactEditor, children) }
  )
}

export function deleteElementSlate(element: any, editor: BaseEditor, dispatch: Dispatch<any>) {
  let success = true

  try {
    const elementPath: Path = ReactEditor.findPath(editor as ReactEditor, element)
    Transforms.delete(
      editor, { at: elementPath }
    )
    setTimeout(() => {
      // Wait for Slate Framework to calculate Location/path [] correctly
      // Without this 1 ms break it does not actualize correctly seems to be a Thread Issue.
      dispatch(updateComponentChangedHistory({
        dataOrigin: element.data_origin,
        method: DELETE_NODE,
        id: element.id
      } as ChangedComponent))
    }, 1)
  } catch (e) {
    console.log('error during delete')
    console.log(e)
    success = false
  }
  return success
}

export function editorNode(editor: BaseEditor, path: number[]) {
  return Editor.node(editor as ReactEditor, path)[0]
}

export const findWrapper = (element: string, beschreibung: BeschreibungsKomponente, beschreibungSubtype: string, sidebar: any, editor: BaseEditor, insertChild: boolean) => {

  let slateNode: NodeEntry | undefined

  if (insertChild) {
    beschreibung.children.every((child: BeschreibungsKomponente) => {
      slateNode = findSlateNodeByWrapperID(ErfassungsRules[beschreibungSubtype][element].wrapperElement.data_origin, child, editor)
      if (slateNode) {
        return false
      }
      return true
    })
  } else {
    slateNode = findSlateNodeByWrapperID(ErfassungsRules[beschreibungSubtype][element].wrapperElement.data_origin, beschreibung, editor)

    if (!slateNode) {
      const follower = findFollowingComponentById(sidebar, findComponentById(sidebar, beschreibung.id))
      console.log('Found Follower in Sidebar')
      console.log(follower)
      if (follower) {
        slateNode = findSlateNodeByWrapperID(ErfassungsRules[beschreibungSubtype][element].wrapperElement.data_origin, follower, editor)
      }
    }
  }

  return slateNode
}

export const findSlateTargetPath = (element: string, beschreibung: BeschreibungsKomponente, beschreibungSubtype: string, foundAlreadyExistingWrapper: any, editor: BaseEditor, sidebar: any) => {
  let targetPath: Array<number> = []
  const mustBeWrapped = !!ErfassungsRules[beschreibungSubtype][element].wrapperElement
  const behindWrapper = !!ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].wrapperElement

  console.log('Must be wrapped ' + mustBeWrapped + ' behind wrapper ' + behindWrapper)

  function createNewPathByAddDistance(distance: number) {
    return beschreibung.path.map(function increment(number: any, index: any) {

      if (index === beschreibung.path.length - 1) {
        return number + distance
      }

      return number
    })
  }

  if (mustBeWrapped) {
    if (foundAlreadyExistingWrapper) {
      const follower = findFollowingComponentById(sidebar, findComponentById(sidebar, beschreibung.id))
      if (beschreibung.path.length + 1 === foundAlreadyExistingWrapper[1].length || follower) {
        if (follower) {
          return [...foundAlreadyExistingWrapper[1], 0]
        } else {
          return [...foundAlreadyExistingWrapper[1], (Node.get(editor, foundAlreadyExistingWrapper[1]) as BaseElement).children.length]
        }
      } else {
        return createNewPathByAddDistance(1)
      }

    } else {
      if (behindWrapper) {
        targetPath = createNewPathByAddDistance(2)
        targetPath.pop()
        targetPath[targetPath.length - 1] = targetPath[targetPath.length - 1] + 1
      } else {
        return createNewPathByAddDistance(1)
      }
    }
  } else {
    if (behindWrapper) {
      targetPath = createNewPathByAddDistance(2)
      targetPath.pop()
      targetPath[targetPath.length - 1] = targetPath[targetPath.length - 1] + 1
    } else {
      return createNewPathByAddDistance(1)
    }
  }

  return targetPath
}

export const createTargetPath = (editor: BaseEditor, beschreibung: BeschreibungsKomponente) => {
  const componentChilds: any = (Node.get(editor, beschreibung.path) as BaseElement).children

  if (componentChilds && componentChilds[0].data_origin && componentChilds[0].data_origin !== 'textelement') {
    return [...beschreibung.path, (Node.get(editor, beschreibung.path) as BaseElement).children.length]
  } else {
    return [...beschreibung.path, 0]
  }
}

export const findSlateNodeWithBeschreibung: any | undefined = (beschreibung: BeschreibungsKomponente, editor: BaseEditor) => {

  let node: any

  try {

    node = (Editor.node(editor, beschreibung.path)[0])

  } catch (e) {
    console.error('Cant find node ', e)
  }

  return node
}

export const deselect = (editor: BaseEditor) => {
  try {
    Transforms.deselect(editor)
  } catch (e) {
    console.error('Error deselecting editor ', e)
  }
}

export const findSlatePath = (editor: BaseEditor, element: any) => {
  let slatePath: Path = []

  try {
    slatePath = ReactEditor.findPath(editor as ReactEditor, element)
  } catch (e) {
    console.error('Error during find slate path ' + e)
  }
  return slatePath
}
