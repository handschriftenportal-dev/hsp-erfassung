import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { NormdatumDialog } from 'src/domain/editor/dialoge/NormdatumDialog'
import type { Normdatum } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState'
import { WithModal } from 'stories/Decorators'

const meta = {
  title: 'Design System/Dialog/NormdatumDialog',
  component: NormdatumDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof NormdatumDialog>

export default meta
type Story = StoryObj<typeof meta>

const normdatum: Normdatum = {
  gndIdentifier: '118597248',
  preferredName: 'Pythagoras',
}

export const Lesemodus: Story = {
  args: {
    initialState: {
      view: 'read',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'idle',
      text: 'Pythagoras',
      identifier: normdatum.gndIdentifier,
    },
    onAction: console.log,
  },
}

export const BearbeitenModus: Story = {
  args: {
    initialState: {
      view: 'edit',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'idle',
      text: 'Pythagoras',
      normdatum,
    },
    onAction: console.log,
  },
}

export const AnlegenModus: Story = {
  args: {
    initialState: {
      view: 'create',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'filled',
      text: 'Pythagoras',
      normdatum,
    },
    onAction: console.log,
  },
}

export const AnlegenModusLeer: Story = {
  args: {
    initialState: {
      view: 'create',
      type: 'person',
      rollen: [],
      status: 'empty',
      text: 'Pythagoras',
    },
    onAction: console.log,
  },
}
