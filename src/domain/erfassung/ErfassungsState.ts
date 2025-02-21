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

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Descendant } from 'slate'

import { NachweisEvents } from '../../infrastructure/nachweis/NachweisEvents'
import { ValidationError } from '../../infrastructure/nachweis/ValidationResponse'
import { APICall } from '../../infrastructure/normdaten/APICall'
import { SidebarComponentType } from '../sidebar/SidebarComponentType'
import { SidebarEintragModel } from '../sidebar/SidebarEintragFactory'
import { AlertMessage } from './AlertMessage'
import { ChangedComponent } from './ChangedComponent'
import { Configuration } from './Configuration'
import { BESCHREIBUNG_DEFAULT_SUBTYPE, BeschreibungsObject } from './Erfassung'
import { GNDEntityFact } from './GNDEntityFact'
import { Normdatum } from './Normdatum'
import { isReadOnly, ViewMode, ViewModes } from './ViewMode'

type SliceState = {
  slateValue: Descendant[]
  sidebarComponentType: SidebarComponentType
  sidebarValue: SidebarEintragModel[]
  validationState: ValidationError[]
  alertMessage?: AlertMessage
  beschreibung: BeschreibungsObject
  configuration: Configuration
  mode: ViewMode
  expandSelectedAccordionWithNestedAccordions: string
  collapseAccordionsByIds: string[]
  componentChangedHistory: ChangedComponent[]
  flags: {
    applicationBusy: boolean
    isFullscreen: boolean
  }
  unsavedDocument: boolean
  expandAllComponents: boolean
  loadSidebar: boolean
  saveAllowed: {
    allowed: boolean
    errorMessage: string
  }
  contentChanged: boolean
  normdaten: Record<string, APICall<GNDEntityFact>>
  taggableNormdaten: Record<Normdatum, boolean>
}

