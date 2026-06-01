import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ThemenbereichDialog } from 'src/domain/editor/dialoge/ThemenbereichDialog'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { ThemenbereichDialogReducer } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'

const initialState = ThemenbereichDialogState.new(
  'Zeitgenössischer Einband',
  'BNDG'
)
const withSelection = ThemenbereichDialogReducer(initialState, {
  type: 'addBegriffe',
  payload: [
    { id: 'NORM-15d0ffbf-2df1-38b9-9a3a-ad51304eef6c' },
    { id: 'NORM-49cc3d7b-1287-3b14-8c52-5475851261c5' },
    { id: 'NORM-70dab0c2-254a-31dd-b940-9f4957d356ad' },
    { id: 'NORM-1b8d5c1e-9b0c-3de0-8f34-21c6b8f5ef3d' },
  ],
})

const errorState = ThemenbereichDialogState.new(
  'Falsche Notation',
  'XXXXXXXXXX'
)
const withLongSelection = {
  ...initialState,
  auswahl: [
    { id: 'NORM-56498745-5a67-38e7-a575-2a29e3f28eba' },
    { id: 'NORM-44703e90-d2d2-3258-8bcf-725a4fed7a4d' },
    { id: 'NORM-53ef5994-5350-34a2-a3c6-a79f555e2b06' },
  ],
  collapsed: new Set([
    'NORM-55017133-2224-3001-913e-3b61626f92ae',
    'NORM-21d862ca-c205-346c-87a7-d703b8b96af6',
    'NORM-53ef5994-5350-34a2-a3c6-a79f555e2b06',
    'NORM-7080406a-dcf1-3950-b665-a8bf22014b1b',
  ]),
}

const withUnknownConcept = {
  ...initialState,
  auswahl: [{ id: 'NORM-00000000-0000-0000-0000-000000000000' }],
  collapsed: new Set([]),
}

const notwendig = [
  'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
  'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
]
const optional = ['NORM-ac703c4f-45c9-3940-9def-d71b8e5b5fc3']

const withFachbegriffOptional = {
  ...initialState,
  auswahl: [
    AuswahlItem.newFachbegriffItem(
      'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
      {
        notwendig,
        optional,
      }
    ),
  ],
  collapsed: new Set(['NORM-a28cc090-2db2-3621-988b-a61bc197a2cc']),
}

const einzelAuswahlMengen = [
  {
    id: '1111',
    elemente: [
      'NORM-6fbf881d-dc24-3548-a088-5b547a14a9e3',
      'NORM-44703e90-d2d2-3258-8bcf-725a4fed7a4d',
    ],
  },
  {
    id: '2222',
    elemente: [
      'NORM-5271c031-82cb-342a-85a1-811d827c9cfe',
      'NORM-68230ccf-dc08-3ccf-bdf0-6e558ba29b48',
      'NORM-1a8d45b0-6036-3668-bc46-3cdd100b265a',
    ],
  },
]
const mehrfachAuswahlMengen = [
  {
    id: '3333',
    elemente: [
      'NORM-d5201867-c794-3548-98c7-65ef52848a41',
      'NORM-b419518a-8e55-3424-a93f-12b553b8b679',
      'NORM-434c5521-b635-3e8d-ba76-e36e129cc516',
      'NORM-3545f756-1288-3ef9-ac0b-76f1cbf803d8',
      'NORM-7a13baa1-59c3-3ba1-85f7-eb87b7b0f9bd',
    ],
  },
  {
    id: '4444',
    elemente: [
      'NORM-ac703c4f-45c9-3940-9def-d71b8e5b5fc3',
      'NORM-1a02603b-bc5d-323d-869d-0e33d83a1412',
      'NORM-6fe20019-6bec-344a-b06d-fe6145db0c79',
    ],
  },
]

const withFachbegriffEinzelauswahl = {
  ...initialState,
  auswahl: [
    AuswahlItem.newFachbegriffItem(
      'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
      {
        notwendig,
        einzelAuswahlMengen,
      }
    ),
  ],
  collapsed: new Set(['NORM-a28cc090-2db2-3621-988b-a61bc197a2cc']),
}

const withFachbegriffMehrfachauswahl = {
  ...initialState,
  auswahl: [
    AuswahlItem.newFachbegriffItem(
      'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
      {
        notwendig,
        mehrfachAuswahlMengen,
      }
    ),
  ],
  collapsed: new Set(['NORM-a28cc090-2db2-3621-988b-a61bc197a2cc']),
}

const meta = {
  title: 'Design System/Dialog/ThemenbereichDialog',
  component: ThemenbereichDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof ThemenbereichDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialState,
    onSave: console.log,
    onAbort: console.log,
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

export const MitFachbegriffOptional: Story = {
  args: {
    initialState: withFachbegriffOptional,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const MitFachbegriffEinzelauswahl: Story = {
  args: {
    initialState: withFachbegriffEinzelauswahl,
    onSave: console.log,
    onAbort: console.log,
    onDelete: console.log,
  },
}

export const MitFachbegriffMehrfachauswahl: Story = {
  args: {
    initialState: withFachbegriffMehrfachauswahl,
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

export const UnbekannteBegriffe: Story = {
  args: {
    initialState: withUnknownConcept,
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
