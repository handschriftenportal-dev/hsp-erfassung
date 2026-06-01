import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { splitIntoWords } from 'src/infrastructure/helper'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

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
  normdatum: Normdatum
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
  normdatum: Normdatum
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
    submittable(state: NormdatumDialogState): boolean {
      return (
        state.view !== 'read' &&
        'normdatum' in state &&
        state.rollen.length > 0 &&
        state.text.trim() !== ''
      )
    },
    deletable(state: NormdatumDialogState): boolean {
      return state.view === 'edit'
    },
    createView(state: NormdatumDialogState): state is CreateDialogState {
      return state.view == 'create'
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
      const normdatenTEIElement =
        NormdatenUtilities.elementToNormdatenTEIElement(element)
      const { dataOrigin, normdatenText, gndIdentifierOption, role } =
        normdatenTEIElement
      return {
        view: 'edit',
        status: 'init',
        type: dataOrigin,
        text: normdatenText,
        identifier: gndIdentifierOption,
        rollen: splitIntoWords(role),
        normdatum: {
          gndIdentifier: gndIdentifierOption,
          preferredName: normdatenText,
        },
      }
    },
    read(element: VolltextNormdatum): ReadDialogStateIdle {
      const normdatenTEIElement =
        NormdatenUtilities.elementToNormdatenTEIElement(element)
      const { dataOrigin, normdatenText, gndIdentifierOption, role } =
        normdatenTEIElement
      return {
        view: 'read',
        status: 'idle',
        type: dataOrigin,
        text: normdatenText,
        identifier: gndIdentifierOption,
        rollen: splitIntoWords(role),
      }
    },
  },
})
