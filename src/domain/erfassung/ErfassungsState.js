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

import { createSlice } from '@reduxjs/toolkit'
import {
  BeschreibungBearbeitenEvent,
  BeschreibungLesenEvent,
  BeschreibungSpeichernEvent,
  sendNachweisEventToDocument
} from '../../infrastructure/nachweis/NachweisServiceAdapter'

export const erfassungsState = createSlice({
  name: 'erfassung',
  initialState: {
    slateValue: [{
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    }],
    sidebarValue: [{
      id: '',
      label: 'Kopf',
      teiElement: 'head',
      children: [],
      path: [0, 0]
    }],
    validationState: {
      valid: true,
      errorMessage: 'No Error',
    },
    beschreibung: {
      id: '',
      kodid: '',
      kodsignaturen: [],
      subtype: ''
    },
    expandSelectedAccordionWithNestedAccordions: {
      id: '',
    },
    collapseAccordionsByIds: {
      ids: []
    },
    componentChangedHistory: [
      { dataOrigin: '', method: '', id: '' }
    ],
    readOnly: true,
    standalone: true,
    unsavedDocument: false,
    showtei: false,
    expandAllComponents: false,
    positionChanged: false,
    loadsidebar: false,
    saveAllowed: true,
    contentChanged: false
  },
  reducers: {
    updateSlate: (state, action) => {
      if (!state.readOnly && !state.unsavedDocument && state.contentChanged) {
        state.unsavedDocument = true
      }
      state.slateValue = action.payload
    },
    updateSidebar: (state, action) => {
      state.sidebarValue = action.payload
    },
    updateValidationState: (state, action) => {
      state.validationState = action.payload
    },
    readDocument: (state, action) => {
      if (!state.readOnly) {
        state.readOnly = true
        sendNachweisEventToDocument(BeschreibungLesenEvent, {})
      }
    },
    writeDocument: (state, action) => {
      if (state.readOnly) {
        state.readOnly = false
        sendNachweisEventToDocument(BeschreibungBearbeitenEvent, {})
      }
    },
    saveDocument: (state, action) => {
      state.unsavedDocument = false
      state.contentChanged = false
      sendNachweisEventToDocument(BeschreibungSpeichernEvent, {})
    },
    enableStandalone: (state, action) => {
      if (!action.payload) {
        state.standalone = true
      }
    },
    disableStandalone: (state, action) => {
      if (action.payload) {
        state.standalone = false
      }
    },
    disableShowTei: (state, action) => {
      state.showtei = false
    },
    enableShowTei: (state, action) => {
      state.showtei = true
    },
    updatePosition: (state, action) => {
      state.positionChanged = action
    },
    updateExpandAllComponents: (state, action) => {
      state.expandAllComponents = action.payload
    },
    updateExpandSelectedAccordionWithNestedAccordions: (state, action) => {
      state.expandSelectedAccordionWithNestedAccordions = action.payload
    },
    updateCollapseAccordionsByIds: (state, action) => {
      state.collapseAccordionsByIds = action.payload
    },
    updateBeschreibung: (state, action) => {
      state.beschreibung = { ...state.beschreibung, ...action.payload }
    },
    updateLoadSidebar: (state, action) => {
      state.loadSidebar = !state.loadSidebar
    },
    updateSaveAllowed: (state, action) => {
      state.saveAllowed = action.payload
    },
    updateContentChanged: (state, action) => {
      state.contentChanged = action.payload
    },
    updateComponentChangedHistory: (state, action) => {
      state.componentChangedHistory.push(action.payload)
    },
  }
})

export const {
  updateSlate,
  updateSidebar,
  updateValidationState,
  readDocument,
  writeDocument,
  enableStandalone,
  disableStandalone,
  saveDocument,
  enableShowTei,
  disableShowTei,
  updatePosition,
  updateBeschreibung,
  updateLoadSidebar,
  updateSaveAllowed,
  updateExpandAllComponents,
  updateExpandSelectedAccordionWithNestedAccordions,
  updateCollapseAccordionsByIds,
  updateContentChanged,
  updateComponentChangedHistory
} = erfassungsState.actions

export const selectSlateState = state => state.erfassung.slateValue
export const selectSidebarState = state => state.erfassung.sidebarValue
export const selectReadOnly = state => state.erfassung.readOnly
export const selectStandalone = state => state.erfassung.standalone
export const selectUnsavedDocument = state => state.erfassung.unsavedDocument
export const selectShowTei = state => state.erfassung.showtei
export const selectPositionChanged = state => state.erfassung.positionChanged
export const selectExpandAllComponents = state => state.erfassung.expandAllComponents
export const selectBeschreibung = state => state.erfassung.beschreibung
export const selectLoadSidebar = state => state.erfassung.loadSidebar
export const selectSaveAllowed = state => state.erfassung.saveAllowed
export const selectExpandSelectedAccordionWithNestedAccordions = state => state.erfassung.expandSelectedAccordionWithNestedAccordions
export const selectCollapseAccordionsByIds = state => state.erfassung.collapseAccordionsByIds
export const selectComponentChangedHistory = state => state.erfassung.componentChangedHistory
export default erfassungsState.reducer
