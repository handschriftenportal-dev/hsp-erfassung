import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { HilfeButton } from 'src/domain/editor/beschreibungskomponenten/hilfetexte'

/**
 * UI Element, um Hilfetext anzuzeigen und auszublenden. Dies ist eine von
 * HilfeText getrennte Komponente, da beide im Design innerhalb
 * unterschiedlicher Container liegen können
 */
const meta = {
  title: 'Design System/Hilfe/HilfeButton',
  component: HilfeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof HilfeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Normalzustand: Story = {
  args: {},
}

export const Fokussiert: Story = {
  args: {
    activated: true,
  },
}
