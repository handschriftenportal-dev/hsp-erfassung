import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ThemenbereichDialog } from 'src/domain/editor/dialoge/ThemenbereichDialog'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'

const meta = {
  title: 'Benutzertests/Themenbereiche',
  component: ThemenbereichDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof ThemenbereichDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Buchschmuck: Story = {
  args: {
    initialState: ThemenbereichDialogState.new(
      'Benutzertest Buchschmuck',
      'DECO'
    ),
    onSave: console.log,
    onAbort: console.log,
  },
}

export const Einband: Story = {
  args: {
    initialState: ThemenbereichDialogState.new('Benutzertest Einband', 'BNDG'),
    onSave: console.log,
    onAbort: console.log,
  },
}

export const Buchkunde: Story = {
  args: {
    initialState: ThemenbereichDialogState.new(
      'Benutzertest Buchkunde',
      'CODC'
    ),
    onSave: console.log,
    onAbort: console.log,
  },
}

export const Ueberlieferungsform: Story = {
  args: {
    initialState: ThemenbereichDialogState.new(
      'Benutzertest Überlieferungsform',
      'FORM'
    ),
    onSave: console.log,
    onAbort: console.log,
  },
}

export const Schriften: Story = {
  args: {
    initialState: ThemenbereichDialogState.new(
      'Benutzertest Schriften',
      'SCRP'
    ),
    onSave: console.log,
    onAbort: console.log,
  },
}
