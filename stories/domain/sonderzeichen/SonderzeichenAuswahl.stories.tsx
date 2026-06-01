import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Sonderzeichen } from 'src/domain/sonderzeichen/Sonderzeichen'
import { SonderzeichenAuswahl } from 'src/domain/sonderzeichen/SonderzeichenAuswahl'

const meta = {
  title: 'Design System/SonderzeichenAPI',
  component: SonderzeichenAuswahl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SonderzeichenAuswahl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClose() {
      console.log('close')
    },
    onSubmit(sonderzeichen: Sonderzeichen) {
      console.log(`Submitted: ${sonderzeichen.sign}`, sonderzeichen)
    },
  },
}
