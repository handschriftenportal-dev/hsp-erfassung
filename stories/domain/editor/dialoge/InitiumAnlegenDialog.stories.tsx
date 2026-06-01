import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { InitiumAnlegenDialog } from 'src/domain/editor/dialoge/InitiumAnlegenDialog'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import { WithModal } from 'stories/Decorators'
import initien from 'test/infrastructure/normdaten/fixtures/initien.json'

const meta = {
  title: 'Design System/Dialog/InitiumAnlegenDialog',
  component: InitiumAnlegenDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof InitiumAnlegenDialog>

export default meta
type Story = StoryObj<typeof meta>

const baseState = InitiumAnlegenDialogState.initialState('Alea iacta est', {
  id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
  gndIdentifier: null,
  preferredName: 'unbekannt',
  typeName: 'Language',
  identifier: [],
  variantName: [],
})

export const InitiumEingeben: Story = {
  args: {
    initialState: baseState,
    onSave: console.log,
    onCancel: console.log,
  },
}

export const InitiumAnlegenFehler: Story = {
  args: {
    initialState: {
      ...baseState,
      type: 'error',
      message: 'An error occured',
    },
    onSave: console.log,
    onCancel: console.log,
  },
}

export const InitiumDoppelteInitienAufloesen: Story = {
  args: {
    initialState: {
      ...baseState,
      type: 'resolving_duplicates',
      duplicates: initien.data.findInitia.items.slice(0, 10),
    },
    onSave: console.log,
    onCancel: console.log,
  },
}

export const InitiumUnbekannteSpracheBestaetigen: Story = {
  args: {
    initialState: {
      ...baseState,
      type: 'confirming_unknown_language',
    },
    onSave: console.log,
    onCancel: console.log,
  },
}
