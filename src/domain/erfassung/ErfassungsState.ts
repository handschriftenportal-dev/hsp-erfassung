import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Descendant } from 'slate'
import type { Normdatum } from 'src/domain/erfassung/Normdatum'
import { SidebarComponentType } from 'src/domain/sidebar/SidebarComponentType'
import type { SidebarEintragModel } from 'src/domain/sidebar/SidebarEintragFactory'
import { NachweisEvents } from 'src/infrastructure/nachweis/NachweisEvents'
import type { ValidationError } from 'src/infrastructure/nachweis/ValidationResponse'
import type { APICall } from 'src/infrastructure/normdaten/APICall'

import type { AlertMessage } from './AlertMessage'
import type { ChangedComponent } from './ChangedComponent'
import type { Configuration } from './Configuration'
import type { BeschreibungsObject } from './Erfassung'
import { GNDEntityFact } from './GNDEntityFact'
import type { ViewMode } from './ViewMode'
import { isReadOnly, ViewModes } from './ViewMode'

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
  grundsprachen: GNDEntityFact[]
  entstehungsorte: GNDEntityFact[]
  taggableNormdaten: Record<Normdatum, boolean>
}

export const initialState: SliceState = {
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
  grundsprachen: [],
  entstehungsorte: [],
  taggableNormdaten: {
    koerperschaft: true,
    ort: true,
    person: true,
    einband: false,
    buchkunde: false,
    buchschmuck: false,
    initium: true,
    musiknotation: false,
    schriftart: false,
    schreibsprache: false,
    textgattung: false,
    ueberlieferungsform: false,
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
    updateGrundsprachen: (
      state,
      action: PayloadAction<SliceState['grundsprachen']>
    ) => {
      state.grundsprachen = action.payload
    },
    updateEntstehungsorte: (
      state,
      action: PayloadAction<SliceState['entstehungsorte']>
    ) => {
      state.entstehungsorte = action.payload
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
  updateEntstehungsorte,
  updateGrundsprachen,
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
export const selectEntstehungsorte = (state: ReduxState) =>
  state.erfassung.entstehungsorte
export const selectGrundsprachen = (state: ReduxState) =>
  state.erfassung.grundsprachen
export const selectUnbekannteSprache = (state: ReduxState) =>
  state.erfassung.grundsprachen.find(GNDEntityFact.isUnknownLanguage)
export const selectAlertMessage = (state: ReduxState) =>
  state.erfassung.alertMessage
export const isRetroBeschreibung = (state: ReduxState): boolean =>
  state.erfassung.beschreibung.type === 'hsp:description_retro'

export default erfassungsState.reducer
