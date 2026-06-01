import type { Descendant, Editor, Node } from 'slate'
import { Element, Text } from 'slate'
import {
  TEI_ELEMENT_DECONOTE_CONTENT,
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_NOTE_MUSIC,
  TEI_ELEMENT_NOTE_TEXT,
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
  TEI_ELEMENT_PART_OTHER,
} from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { findPath } from 'src/infrastructure/slate/SlateBoundary'
import { TextPreview } from 'src/infrastructure/slate/transformation/TextPreview'
import { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'

import type { SidebarEintragModel } from './SidebarEintragFactory'
import SidebarEintragFactory from './SidebarEintragFactory'

export const SIDEBAR_TEXT_LENGTH = 25

export function createComponents(editor: Editor): SidebarEintragModel[] {
  const result: SidebarEintragModel[] = []
  createComponentsRecursion(editor.children, result, editor, 1, 'root', '')
  return result
}

function createComponentsRecursion(
  nodes: Descendant[],
  komponenten: SidebarEintragModel[],
  editor: Editor,
  level: number,
  parent: string,
  wrapperid: string
) {
  nodes.forEach((element: Descendant) => {
    if (Text.isText(element)) {
      return
    }
    const { component, path = '', id = '', level: elementLevel = 0 } = element
    let komponente: SidebarEintragModel | undefined

    if (ErfassungsRegeln.isWrapperElement(element)) {
      wrapperid = id
    }

    if (!!component && HSPNode.isBeschreibungsKomponente(component)) {
      komponente = SidebarEintragFactory(
        id,
        component,
        findPath(editor, element) || [],
        path,
        elementLevel,
        parent,
        ErfassungsRegeln.komponentenRegel(component)?.wrapperElement !==
          undefined
          ? wrapperid
          : ''
      )
    }

    if (komponente) {
      createComponentsRecursion(
        element.children,
        komponente.teiElement !== TEI_ELEMENT_PART_OTHER
          ? komponente.children
          : [],
        editor,
        level,
        komponente.id,
        wrapperid
      )
      komponenten.push(komponente)
    } else {
      createComponentsRecursion(
        element.children,
        komponenten,
        editor,
        level,
        parent,
        wrapperid
      )
    }
  })
}

function findFirstVolltext(
  nodes: Node | Node[]
): VolltextEditorElement | undefined {
  if (Text.isText(nodes)) {
    return undefined
  }
  if (VolltextEditorElement.isVolltextEditorElement(nodes)) {
    return nodes
  }
  const iterate = Array.isArray(nodes) ? nodes : nodes.children
  for (const child of iterate) {
    const result = findFirstVolltext(child)
    if (result) {
      return result
    }
  }
}

function volltextVorschau(node: Element, _: number): string {
  const volltext = findFirstVolltext(node)
  return volltext ? TextPreview(volltext, SIDEBAR_TEXT_LENGTH) : ''
}

function idnoVorschau(node: Element, _: number): string {
  const idno = HSPNode.findFirstElement(node, [
    TEI_ELEMENT_IDENTIFICATION,
    TEI_ELEMENT_IDNO,
  ])
  return idno ? HSPNode.extractText(idno).trim() : ''
}

function indexVorschau(_: Element, index: number): string {
  return index > 0 ? `(${index})` : ''
}

const vorschauLookup: Record<string, typeof volltextVorschau> = {
  [TEI_ELEMENT_NOTE_TEXT]: volltextVorschau,
  [TEI_ELEMENT_NOTE_MUSIC]: volltextVorschau,
  [TEI_ELEMENT_DECONOTE_CONTENT]: volltextVorschau,
  [TEI_ELEMENT_DECONOTE_FORM]: volltextVorschau,
  [TEI_ELEMENT_PART_FRAGMENT]: idnoVorschau,
  [TEI_ELEMENT_PART_BOOKLET]: idnoVorschau,
  [TEI_ELEMENT_PART_BINDING]: idnoVorschau,
  [TEI_ELEMENT_PART_ACCMAT]: idnoVorschau,
  [TEI_ELEMENT_ITEM]: indexVorschau,
}

function createSubtitleForComponent(
  beschreibung: SidebarEintragModel,
  node: Node | undefined,
  index: number
): string {
  if (!Element.isElement(node)) {
    return ''
  }
  const vorschau = vorschauLookup[beschreibung.teiElement]
  return vorschau ? vorschau(node, index) : ''
}

export const SidebarComponentFactory = Object.freeze({
  createComponents,
  createSubtitleForComponent,
})
