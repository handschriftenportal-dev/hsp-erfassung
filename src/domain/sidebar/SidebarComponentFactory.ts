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

import { Editor, Element, Node, Text } from 'slate'

import { ErfassungsRules } from '../../infrastructure/slate/ErfassungsRules'
import {
  extractText,
  findFirstElements,
  findPath,
} from '../../infrastructure/slate/SlateBoundary'
import { TEIElement } from '../../infrastructure/slate/TEI'
import { TextPreview } from '../../infrastructure/slate/transformation/TextPreview'
import { VolltextEditorElement } from '../../infrastructure/slate/volltext/VolltextEditorElement'
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
} from '../erfassung/TEIConstants'
import SidebarEintragFactory, {
  SidebarEintragModel,
} from './SidebarEintragFactory'

export const SIDEBAR_TEXT_LENGTH = 25

export function createComponents(
  editor: Editor,
  beschreibungsSubtype: string
): SidebarEintragModel[] {
  const result: SidebarEintragModel[] = []
  createComponentsRecursion(
    editor.children,
    result,
    editor,
    1,
    'root',
    '',
    beschreibungsSubtype
  )
  return result
}

function createComponentsRecursion(
  nodes: Node[],
  komponenten: SidebarEintragModel[],
  editor: Editor,
  level: number,
  parent: string,
  wrapperid: string,
  beschreibungsType: string
) {
  nodes.forEach((element: Node) => {
    if (Text.isText(element)) {
      return
    }
    const {
      data_origin,
      component,
      path,
      id,
      level: elementLevel,
    } = element as any
    let komponente: any

    if (
      ErfassungsRules[beschreibungsType].wrapperElements.includes(data_origin)
    ) {
      wrapperid = id
    }

    if (!!component && TEIElement.components.has(component)) {
      komponente = SidebarEintragFactory(
        id,
        component,
        findPath(editor, element) || [],
        path,
        elementLevel,
        parent,
        ErfassungsRules[beschreibungsType][component].wrapperElement
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
        wrapperid,
        beschreibungsType
      )
      komponenten.push(komponente)
    } else {
      createComponentsRecursion(
        element.children,
        komponenten,
        editor,
        level,
        parent,
        wrapperid,
        beschreibungsType
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
  const iterate = Element.isElement(nodes) ? nodes.children : nodes
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
  const idno = findFirstElements(node, [
    TEI_ELEMENT_IDENTIFICATION,
    TEI_ELEMENT_IDNO,
  ])
  return idno ? extractText(idno).trim() : ''
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
