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
import { attempt, isError } from 'lodash'
import { ChangeEventHandler } from 'react'
import {
  Ancestor,
  Descendant,
  Editor,
  Element,
  Location,
  Node,
  NodeEntry,
  Path,
  Range,
  Text,
  Transforms,
} from 'slate'
import { jsx } from 'slate-hyperscript'
import { ReactEditor } from 'slate-react'

import {
  ChangedComponent,
  DELETE_NODE,
  INSERT_NODE,
} from '../../domain/erfassung/ChangedComponent'
import {
  findComponentById,
  findFollowingComponentById,
} from '../../domain/erfassung/ErfassungsGuideline'
import { updateComponentChangedHistory } from '../../domain/erfassung/ErfassungsState'
import { DetailError } from '../../domain/erfassung/transformation/DetailError'
import { SidebarEintragModel } from '../../domain/sidebar/SidebarEintragFactory'
import {
  ValidationError,
  ValidationResponse,
} from '../nachweis/ValidationResponse'
import { ErfassungsRules } from './ErfassungsRules'
import { FormatierungFactory } from './FormatierungFactory'
import { extractText } from './SlateNormdataBoundary'
import {
  VolltextElement,
  VolltextFormatierung,
  VolltextReferenz,
} from './volltext/VolltextElement'
import { XPath } from './XPath'

export * from './SlateNormdataBoundary'

export function findFirstElements(
  node: Node,
  dataOriginPath: string[]
): Element | undefined {
  if (Text.isText(node)) {
    return undefined
  }
  const [dataOrigin, ...rest] = dataOriginPath
  if (dataOrigin === undefined) {
    return node
  }
  const element = node.children.find(
    (child) => Element.isElement(child) && child.data_origin === dataOrigin
  )
  return element && findFirstElements(element, rest)
}

export function extractFirstText(node: Node): string {
  if (Text.isText(node)) {
    return node.text
  }
  const [firstChild] = node.children
  return extractFirstText(firstChild)
}

export function findPath(editor: Editor, childNode: Node): Path | null {
  try {
    return ReactEditor.findPath(editor, childNode)
  } catch (_error) {
    return null
  }
}

export function pathFromXPath(editor: Editor, xPath: string): Path | undefined {
  const xPairs = XPath.parse(xPath)
  let xml = editor.children
  const result = []
  while (xPairs.length > 0) {
    const [tag, xIndex] = xPairs.shift() as [string, number]
    let counter = 0
    const index = xml.findIndex(
      (node: Node) =>
        Element.isElement(node) &&
        node.data_origin === tag &&
        ++counter === xIndex
    )
    if (index < 0) {
      return undefined
    }
    result.push(index)
    xml = (xml[index] as Element).children
  }
  return result
}

export const deleteSlate = (
  editor: Editor,
  at: Location | undefined,
  id: string,
  dataOrigin: string,
  dispatch: Dispatch<any>
): void => {
  Transforms.delete(editor, { at })

  setTimeout(() => {
    // Dispatch on event loop, so that the UI gets updated
    dispatch(
      updateComponentChangedHistory({
        dataOrigin: dataOrigin,
        method: DELETE_NODE,
        id: id,
      } as ChangedComponent)
    )
  }, 0)
}

export const isNodeInComponent = (
  editor: Editor,
  element: Node,
  component: string
): boolean => {
  const at = findPath(editor, element)
  return at
    ? Array.from(
        Editor.nodes(editor, {
          at,
          reverse: true,
        })
      ).some(([node, _]) => (node as any).component === component)
    : false
}

export const findSlateNodeByWrapperID = (
  teiWrapperElement: string,
  beschreibung: SidebarEintragModel,
  editor: Editor
): NodeEntry | undefined => {
  const nodes = Array.from(
    Editor.nodes(editor, {
      at: [0],
      reverse: true,
    })
  )

  return nodes.find(
    (element: any) =>
      element[0].data_origin === teiWrapperElement &&
      element[0].id === beschreibung.wrapperId
  )
}

export const deleteSlateNodeWithWrapper = (
  teiWrapperElement: string,
  beschreibung: SidebarEintragModel,
  editor: Editor,
  callback: (input: any) => void,
  dispatch: Dispatch<any>
): void => {
  const { id, label, path, wrapperId } = beschreibung

  deleteSlate(editor, path, id, label, dispatch)

  if (wrapperId !== '') {
    const wrapperEntry = findSlateNodeByWrapperID(
      teiWrapperElement,
      beschreibung,
      editor
    )
    if (wrapperEntry) {
      const [wrapperNode, wrapperPath] = wrapperEntry
      if (
        Element.isElement(wrapperNode) &&
        wrapperNode.children.length === 1 &&
        extractText(wrapperNode) === ''
      ) {
        Transforms.delete(editor, { at: wrapperPath })
        setTimeout(() => {
          // Dispatch on event loop, so that the UI gets updated
          dispatch(
            updateComponentChangedHistory({
              dataOrigin: wrapperNode.data_origin,
              method: DELETE_NODE,
              id: id,
            } as ChangedComponent)
          )
        }, 0)
      }
    }
  }

  callback(editor.children)
}

