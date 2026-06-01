import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { NeuladenWarnungDialog } from 'src/domain/toolbar/dialog/NeuladenWarnungDialog'
import { WithModal } from 'stories/Decorators'

const meta = {
  title: 'Design System/Dialog/NeuladenWarnungDialog',
  component: NeuladenWarnungDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof NeuladenWarnungDialog>

export default meta
type Story = StoryObj<typeof meta>

export const ErfolgreichesSpeichern: Story = {
  args: {
    onDiscard: () => undefined,
    onSave: () => Promise.resolve({ success: true }),
  },
}

export const FehlschlangendesSpeichern: Story = {
  args: {
    onDiscard: () => undefined,
    onSave: () => Promise.resolve({ success: false }),
  },
}