const initialState: SliceState = {
  slateValue: [
    {
      data_origin: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
  sidebarComponentType: SidebarComponentType.struktur,
  sidebarValue: [
    {
      id: '',
      label: 'sidebar.head',
      teiElement: 'head',
      children: [],
      path: [0, 0],
      xmlpath: '',
      level: 0,
      parentId: '',
      wrapperId: '',
    },
  ],
  validationState: [],
  beschreibung: {
    id: '',
    kodid: '',
    kodsignaturen: [],
    signature: '',
    subtype: '',
    type: 'hsp:description',
  },
  configuration: {
    authorizationToken: '',
    startInReadOnly: false,
    beschreibungsUrl: '',
    workspaceUrl: '',
    validationUrl: '',
    normdatenUrl: '',
    isEditable: false,
    standalone: true,
    language: 'de',
  },
  mode: ViewModes.preview,
  expandSelectedAccordionWithNestedAccordions: '',
  collapseAccordionsByIds: [],
  componentChangedHistory: [],
  flags: {
    applicationBusy: false,
    isFullscreen: false,
  },
  unsavedDocument: false,
  expandAllComponents: true,
  loadSidebar: false,
  saveAllowed: {
    allowed: true,
    errorMessage: '',
  },
  contentChanged: false,
  normdaten: {},
  taggableNormdaten: {
    koerperschaft: true,
    ort: true,
    person: true,
    einband: false,
    buchkunde: false,
    buchschmuck: false,
    initium: false,
    musiknotation: false,
    schriftart: false,
    sprache: false,
    textgattung: false,
  },
}

export const erfassungsState = createSlice({
  name: 'erfassung',
  initialState,
  reducers: {
    updateSlate: (state, action: PayloadAction<SliceState['slateValue']>) => {
      if (
        !isReadOnly(state.mode) &&
        !state.unsavedDocument &&
        state.contentChanged
      ) {
        state.unsavedDocument = true
      }
      state.slateValue = action.payload
    },
    updateConfiguration: (
      state,
      action: PayloadAction<Partial<SliceState['configuration']>>
    ) => {
      state.configuration = Object.assign(
        {},
        state.configuration,
        action.payload
      )
    },
    updateAlertMessage: (
      state,
      action: PayloadAction<SliceState['alertMessage']>
    ) => {
      state.alertMessage = action.payload
    },
    updateMode: (state, action: PayloadAction<SliceState['mode']>) => {
      if (isReadOnly(action.payload) || state.configuration.isEditable) {
        state.mode = action.payload
      }
    },
    updateSidebarComponentType(
      state,
      action: PayloadAction<SliceState['sidebarComponentType']>
    ) {
      state.sidebarComponentType = action.payload
    },
    updateSidebar: (
      state,
      action: PayloadAction<SliceState['sidebarValue']>
    ) => {
      state.sidebarValue = action.payload
    },
    updateValidationState: (
      state,
      action: PayloadAction<SliceState['validationState']>
    ) => {
      state.validationState = action.payload
    },
    readDocument: (state, _action: PayloadAction<void>) => {
      if (!isReadOnly(state.mode)) {
        state.mode = ViewModes.preview
        NachweisEvents.beschreibungLesen()
      }
    },
    writeDocument: (state, _action: PayloadAction<void>) => {
      if (isReadOnly(state.mode)) {
        state.mode = ViewModes.edit
        NachweisEvents.beschreibungBearbeiten()
      }
    },
    saveDocument: (state, _action: PayloadAction<void>) => {
      state.unsavedDocument = false
      state.contentChanged = false
      NachweisEvents.beschreibungSpeichern()
    },
    updateStandalone: (
      state,
      action: PayloadAction<SliceState['configuration']['standalone']>
    ) => {
      state.configuration.standalone = action.payload
    },
    updateExpandAllComponents: (state, action: PayloadAction<boolean>) => {
      state.expandAllComponents = action.payload
    },
    updateExpandSelectedAccordionWithNestedAccordions: (
      state,
      action: PayloadAction<
        SliceState['expandSelectedAccordionWithNestedAccordions']
      >
    ) => {
      state.expandSelectedAccordionWithNestedAccordions = action.payload
    },
    updateCollapseAccordionsByIds: (
      state,
      action: PayloadAction<SliceState['collapseAccordionsByIds']>
    ) => {
      state.collapseAccordionsByIds = action.payload
    },
    updateBeschreibung: (
      state,
      action: PayloadAction<Partial<SliceState['beschreibung']>>
    ) => {
      state.beschreibung = { ...state.beschreibung, ...action.payload }
    },
    updateSaveAllowed: (
      state,
      action: PayloadAction<SliceState['saveAllowed']>
    ) => {
      state.saveAllowed = action.payload
    },
    updateContentChanged: (
      state,
      action: PayloadAction<SliceState['contentChanged']>
    ) => {
      state.contentChanged = action.payload
    },
    updateComponentChangedHistory: (
      state,
      action: PayloadAction<ChangedComponent>
    ) => {
      state.componentChangedHistory.push(action.payload)
    },
    updateApplicationBusy: (
      state,
      action: PayloadAction<SliceState['flags']['applicationBusy']>
    ) => {
      state.flags.applicationBusy = action.payload
    },
    updateNormdatum: (
      state,
      action: PayloadAction<[string, APICall<GNDEntityFact>]>
    ) => {
      const [id, value] = action.payload
      state.normdaten[id] = value
    },
    updateIsFullscreen: (
      state,
      action: PayloadAction<SliceState['flags']['isFullscreen']>
    ) => {
      state.flags.isFullscreen = action.payload
    },
    updateTaggableNormdaten: (
      state,
      action: PayloadAction<Partial<SliceState['taggableNormdaten']>>
    ) => {
      state.taggableNormdaten = {
        ...state.taggableNormdaten,
        ...action.payload,
      }
    },
  },
})

export const {
  updateSlate,
  updateConfiguration,
  updateMode,
  updateSidebar,
  updateSidebarComponentType,
  updateValidationState,
  readDocument,
  writeDocument,
  updateStandalone,
  saveDocument,
  updateBeschreibung,
  updateSaveAllowed,
  updateExpandAllComponents,
  updateExpandSelectedAccordionWithNestedAccordions,
  updateCollapseAccordionsByIds,
  updateContentChanged,
  updateComponentChangedHistory,
  updateApplicationBusy,
  updateNormdatum,
  updateIsFullscreen,
  updateAlertMessage,
  updateTaggableNormdaten,
} = erfassungsState.actions

type ReduxState = {
  erfassung: SliceState
}

export const selectSlateState = (state: ReduxState) =>
  state.erfassung.slateValue
export const selectTaggableNormdaten = (state: ReduxState) =>
  state.erfassung.taggableNormdaten
export const selectSidebarComponentType = (state: ReduxState) =>
  state.erfassung.sidebarComponentType
export const selectSidebarState = (state: ReduxState) =>
  state.erfassung.sidebarValue
export const selectValidationState = (state: ReduxState) =>
  state.erfassung.validationState
export const selectMode = (state: ReduxState): ViewMode => state.erfassung.mode
export const selectReadOnly = (state: ReduxState) =>
  isReadOnly(state.erfassung.mode)
export const selectConfiguration = (state: ReduxState): Configuration =>
  state.erfassung.configuration
export const selectUnsavedDocument = (state: ReduxState) =>
  state.erfassung.unsavedDocument
export const selectExpandAllComponents = (state: ReduxState): boolean =>
  state.erfassung.expandAllComponents
export const selectBeschreibung = (state: ReduxState) =>
  state.erfassung.beschreibung
export const selectBeschreibungsSubtype = (state: ReduxState) =>
  state.erfassung.beschreibung?.subtype || BESCHREIBUNG_DEFAULT_SUBTYPE
export const selectSaveAllowed = (state: ReduxState) =>
  state.erfassung.saveAllowed
export const selectExpandSelectedAccordionWithNestedAccordions = (
  state: ReduxState
) => state.erfassung.expandSelectedAccordionWithNestedAccordions
export const selectCollapseAccordionsByIds = (state: ReduxState) =>
  state.erfassung.collapseAccordionsByIds
export const selectComponentChangedHistory = (state: ReduxState) =>
  state.erfassung.componentChangedHistory
export const selectApplicationBusy = (state: ReduxState) =>
  state.erfassung.flags.applicationBusy
export const selectNormdaten = (state: ReduxState) => state.erfassung.normdaten
export const selectIsFullscreen = (state: ReduxState) =>
  state.erfassung.flags.isFullscreen
export const selectAlertMessage = (state: ReduxState) =>
  state.erfassung.alertMessage
export default erfassungsState.reducer