export function getParentNodeSlate(
  editor: Editor,
  childNode: any
): Ancestor | null {
  const path = findPath(editor, childNode)
  return path ? Node.parent(editor, path) : null
}

export function getChildrenFromParentNodeSlate(
  editor: Editor,
  childNode: any
): Descendant[] {
  const parentNodeSlate = getParentNodeSlate(editor, childNode)

  if (parentNodeSlate !== null) {
    return parentNodeSlate.children
  } else {
    return []
  }
}

export const insertSlateNode = (
  element: Element,
  at: Path,
  editor: Editor,
  dispatch: Dispatch<any>,
  id: string
): void => {
  Transforms.insertNodes(editor, element, {
    at,
  })

  setTimeout(() => {
    // Dispatch on event loop, so that the UI gets updated
    dispatch(
      updateComponentChangedHistory({
        dataOrigin: element.data_origin,
        method: INSERT_NODE,
        id: id,
      } as ChangedComponent)
    )
  }, 0)
}

export const insertSlateNodes = (
  editor: Editor,
  nodes: Node[] | Node,
  at: Location | undefined,
  dispatch?: Dispatch<any>
): void => {
  Transforms.insertNodes(editor, nodes, { at })
  if (dispatch) {
    setTimeout(() => {
      // Dispatch on event loop, so that the UI gets updated
      if (!Array.isArray(nodes)) {
        const { id = 'no id', data_origin } = nodes as any
        dispatch(
          updateComponentChangedHistory({
            dataOrigin: data_origin,
            method: INSERT_NODE,
            id: id,
          } as ChangedComponent)
        )
      } else {
        dispatch(
          updateComponentChangedHistory({
            dataOrigin: nodes
              .map((node) =>
                Text.isText(node) ? 'TextNode' : node.data_origin
              )
              .join(','),
            method: INSERT_NODE,
            id: nodes.map((node: any) => node.id ?? 'no id').join(','),
          } as ChangedComponent)
        )
      }
    }, 0)
  }
}

export const insertSlateText = (
  editor: Editor,
  text: string,
  at: Location | undefined
): void => {
  Transforms.insertText(editor, text, { at })
}

export const insertTextIntoElement = (
  editor: Editor,
  element: Element,
  text: string
): void => {
  const at = findPath(editor, element)
  if (at) {
    insertSlateText(editor, text, at)
  } else {
    console.error('Could not find element', element)
  }
}

export const createInsertTextChangeEventHandler = (
  editor: Editor,
  element: Element
): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
  return (event) => {
    event.preventDefault()
    insertTextIntoElement(editor, element, event.target.value)
  }
}

export function deleteElementSlate(
  element: Element,
  editor: Editor,
  dispatch: Dispatch<any>
): boolean {
  const at = findPath(editor, element)
  if (at) {
    const { id, data_origin } = element as any
    Transforms.delete(editor, { at })
    setTimeout(() => {
      // Dispatch on event loop, so that the UI gets updated
      dispatch(
        updateComponentChangedHistory({
          dataOrigin: data_origin,
          method: DELETE_NODE,
          id: id,
        })
      )
    }, 0)
    return true
  }
  console.error('Could not delete node', element)
  return false
}

export function editorNode(editor: Editor, path: Path): NodeEntry {
  return Editor.node(editor, path)
}

export const findWrapper = (
  dataOrigin: string,
  beschreibung: SidebarEintragModel,
  beschreibungSubtype: string,
  sidebar: SidebarEintragModel[],
  editor: Editor,
  insertChild: boolean
): NodeEntry | undefined => {
  let slateNode: NodeEntry | undefined

  if (insertChild) {
    beschreibung.children.every((child: SidebarEintragModel) => {
      slateNode = findSlateNodeByWrapperID(
        ErfassungsRules[beschreibungSubtype][dataOrigin].wrapperElement
          .data_origin,
        child,
        editor
      )
      return !slateNode
    })
  } else {
    slateNode = findSlateNodeByWrapperID(
      ErfassungsRules[beschreibungSubtype][dataOrigin].wrapperElement
        .data_origin,
      beschreibung,
      editor
    )

    if (!slateNode) {
      const follower = findFollowingComponentById(
        sidebar,
        findComponentById(sidebar, beschreibung.id)
      )
      if (follower) {
        slateNode = findSlateNodeByWrapperID(
          ErfassungsRules[beschreibungSubtype][dataOrigin].wrapperElement
            .data_origin,
          follower,
          editor
        )
      }
    }
  }

  return slateNode
}

