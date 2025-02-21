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

import { splitIntoWords } from '../../../../infrastructure/helper'
import { VolltextNormdatum } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { elementToNormdatenTEIElement } from '../dialog/NormdatenDialogUtilities'

export type Normdatum = {
  identifier?: string
  gndIdentifier: string
  preferredName: string
}

const type = {
  person: 'person',
  koerperschaft: 'koerperschaft',
  ort: 'ort',
} as const

const view = {
  read: 'read',
  edit: 'edit',
  create: 'create',
} as const

const status = {
  idle: 'idle',
  init: 'init',
  empty: 'empty',
  search: 'search',
  filled: 'filled',
} as const

interface BaseState {
  type: 'person' | 'koerperschaft' | 'ort'
  rollen: string[]
  text: string
}

interface ReadDialogStateIdle extends BaseState {
  view: 'read'
  status: 'idle'
  identifier: string
}

interface CreateDialogStateEmpty extends BaseState {
  view: 'create'
  status: 'empty'
}

interface CreateDialogStateSearch extends BaseState {
  view: 'create'
  status: 'search'
  search: string
}

interface CreateDialogStateFilled extends BaseState {
  view: 'create'
  status: 'filled'
  normdatum: Normdatum
}

interface EditDialogStateInit extends BaseState {
  view: 'edit'
  status: 'init'
  identifier: string
}

interface EditDialogStateIdle extends BaseState {
  view: 'edit'
  status: 'idle'
  normdatum: Normdatum
}

interface EditDialogStateSearch extends BaseState {
  view: 'edit'
  status: 'search'
  search: string
  normdatum?: Normdatum
}

export type ReadDialogState = ReadDialogStateIdle
export type CreateDialogState =
  | CreateDialogStateEmpty
  | CreateDialogStateFilled
  | CreateDialogStateSearch
export type EditDialogState =
  | EditDialogStateInit
  | EditDialogStateIdle
  | EditDialogStateSearch

export type NormdatumDialogState =
  | ReadDialogState
  | CreateDialogState
  | EditDialogState

export const NormdatumDialogState = Object.freeze({
  status,
  type,
  view,
  is: {
    submittable(state: NormdatumDialogState) {
      return (
        state.view !== 'read' &&
        'normdatum' in state &&
        state.rollen.length > 0 &&
        state.text.trim() !== ''
      )
    },
    deletable(state: NormdatumDialogState) {
      return state.view === 'edit'
    },
  },
  new: {
    create(type: BaseState['type'], text: string = ''): CreateDialogState {
      if (text === '') {
        return {
          type,
          text,
          view: 'create',
          status: 'empty',
          rollen: [],
        }
      } else {
        return {
          type,
          text,
          search: text,
          view: 'create',
          status: 'search',
          rollen: [],
        }
      }
    },
    edit(element: VolltextNormdatum): EditDialogStateInit {
      const normdatenTEIElement = elementToNormdatenTEIElement(element)
      const { dataOrigin, normdatenText, gndIdentifierOption, role } =
        normdatenTEIElement
      return {
        view: 'edit',
        status: 'init',
        type: dataOrigin as any,
        text: normdatenText,
        identifier: gndIdentifierOption,
        rollen: splitIntoWords(role),
      }
    },
    read(element: VolltextNormdatum): ReadDialogStateIdle {
      const normdatenTEIElement = elementToNormdatenTEIElement(element)
      const { dataOrigin, normdatenText, gndIdentifierOption, role } =
        normdatenTEIElement
      return {
        view: 'read',
        status: 'idle',
        type: dataOrigin as any,
        text: normdatenText,
        identifier: gndIdentifierOption,
        rollen: splitIntoWords(role),
      }
    },
  },
})
