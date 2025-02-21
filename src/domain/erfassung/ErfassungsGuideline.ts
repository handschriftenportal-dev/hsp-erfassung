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

import { uniq } from 'lodash'
import { Element } from 'slate'
import { v4 as uuid } from 'uuid'

import {
  BeschreibungsKomponentenRule,
  ComponentTranslation,
  ErfassungsRuleDefaultChildrenFactory,
  ErfassungsRuleDefaultElementFactory,
  ErfassungsRuleForComponent,
  ErfassungsRuleForType,
  ErfassungsRules,
  ErfassungsRuleWrapperFactory,
} from '../../infrastructure/slate/ErfassungsRules'
import { SidebarEintragModel } from '../sidebar/SidebarEintragFactory'
import {
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
} from './TEIConstants'

const UNKNOWN_POSITION = 9999

export interface BeschreibungsKomponenteOption {
  element: string
  label: string
}

function uniqueTeiElements(komponenten: SidebarEintragModel[]): string[] {
  return uniq(komponenten.map((component) => component.teiElement))
}

export function calculateNextNumberOfComponentsOnSameLevel(
  sidebar: SidebarEintragModel[],
  beschreibung: SidebarEintragModel,
  filter: string,
  isChild: boolean
): number {
  if (isChild) {
    return (
      beschreibung.children.filter((child) => child.teiElement === filter)
        .length + 1
    )
  }

  const componentParent = sidebar.find(
    (beschreibungsKomponente) =>
      beschreibung.parentId === beschreibungsKomponente.id
  )

  if (beschreibung.parentId === 'root' && componentParent === undefined) {
    return sidebar.filter((child) => child.teiElement === filter).length + 1
  }

  if (componentParent !== undefined) {
    return (
      componentParent.children.filter((child) => child.teiElement === filter)
        .length + 1
    )
  }

  const children = sidebar.flatMap((component) => component.children)

  return calculateNextNumberOfComponentsOnSameLevel(
    children,
    beschreibung,
    filter,
    isChild
  )
}

export function findComponentPosition(
  sidebar: SidebarEintragModel[],
  beschreibung: SidebarEintragModel,
  filter: string
): number {
  const componentParent = sidebar.find(
    (beschreibungsKomponente) =>
      beschreibung.parentId === beschreibungsKomponente.id
  )

  if (componentParent !== undefined) {
    return (
      componentParent.children
        .filter((child) => child.teiElement === filter)
        .indexOf(beschreibung) + 1
    )
  }

  const children = sidebar.flatMap((component) => component.children)

  if (children.length > 0) {
    return findComponentPosition(children, beschreibung, filter)
  }
  return UNKNOWN_POSITION
}

export function findComponentById(
  sidebar: SidebarEintragModel[],
  id: string
): SidebarEintragModel | undefined {
  const componentForId = sidebar.find((component) => component.id === id)
  if (componentForId !== undefined) {
    return componentForId
  }
  const children = sidebar.flatMap((component) => component.children)
  return children.length > 0 ? findComponentById(children, id) : undefined
}

export function findFollowingComponentById(
  sidebar: SidebarEintragModel[],
  beschreibung: SidebarEintragModel | undefined
) {
  let componentForID: SidebarEintragModel | undefined
  if (beschreibung === undefined) {
    return undefined
  }

  const index = sidebar.indexOf(beschreibung)
  if (index !== -1) {
    return sidebar[index + 1]
  }

  sidebar.forEach((component) => {
    if (!componentForID) {
      componentForID = findFollowingComponentById(
        component.children,
        beschreibung
      )
    }
  })

  return componentForID
}

export function uniqueSiblingComponents(
  sidebar: SidebarEintragModel[],
  komponente: SidebarEintragModel
): string[] {
  const { parentId } = komponente
  if (parentId === 'root') {
    return uniqueTeiElements(sidebar)
  }
  const parent = findComponentById(sidebar, parentId)
  return parent !== undefined ? uniqueTeiElements(parent.children) : []
}

type ComponentRules = Record<string, BeschreibungsKomponentenRule>

export function existingComponentsRemover(
  existingComponents: string[],
  compRules: ComponentRules
) {
  return function filterRemove(component: string) {
    return (
      !existingComponents.includes(component) ||
      compRules[component].allowedNumbers !== '1'
    )
  }
}

export function filterSortTranslate(
  beschreibungsRule: any,
  components: string[] | undefined,
  filterFn: (teiElement: string) => boolean = () => true
): BeschreibungsKomponenteOption[] {
  if (components === undefined) {
    return []
  }
  function insertOrderSorter<T>(insertOrder: [T]) {
    return function sortElements(first: T, second: T): number {
      return insertOrder.indexOf(first) - insertOrder.indexOf(second)
    }
  }
  const componentOrder = insertOrderSorter(
    beschreibungsRule.componentsInsertOrder
  )
  return components
    .filter(filterFn)
    .sort(componentOrder)
    .map((element) => ({
      element,
      label: ComponentTranslation[element] ?? element,
    }))
}