export const findSlateTargetPath = (
  element: string,
  beschreibung: SidebarEintragModel,
  beschreibungSubtype: string,
  wrapper: NodeEntry | undefined,
  editor: Editor,
  sidebar: SidebarEintragModel[]
): Path => {
  let targetPath: Path = []

  const parentElement = findComponentById(sidebar, beschreibung.parentId)
  const mustBeWrapped =
    !!ErfassungsRules[beschreibungSubtype][element].wrapperElement &&
    ErfassungsRules[beschreibungSubtype][
      element
    ].wrapperElement?.relevantIn.includes(parentElement?.teiElement)
  const behindWrapper =
    !!ErfassungsRules[beschreibungSubtype][beschreibung.teiElement]
      .wrapperElement &&
    ErfassungsRules[beschreibungSubtype][
      beschreibung.teiElement
    ].wrapperElement?.relevantIn.includes(parentElement?.teiElement)

  const pathIncrementer = pathLastElementIncrementer(beschreibung.path)

  if (mustBeWrapped) {
    if (wrapper) {
      const [_wrapperNode, wrapperPath] = wrapper
      const follower = findFollowingComponentById(
        sidebar,
        findComponentById(sidebar, beschreibung.id)
      )
      if (beschreibung.path.length + 1 === wrapperPath.length || follower) {
        if (follower) {
          return [...wrapperPath, 0]
        } else {
          return [
            ...wrapperPath,
            (Node.get(editor, wrapperPath) as Element).children.length,
          ]
        }
      } else {
        return pathIncrementer(1)
      }
    } else {
      if (behindWrapper) {
        targetPath = pathIncrementer(2)
        targetPath.pop()
        targetPath[targetPath.length - 1] =
          targetPath[targetPath.length - 1] + 1
      } else {
        return pathIncrementer(1)
      }
    }
  } else {
    if (behindWrapper) {
      targetPath = pathIncrementer(2)
      targetPath.pop()
      targetPath[targetPath.length - 1] = targetPath[targetPath.length - 1] + 1
    } else {
      return pathIncrementer(1)
    }
  }

  return targetPath
}

export const findSlateNodeAtPath = (
  at: Path,
  editor: Editor
): undefined | Node => {
  try {
    return Editor.node(editor, at)[0]
  } catch (error) {
    console.error('Cant find node ', error)
  }
  return undefined
}

export function pathLastElementIncrementer(
  path: Path
): (increment: number) => Path {
  return function incrementLast(increment: number) {
    const result = [...path]
    result[result.length - 1] += increment
    return result
  }
}

export const insertTextLangNode = (path: Path, editor: Editor): void => {
  Transforms.insertNodes(
    editor,
    jsx(
      'element',
      ErfassungsRules.medieval.erfassungsElemente.textLang.defaultElement,
      ErfassungsRules.medieval.erfassungsElemente.textLang.defaultChildren
    ),
    { at: path }
  )
}

export const updateNodes = (
  editor: Editor,
  element: Partial<Node>,
  path: Path
): void => {
  Transforms.setNodes(editor, element, { at: path })
}

export const unsetElementMatchId = (
  editor: Editor,
  props: string | string[],
  id: string
): void => {
  Transforms.unsetNodes(editor, props, {
    at: [],
    match: (node: Node, _) => {
      return Element.isElement(node) && (node as any).id === id
    },
  })
}

export function detailErrorsToValidationErrors(
  editor: Editor,
  detailErrors: DetailError[]
): ValidationError[] {
  return detailErrors.reduce(function detailErrorReducer(
    errors: ValidationError[],
    { xpath, error, diagnostics }
  ): ValidationError[] {
    const path = pathFromXPath(editor, xpath)
    if (path) {
      const nodeEntry = editorNode(editor, path)
      if (nodeEntry) {
        const id = (nodeEntry[0] as any).id
        errors.push({
          id,
          error,
          path,
          diagnostics:
            ValidationResponse.diagnosticsToDiagnosticMessage(diagnostics),
        })
      }
    }
    return errors
  }, [])
}

export function deleteReferenz(
  editor: Editor,
  element: VolltextReferenz
): void {
  const at = findPath(editor, element)
  if (at) {
    if (element.content.trim() !== '') {
      Transforms.insertNodes(editor, { text: element.content }, { at })
    }
    Transforms.delete(editor, { at })
  }
}

export function removeFormatierung(editor: Editor): void {
  Transforms.unwrapNodes(editor, {
    match: (node) =>
      Element.isElement(node) && VolltextElement.isVolltextFormatierung(node),
  })
}

export function wrapFormatierungAuszeichnung(
  editor: Editor,
  auszeichnung: VolltextFormatierung['data_origin']
): boolean {
  const element = attempt(FormatierungFactory.from, auszeichnung)
  if (isError(element)) {
    return false
  }
  Transforms.wrapNodes(editor, element, { split: true })
  Transforms.collapse(editor, { edge: 'end' })
  return true
}

export function childElementsWithDataOrigin(
  element: Element,
  data_origin: string
): Element[] {
  return element.children.filter(
    (child): child is Element =>
      Element.isElement(child) && child.data_origin === data_origin
  )
}

export function selectedText(editor: Editor): string {
  const { selection } = editor
  return selection ? Editor.string(editor, selection).trim() : ''
}

export function insertTextAtSelection(
  editor: Editor,
  selection: Range,
  text: string
) {
  ReactEditor.focus(editor)
  Transforms.select(editor, selection)
  insertSlateText(editor, text, selection)
  Transforms.move(editor)
}
