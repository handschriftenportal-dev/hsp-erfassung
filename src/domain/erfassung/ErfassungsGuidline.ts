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

import {
  BeschreibungsKomponentenRule,
  ComponentTranslation,
  ErfassungsRuleDefaultChildrenFactory,
  ErfassungsRuleDefaultElementFactory,
  ErfassungsRuleForComponent,
  ErfassungsRuleForType,
  ErfassungsRules,
  ErfassungsRuleWrapperFactory
} from './ErfassungRules'
import { BeschreibungsKomponente } from '../sidebar/BeschreibungsKomponenteFactory'
import { createUUID } from '../../infrastructure/XMLConverter'
import { TEI_ELEMENT_PART_FRAGMENT } from '../editor/beschreibungskomponenten/BeschreibungsKomponenteFragment'
import { TEI_ELEMENT_PART_BOOKLET } from '../editor/beschreibungskomponenten/BeschreibungsKomponenteFaszikel'

const UNKOWN_POSITION = 9999

export interface BeschreibungsKomponenteOption {
  element: string
  label: string
}

export function calculateNextNumberOfComponentesOnSameLevel(sidebar: Array<BeschreibungsKomponente>, beschreibung: BeschreibungsKomponente, filter: string, isChild: boolean): any {
  if (isChild) {
    return beschreibung.children.filter(child => child.teiElement === filter).length + 1
  } else {
    const componentParent: BeschreibungsKomponente | undefined = sidebar.find((beschreibungsKomponente: BeschreibungsKomponente) => beschreibung.parent === beschreibungsKomponente.id)

    if (beschreibung.parent === 'root' && !componentParent) {
      return sidebar.filter(child => child.teiElement === filter).length + 1
    } else {
      let children: Array<BeschreibungsKomponente> = []
      sidebar.forEach(beschreibungsKomponente => {
        if (beschreibungsKomponente.children && beschreibungsKomponente.children.length > 0) {
          children = children.concat(beschreibungsKomponente.children)
        }
      })

      if (componentParent !== undefined) {
        return componentParent.children.filter(child => child.teiElement === filter).length + 1
      } else {
        return calculateNextNumberOfComponentesOnSameLevel(children, beschreibung, filter, isChild)
      }
    }
  }
}

export function findComponentPosition(sidebar: Array<BeschreibungsKomponente>, beschreibung: BeschreibungsKomponente, filter: string): number {
  let result = UNKOWN_POSITION
  let children: Array<BeschreibungsKomponente> = []
  const componentParent: BeschreibungsKomponente | undefined = sidebar.find((beschreibungsKomponente: BeschreibungsKomponente) => beschreibung.parent === beschreibungsKomponente.id)

  sidebar.forEach(beschreibungsKomponente => {
    if (beschreibungsKomponente.children && beschreibungsKomponente.children.length > 0) {
      children = children.concat(beschreibungsKomponente.children)
    }
  })

  if (componentParent) {
    result = componentParent.children.filter(child => child.teiElement === filter).indexOf(beschreibung) + 1
  }

  if (result === UNKOWN_POSITION && children && children.length > 0) {
    result = findComponentPosition(children, beschreibung, filter)
  }

  return result
}

export function findComponentById(sidebar: Array<BeschreibungsKomponente>, id: string): BeschreibungsKomponente | undefined {

  let children: Array<BeschreibungsKomponente> = []
  let componentForId: BeschreibungsKomponente | undefined = sidebar.find((beschreibungsKomponente: BeschreibungsKomponente) => beschreibungsKomponente.id === id)

  sidebar.forEach(beschreibungsKomponente => {
    if (beschreibungsKomponente.children && beschreibungsKomponente.children.length > 0) {
      children = children.concat(beschreibungsKomponente.children)
    }
  })

  if (!componentForId && children.length > 0) {
    componentForId = findComponentById(children, id)
  }

  return componentForId
}

export function findFollowingComponentById(sidebar: Array<BeschreibungsKomponente>, beschreibung: BeschreibungsKomponente | undefined) {

  let componentForID: BeschreibungsKomponente | undefined

  if (beschreibung) {
    const index: number = sidebar.indexOf(beschreibung)
    if (index !== -1) {
      const follower = sidebar[(index + 1)]
      if (follower && sidebar[index].id === beschreibung.id) {
        // console.log('Found Follower ' + follower.id)
        componentForID = follower
      }
    } else {
      if (!componentForID) {
        sidebar.forEach(component => {
          if (!componentForID) {
            componentForID = findFollowingComponentById(component.children, beschreibung)
          }
        })
      }
    }
  }
  return componentForID
}

export function findExistingComponents(sidebar: Array<BeschreibungsKomponente>, beschreibung: BeschreibungsKomponente, existing: Array<string>): Array<string> {

  let children: Array<BeschreibungsKomponente> = []

  sidebar.filter(beschreibungsKomponente => beschreibungsKomponente.parent === beschreibung.parent).map(beschreibungsKomponente => beschreibungsKomponente.teiElement)
    .forEach(element => !existing.includes(element) ? existing.push(element) : '')

  sidebar.forEach(beschreibungsKomponent => {
    if (beschreibungsKomponent.children && beschreibungsKomponent.children.length > 0) {
      children = children.concat(beschreibungsKomponent.children)
    }
  })

  if (children.length > 0) {
    findExistingComponents(children, beschreibung, existing)
  }

  return existing
}

