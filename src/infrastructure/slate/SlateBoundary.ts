import type { Dispatch } from '@reduxjs/toolkit'
import { attempt, isError } from 'lodash'
import type { ChangeEventHandler } from 'react'
import type { Descendant, Location, NodeEntry, Range } from 'slate'
import { Editor, Element, Node, Path, Text, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import type { ChangedComponent } from 'src/domain/erfassung/ChangedComponent'
import { DELETE_NODE, INSERT_NODE } from 'src/domain/erfassung/ChangedComponent'
import {
  findComponentById,
  findFollowingComponentById,
} from 'src/domain/erfassung/ErfassungsGuideline'
import { updateComponentChangedHistory } from 'src/domain/erfassung/ErfassungsState'
import type { DetailError } from 'src/domain/erfassung/transformation/DetailError'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import type { ValidationError } from 'src/infrastructure/nachweis/ValidationResponse'
import { ValidationResponse } from 'src/infrastructure/nachweis/ValidationResponse'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import type { Literatur } from 'src/types/Literatur'

import { FormatierungFactory } from './FormatierungFactory'
import { HSPNode } from './HSPNode'
import type {
  VolltextFormatierung,
  VolltextLiteratur,
  VolltextReferenz,
} from './volltext/VolltextElement'
import { VolltextElement } from './volltext/VolltextElement'
import { XPath } from './XPath'

export * from './SlateNormdataBoundary'

export function findPath(
  editor: Editor,
  childNode: Descendant
): Path | undefined {
  try {
    return ReactEditor.findPath(editor, childNode)
  } catch (_error) {
    return undefined
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
      (node: Descendant) =>
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
  dispatch: Dispatch
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
  element: Descendant,
  component: string
): boolean => {
  const at = findPath(editor, element)
  return at
    ? Array.from(
        Editor.nodes(editor, {
          at,
          reverse: true,
        })
      ).some(
        ([node, _]) => Element.isElement(node) && node.component === component
      )
    : false
}

export const findSlateNodeByWrapperID = (
  editor: Editor,
  teiWrapperElement: string,
  beschreibung: SidebarEintragModel
): NodeEntry | undefined => {
  const nodeEntries = Array.from(
    Editor.nodes(editor, {
      at: [0],
      reverse: true,
    })
  )

  return nodeEntries.find(
    ([node, _]) =>
      Element.isElement(node) &&
      node.data_origin === teiWrapperElement &&
      node.id === beschreibung.wrapperId
  )
}

export const deleteSlateNodeWithWrapper = (
  editor: Editor,
  teiWrapperElement: string,
  beschreibung: SidebarEintragModel,
  callback: (input: Descendant[]) => void,
  dispatch: Dispatch
): void => {
  const { id, label, path, wrapperId } = beschreibung

  deleteSlate(editor, path, id, label, dispatch)

  if (wrapperId !== '') {
    const wrapperEntry = findSlateNodeByWrapperID(
      editor,
      teiWrapperElement,
      beschreibung
    )
    if (wrapperEntry) {
      const [wrapperNode, wrapperPath] = wrapperEntry
      if (
        Element.isElement(wrapperNode) &&
        wrapperNode.children.length === 1 &&
        HSPNode.extractText(wrapperNode) === ''
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

export function getParentNode(
  editor: Editor,
  childNode: Descendant
): Element | undefined {
  const path = findPath(editor, childNode)
  if (!path) return undefined
  const parent = Node.parent(editor, path)
  return Element.isElement(parent) ? parent : undefined
}

export function getSiblingNodes(
  editor: Editor,
  node: Descendant
): Descendant[] {
  const parent = getParentNode(editor, node)
  return parent !== undefined ? parent.children : []
}

export const insertSlateNode = (
  editor: Editor,
  element: Element,
  at: Path,
  dispatch: Dispatch,
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
  nodes: Descendant[] | Descendant,
  at: Location | undefined,
  dispatch?: Dispatch
): void => {
  Transforms.insertNodes(editor, nodes, { at })
  if (dispatch) {
    setTimeout(() => {
      // Dispatch on event loop, so that the UI gets updated
      if (!Array.isArray(nodes)) {
        const { id = 'no id', data_origin = 'TextNode' } = nodes as Element
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
            id: nodes
              .map((node) =>
                Text.isText(node) ? 'TextNode' : (node.id ?? 'no id')
              )
              .join(','),
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
  editor: Editor,
  element: Element,
  dispatch: Dispatch
): boolean {
  const at = findPath(editor, element)
  if (at) {
    const { id = '', data_origin } = element
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
  editor: Editor,
  dataOrigin: string,
  beschreibung: SidebarEintragModel,
  sidebar: SidebarEintragModel[],
  insertChild: boolean
): NodeEntry | undefined => {
  const wrapperDataOrigin = ErfassungsRegeln.komponentenRegel(
    dataOrigin as Komponente
  ).wrapperElement?.data_origin
  if (wrapperDataOrigin === undefined) {
    return undefined
  }
  const findNode = (entry: SidebarEintragModel) =>
    findSlateNodeByWrapperID(editor, wrapperDataOrigin, entry)

  if (insertChild) {
    for (const child of beschreibung.children) {
      const node = findNode(child)
      if (node) {
        return node
      }
    }
    return undefined
  }

  const directNode = findSlateNodeByWrapperID(
    editor,
    wrapperDataOrigin,
    beschreibung
  )
  if (directNode) {
    return directNode
  }

  const follower = findFollowingComponentById(
    sidebar,
    findComponentById(sidebar, beschreibung.id)
  )
  if (!follower) return undefined

  return findNode(follower)
}

export const findSlateTargetPath = (
  editor: Editor,
  element: Komponente,
  beschreibung: SidebarEintragModel,
  wrapper: NodeEntry | undefined,
  sidebar: SidebarEintragModel[]
): Path => {
  const parentKomponente = findComponentById(
    sidebar,
    beschreibung.parentId
  )?.teiElement
  const { wrapperElement } = ErfassungsRegeln.komponentenRegel(element)
  const { wrapperElement: wrapperTeiElement } =
    ErfassungsRegeln.komponentenRegel(beschreibung.teiElement)

  const mustBeWrapped =
    wrapperElement !== undefined &&
    parentKomponente !== undefined &&
    wrapperElement.inKomponente.has(parentKomponente)
  const behindWrapper =
    wrapperTeiElement !== undefined &&
    parentKomponente !== undefined &&
    wrapperTeiElement.inKomponente.has(parentKomponente)

  const { path } = beschreibung

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
        return Path.next(path)
      }
    } else {
      if (behindWrapper) {
        return Path.next(Path.parent(path))
      } else {
        return Path.next(path)
      }
    }
  } else {
    if (behindWrapper) {
      return Path.next(Path.parent(path))
    } else {
      return Path.next(path)
    }
  }
}

export const findSlateNodeAtPath = (
  editor: Editor,
  at: Path
): undefined | Node => {
  try {
    return Editor.node(editor, at)[0]
  } catch (error) {
    console.error('Cant find node ', error)
  }
  return undefined
}

export function updateNodes<T extends Descendant>(
  editor: Editor,
  element: Partial<T>,
  path: Path
): void {
  Transforms.setNodes<T>(editor, element, { at: path })
}

export const unsetElementMatchId = (
  editor: Editor,
  props: string | string[],
  id: string
): void => {
  Transforms.unsetNodes(editor, props, {
    at: [],
    match: (node: Node, _) => {
      return Element.isElement(node) && node.id === id
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
        const node = nodeEntry[0]
        const id = Element.isElement(node) ? (node.id ?? '') : ''
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

export function replaceMatchingChildren(
  editor: Editor,
  element: Element,
  match: (node: Descendant) => boolean,
  append: Descendant | Descendant[]
): void {
  const at = findPath(editor, element)
  if (!at) {
    return
  }
  const remainingChildrenCount = element.children.filter(
    (child) => !match(child)
  ).length
  Transforms.removeNodes(editor, {
    at,
    match: (child, path) =>
      Path.isAncestor(at, path) && Element.isElement(child) && match(child),
  })
  Transforms.insertNodes(editor, append, {
    at: [...at, remainingChildrenCount],
  })
}

export function insertLiteratur(
  editor: Editor,
  target: Range,
  literature: Pick<Literatur, 'uri' | 'title'>
) {
  Transforms.select(editor, target)
  const literaturElement: VolltextLiteratur = {
    data_origin: 'literatur',
    uri: literature.uri,
    content: literature.title,
    children: [{ text: '' }],
  }
  Transforms.insertNodes(editor, literaturElement)
  Transforms.move(editor)
}
