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

import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Element } from 'slate'
import { v4 as uuid } from 'uuid'

import { ChangedComponent, EDIT_NODE } from '../../erfassung/ChangedComponent'
import { updateComponentChangedHistory } from '../../erfassung/ErfassungsState'
import { GNDEntityFact } from '../../erfassung/GNDEntityFact'

export function useTextelementChangedForSidebarEvent(element: Element): void {
  const dispatch = useDispatch()
  useEffect(() => {
    const { data_origin, id } = element as any
    dispatch(
      updateComponentChangedHistory({
        dataOrigin: data_origin,
        method: EDIT_NODE,
        id: id,
      } as ChangedComponent)
    )
  }, [element])
}

export function createOptionLabel(option: GNDEntityFact): string {
  const { preferredName, gndIdentifier } = option
  if (preferredName && gndIdentifier) {
    return `${preferredName} ${gndIdentifier}`
  }
  if (gndIdentifier) {
    return gndIdentifier
  }
  if (preferredName) {
    return preferredName
  }
  return ''
}

export function createElementWithRandomIds(template: Element): Element {
  return Object.assign(cloneDeep(template), { id: uuid() })
}

export function getChildrenElementByDataType(
  childrenArray: any,
  dataType: string,
  childPosForTemplate?: number
) {
  for (const element of childrenArray) {
    if (element.data_type === dataType) {
      if (childPosForTemplate === 0 || childPosForTemplate) {
        return cloneDeep(element.children[childPosForTemplate])
      }
      return cloneDeep(element)
    }
  }
  return null
}

export function setRandomIdsForTemplate(templateElement: any) {
  templateElement.id = uuid()
  templateElement.children.forEach((term: any) => {
    term.id = uuid()
  })
}

export function getOptionStr(option: string) {
  const EMPTY_VALUE = 'empty_value'

  const str = option.toString()
  if (str === '') return EMPTY_VALUE
  return str.replace(/ /g, '_')
}