export function findAllowedComponentsForComponent(beschreibungsType: string, beschreibung: BeschreibungsKomponente, existingComponents: Array<string>, forChilds: boolean, parent: BeschreibungsKomponente | undefined,
  sameBehind?: boolean): Array<BeschreibungsKomponenteOption> {

  function filterExistingComponents(component: string) {
    const result: boolean = (!existingComponents.includes(component) || (existingComponents.includes(component) && ErfassungsRules[beschreibungsType][component].allowedNumbers !== '1'))
    // console.log('Filter ' + forChilds + ' Existing component ' + component + ' result ' + result)
    return result
  }

  function filterForAllowedFollower(component: string) {

    if (beschreibung.teiElement.includes('msPart') && sameBehind) {
      return component === beschreibung.teiElement
    }

    const result: boolean = forChilds ? true : (ErfassungsRules[beschreibungsType][beschreibung.teiElement].allowedFollower.includes(component))
    // console.log('Filter ' + forChilds + ' AllowedFollower component ' + component + ' result ' + result)
    return result
  }

  function filterForAllowedPredessesscor(component: string) {
    const pre = existingComponents[(existingComponents.indexOf(beschreibung.teiElement) + 1)]
    const result: boolean = pre && !forChilds ? ErfassungsRules[beschreibungsType][pre].allowedPredecessor.includes(component) : true
    // console.log('Filter ' + forChilds + ' AllowedPredessor component ' + component + ' result ' + result + ' Pre TEI Element ' + pre)
    return result
  }

  function findComponents(rule: BeschreibungsKomponentenRule | undefined) {
    if (rule) {
      return rule.allowedComponents
        .filter(filterExistingComponents)
        .filter(filterForAllowedFollower)
        .filter(filterForAllowedPredessesscor).map(element => ({
          element: element,
          label: ComponentTranslation().get(element)
        }) as BeschreibungsKomponenteOption)
    }

    return []
  }

  let rule: BeschreibungsKomponentenRule | undefined

  if (forChilds) {
    rule = ErfassungsRuleForComponent(beschreibungsType, beschreibung.teiElement)
  } else {
    if (!parent || parent.teiElement === '') {
      rule = ErfassungsRuleForType(beschreibungsType)
    } else {
      rule = ErfassungsRuleForComponent(beschreibungsType, parent.teiElement)
    }
  }
  return findComponents(rule)
}

function enhanceChildsWithPath(childs: Record<string, any>, component: any, beschreibung: BeschreibungsKomponente) {
  return childs.forEach((child: Record<string, any>) => {

    child.id = createUUID()
    child.path = component.path + '-' + child.data_origin
    child.level = beschreibung.level

    if (child.children) {
      enhanceChildsWithPath(child.children, child, beschreibung)
    }
  })
}

export function createBeschreibungsComponents(beschreibung: BeschreibungsKomponente, beschreibungSubtype: string, element: string, foundAlreadyExistingWrapper: any, isChild: boolean, sidebar?: any) {
  // console.log('Create new Component ' + element + ' in path ' + beschreibung.xmlpath + ' for type ' + beschreibungSubtype)
  // console.log(beschreibung)

  let component: Record<string, any> | undefined
  let children: Record<string, any> | undefined

  if (beschreibung.xmlpath && ErfassungsRules[beschreibungSubtype][element].wrapperElement &&
      ErfassungsRules[beschreibungSubtype][element].wrapperElement.relevantIn.includes(beschreibung.teiElement) &&
      foundAlreadyExistingWrapper === undefined) {
    console.log('create Component with Wrapper')
    component = ErfassungsRuleWrapperFactory(beschreibungSubtype, element)
    children = [ErfassungsRuleDefaultElementFactory(beschreibungSubtype, element)]
    if (!children[0].children) {
      children[0].children = ErfassungsRuleDefaultChildrenFactory(beschreibungSubtype, element)
    }

  } else {
    console.log('create Component without Wrapper')
    component = ErfassungsRuleDefaultElementFactory(beschreibungSubtype, element)
    children = ErfassungsRuleDefaultChildrenFactory(beschreibungSubtype, element)
  }

  if (component && children) {
    component.id = createUUID()

    if (ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].wrapperElement) {
      component.path = beschreibung.xmlpath
        .replace(ErfassungsRules[beschreibungSubtype][beschreibung.teiElement].wrapperElement.data_origin + '-' + beschreibung.teiElement, component.data_origin)
    } else {
      component.path = beschreibung.xmlpath
        .replace(beschreibung.teiElement, component.data_origin)
    }

    if (isChild) {
      component.componentid = beschreibung.id
      component.path = beschreibung.xmlpath + '-' + component.data_origin
    }

    if ((element === TEI_ELEMENT_PART_FRAGMENT || element === TEI_ELEMENT_PART_BOOKLET) && sidebar) {
      children[0].children[0].children[0].children[0].text = calculateNextNumberOfComponentesOnSameLevel(sidebar, beschreibung, element, isChild).toString()
    }

    component.level = beschreibung.level

    enhanceChildsWithPath(children, component, beschreibung)

    return { component: component, children: children }
  } else {
    throw new DOMException('Can not create new Element', 'CanNotCreateComponentException')
  }
}

export function tryToGetContent(props: any) {
  try {
    return props.element.children[0].children[0].text
  } catch (error) {
    console.error("Error can't find content " + error)
    return ''
  }
}

