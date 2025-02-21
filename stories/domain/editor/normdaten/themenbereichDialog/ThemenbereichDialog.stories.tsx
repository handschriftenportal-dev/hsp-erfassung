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

import { Meta, StoryObj } from '@storybook/react'

import { ThemenbereichDialog } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialog'
import { ThemenbereichDialogReducer } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../../../../../src/domain/editor/normdaten/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from '../../../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../../../../test/infrastructure/normdaten/fixtures/einband.json'
import { WithThemenbereichAPI } from '../../../../Decorators'

const einband = subjectArea.data.findSubjectArea
const api = ThemenbereicheAPI.new('de')
api.addSubjectArea(einband)
const initialState = ThemenbereichDialogState.new(
  'Zeitgenössischer Einband',
  'BNDG'
)
const withSelection = ThemenbereichDialogReducer(initialState, {
  type: 'addBegriffe',
  payload: [
    'NORM-15d0ffbf-2df1-38b9-9a3a-ad51304eef6c',
    'NORM-49cc3d7b-1287-3b14-8c52-5475851261c5',
    'NORM-70dab0c2-254a-31dd-b940-9f4957d356ad',
    'NORM-1b8d5c1e-9b0c-3de0-8f34-21c6b8f5ef3d',
  ],
})

const errorState = ThemenbereichDialogState.new(
  'Falsche Notation',
  'XXXXXXXXXX'
)
const withLongSelection = {
  ...initialState,
  auswahl: [
    'NORM-56498745-5a67-38e7-a575-2a29e3f28eba',
    'NORM-44703e90-d2d2-3258-8bcf-725a4fed7a4d',
    'NORM-53ef5994-5350-34a2-a3c6-a79f555e2b06',
  ],
  collapsed: new Set([
    'NORM-55017133-2224-3001-913e-3b61626f92ae',
    'NORM-21d862ca-c205-346c-87a7-d703b8b96af6',
    'NORM-53ef5994-5350-34a2-a3c6-a79f555e2b06',
    'NORM-7080406a-dcf1-3950-b665-a8bf22014b1b',
  ]),
}

const meta = {
  title: 'Design System/Dialog/ThemenbereichDialog',
  component: ThemenbereichDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithThemenbereichAPI(api)],
} satisfies Meta<typeof ThemenbereichDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialState,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const MitAusgewaehltenBegriffen: Story = {
  args: {
    initialState: withSelection,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const MitLangerAusgewaehltenTexten: Story = {
  args: {
    initialState: withLongSelection,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const SucheNotation: Story = {
  args: {
    initialState: { ...withSelection, suche: 'BNDG-B' },
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const FehlerhafteNotation: Story = {
  args: {
    initialState: errorState,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}
export const ReadOnly: Story = {
  args: {
    initialState: { ...withSelection, readOnly: true },
  },
}
