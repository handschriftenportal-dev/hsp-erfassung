import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { HilfeText } from 'src/domain/editor/beschreibungskomponenten/hilfetexte'

/**
 * UI Element, um Hilfetext anzuzeigen. Setzt HTML nicht-escaped ein.
 * Vorsicht: Darf aus Sicherheitsgründen nur Text aus einer sicheren Quelle
 * einsetzen!
 */
const meta = {
  title: 'Design System/Hilfe/HilfeText',
  component: HilfeText,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    helpText: {
      control: 'text',
      description: 'Ein beliebiger HTML valider Text',
    },
  },
} satisfies Meta<typeof HilfeText>

export default meta
type Story = StoryObj<typeof meta>

export const HTMLText: Story = {
  args: {
    helpText: 'Lorem <em>ipsum</em> dolor <strong>amet</strong>',
  },
}

export const PlainText: Story = {
  args: {
    helpText: 'Lorem ipsum dolor amet',
  },
}
