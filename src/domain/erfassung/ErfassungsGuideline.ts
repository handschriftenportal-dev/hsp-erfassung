import { uniq } from 'lodash'
import { Element } from 'slate'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { v4 as uuid } from 'uuid'

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

function uniqueTeiElements(komponenten: SidebarEintragModel[]): Komponente[] {
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
): Komponente[] {
  const { parentId } = komponente
  if (parentId === 'root') {
    return uniqueTeiElements(sidebar)
  }
  const parent = findComponentById(sidebar, parentId)
  return parent !== undefined ? uniqueTeiElements(parent.children) : []
}

export function existingComponentsRemover(existingComponents: Komponente[]) {
  const lookup = new Set(existingComponents)
  return function filterRemove(komponente: Komponente) {
    return (
      !lookup.has(komponente) ||
      ErfassungsRegeln.komponentenRegel(komponente).allowedNumbers !== '1'
    )
  }
}

export function filterSortTranslate(
  components: Readonly<Komponente[]>,
  filterFn: (teiElement: Komponente) => boolean = () => true
): BeschreibungsKomponenteOption[] {
  return components
    .filter(filterFn)
    .sort(ErfassungsRegeln.komponentenReihenfolge)
    .map((element) => ({
      element,
      label: ErfassungsRegeln.komponentenLabel(element),
    }))
}

export function allowedFollowerComponentOptions(
  sidebar: SidebarEintragModel[],
  komponente: SidebarEintragModel
): BeschreibungsKomponenteOption[] {
  const { teiElement } = komponente
  const existingComponents = uniqueSiblingComponents(sidebar, komponente)
  const parent = findComponentById(sidebar, komponente.parentId)

  function filterForAllowedFollower(component: Komponente): boolean {
    const sameBehind =
      teiElement === findFollowingComponentById(sidebar, komponente)?.teiElement
    if (teiElement.includes('msPart') && sameBehind) {
      return component === teiElement
    }
    return ErfassungsRegeln.komponentenRegel(
      teiElement
    ).allowedFollower.includes(component)
  }

  function filterForAllowedPredecessor(component: Komponente): boolean {
    const follower =
      existingComponents[existingComponents.indexOf(teiElement) + 1]
    return (
      !follower ||
      ErfassungsRegeln.komponentenRegel(follower).allowedPredecessor.includes(
        component
      )
    )
  }

  const allowedComponents = !parent
    ? ErfassungsRegeln.rootKomponenten()
    : ErfassungsRegeln.komponentenRegel(parent.teiElement).allowedComponents

  return filterSortTranslate(
    allowedComponents,
    (teiElement) =>
      existingComponentsRemover(existingComponents)(teiElement) &&
      filterForAllowedFollower(teiElement) &&
      filterForAllowedPredecessor(teiElement)
  )
}

export function allowedChildComponentOptions(
  _sidebar: SidebarEintragModel[],
  komponente: SidebarEintragModel
): BeschreibungsKomponenteOption[] {
  const { teiElement } = komponente
  const existingComponents = uniqueTeiElements(komponente.children)

  return filterSortTranslate(
    ErfassungsRegeln.komponentenRegel(teiElement as Komponente)
      .allowedComponents,
    existingComponentsRemover(existingComponents)
  )
}

function enhanceChildrenWithPath(element: Element): void {
  element.children.forEach((child) => {
    if (Element.isElement(child)) {
      const { path = '', level = 0 } = element
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
  siblings: SidebarEintragModel[],
  newElement: Komponente
): number {
  if (newElement === TEI_ELEMENT_DECONOTE_FORM && siblings.length === 0) {
    return 1
  }
  const position = siblings.findIndex(
    ({ teiElement }) =>
      ErfassungsRegeln.komponentenRegel(newElement).allowedFollower.includes(
        teiElement
      ) &&
      ErfassungsRegeln.komponentenRegel(teiElement).allowedPredecessor.includes(
        newElement
      )
  )
  return position >= 0 ? position : siblings.length
}

const relevantForNumberCalculationInIdno = new Set([
  TEI_ELEMENT_PART_FRAGMENT,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_ACCMAT,
])

export function createBeschreibungsComponents(
  beschreibung: SidebarEintragModel,
  element: Komponente,
  wrapperExists: boolean,
  isChild: boolean,
  sidebar: SidebarEintragModel[]
): Element {
  let komponente: Element | undefined

  if (
    beschreibung.xmlpath &&
    ErfassungsRegeln.komponentenRegel(
      element
    ).wrapperElement?.inKomponente?.has(beschreibung.teiElement) &&
    !wrapperExists
  ) {
    komponente = ErfassungsRegeln.wrappedElement(element)
  } else {
    komponente = ErfassungsRegeln.komponenteElement(element)
  }

  if (komponente) {
    komponente.id = uuid()

    komponente.path = newPath(beschreibung, komponente.data_origin)

    if (isChild) {
      komponente.path = beschreibung.xmlpath + '-' + komponente.data_origin
    }

    if (relevantForNumberCalculationInIdno.has(element)) {
      const idnoElement = HSPNode.findFirstText(komponente)

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

function newPath(beschreibung: SidebarEintragModel, origin: string) {
  const { teiElement, xmlpath } = beschreibung
  const { wrapperElement } = ErfassungsRegeln.komponentenRegel(teiElement)
  const searchValue =
    wrapperElement !== undefined
      ? wrapperElement.data_origin + '-' + teiElement
      : teiElement
  return xmlpath.replace(searchValue, origin)
}

export function isDeletableComponent(component: SidebarEintragModel): boolean {
  return !ErfassungsRegeln.komponentenRegel(component.teiElement).required
}