export function allowedFollowerComponentOptions(
  beschreibungsType: string,
  sidebar: SidebarEintragModel[],
  komponente: SidebarEintragModel
): BeschreibungsKomponenteOption[] {
  const beschreibungsRule = ErfassungsRules[beschreibungsType]
  const { teiElement } = komponente
  const existingComponents = uniqueSiblingComponents(sidebar, komponente)
  const parent = findComponentById(sidebar, komponente.parentId)

  function filterForAllowedFollower(component: string): boolean {
    const sameBehind =
      teiElement === findFollowingComponentById(sidebar, komponente)?.teiElement
    if (teiElement.includes('msPart') && sameBehind) {
      return component === teiElement
    }
    return beschreibungsRule[teiElement].allowedFollower.includes(component)
  }

  function filterForAllowedPredecessor(component: string): boolean {
    const follower =
      existingComponents[existingComponents.indexOf(teiElement) + 1]
    return (
      !follower ||
      beschreibungsRule[follower].allowedPredecessor.includes(component)
    )
  }

  const allowedComponents =
    !parent || parent.teiElement === ''
      ? ErfassungsRuleForType(beschreibungsType)?.allowedComponents
      : ErfassungsRuleForComponent(beschreibungsType, parent.teiElement)
          ?.allowedComponents

  return filterSortTranslate(
    ErfassungsRules[beschreibungsType],
    allowedComponents,
    (teiElement) =>
      existingComponentsRemover(
        existingComponents,
        beschreibungsRule
      )(teiElement) &&
      filterForAllowedFollower(teiElement) &&
      filterForAllowedPredecessor(teiElement)
  )
}

export function allowedChildComponentOptions(
  beschreibungsType: string,
  _sidebar: SidebarEintragModel[],
  komponente: SidebarEintragModel
): BeschreibungsKomponenteOption[] {
  const beschreibungsRule = ErfassungsRules[beschreibungsType]
  const { teiElement } = komponente
  const existingComponents = uniqueTeiElements(komponente.children)

  const allowedComponents = ErfassungsRuleForComponent(
    beschreibungsType,
    teiElement
  )?.allowedComponents

  return filterSortTranslate(
    beschreibungsRule,
    allowedComponents,
    existingComponentsRemover(existingComponents, beschreibungsRule)
  )
}

function enhanceChildrenWithPath(element: Element): void {
  element.children.forEach((child) => {
    if (Element.isElement(child)) {
      const { path, level } = element as any
      Object.assign(child, {
        id: uuid(),
        path: path + '-' + child.data_origin,
        level: level + 1,
      })
      enhanceChildrenWithPath(child)
    }
  })
}

export function firstValidPosition(
  beschreibungsType: string,
  siblings: SidebarEintragModel[],
  newElement: string
): number {
  const beschreibungsRule = ErfassungsRules[beschreibungsType]
  if (newElement === TEI_ELEMENT_DECONOTE_FORM && siblings.length === 0) {
    return 1
  }
  const position = siblings.findIndex(
    ({ teiElement }) =>
      beschreibungsRule[newElement].allowedFollower.includes(teiElement) &&
      beschreibungsRule[teiElement].allowedPredecessor.includes(newElement)
  )
  return position >= 0 ? position : siblings.length
}

export function createBeschreibungsComponents(
  beschreibung: SidebarEintragModel,
  beschreibungSubtype: string,
  element: string,
  wrapperExists: boolean,
  isChild: boolean,
  sidebar: SidebarEintragModel[]
): Element {
  let komponente: any
  const relevantForNumberCalculationInIdno = [
    TEI_ELEMENT_PART_FRAGMENT,
    TEI_ELEMENT_PART_BOOKLET,
    TEI_ELEMENT_PART_BINDING,
    TEI_ELEMENT_PART_ACCMAT,
  ]

  if (
    beschreibung.xmlpath &&
    ErfassungsRules[beschreibungSubtype][element].wrapperElement &&
    ErfassungsRules[beschreibungSubtype][
      element
    ].wrapperElement.relevantIn.includes(beschreibung.teiElement) &&
    !wrapperExists
  ) {
    komponente = ErfassungsRuleWrapperFactory(beschreibungSubtype, element)
    komponente.children = [
      ErfassungsRuleDefaultElementFactory(beschreibungSubtype, element),
    ]
    if (!komponente.children[0].children) {
      komponente.children[0].children = ErfassungsRuleDefaultChildrenFactory(
        beschreibungSubtype,
        element
      )
    }
  } else {
    komponente = ErfassungsRuleDefaultElementFactory(
      beschreibungSubtype,
      element
    )
    komponente.children = ErfassungsRuleDefaultChildrenFactory(
      beschreibungSubtype,
      element
    )
  }

  if (komponente) {
    komponente.id = uuid()

    if (
      ErfassungsRules[beschreibungSubtype][beschreibung.teiElement]
        .wrapperElement
    ) {
      komponente.path = beschreibung.xmlpath.replace(
        ErfassungsRules[beschreibungSubtype][beschreibung.teiElement]
          .wrapperElement.data_origin +
          '-' +
          beschreibung.teiElement,
        komponente.data_origin
      )
    } else {
      komponente.path = beschreibung.xmlpath.replace(
        beschreibung.teiElement,
        komponente.data_origin
      )
    }

    if (isChild) {
      komponente.path = beschreibung.xmlpath + '-' + komponente.data_origin
    }

    if (relevantForNumberCalculationInIdno.includes(element)) {
      const idnoElement = komponente.children[0].children[0].children[0]
      idnoElement.text = calculateNextNumberOfComponentsOnSameLevel(
        sidebar,
        beschreibung,
        element,
        isChild
      ).toString()
    }

    komponente.level = beschreibung.level

    enhanceChildrenWithPath(komponente)

    return komponente
  } else {
    throw new DOMException(
      'Can not create new Element',
      'CanNotCreateComponentException'
    )
  }
}

export function isDeletableComponent(
  beschreibungsType: string,
  component: SidebarEintragModel
): boolean {
  return (
    ErfassungsRules[beschreibungsType][component.teiElement].required === false
  )
}
