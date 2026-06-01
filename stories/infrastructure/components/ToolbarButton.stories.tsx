import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { TagTextIcon } from 'src/domain/editor/icons/TagTextIcon'
import { ToolbarButton } from 'src/infrastructure/components/ToolbarButton'

/**
 * Ein ToolbarButton, als dunkler Kreis gerendert. Bei
 * MouseOver wird der Hintergrund dunkler und besitzt eine deaktivierte Ansicht.
 * Als Child muss ein Icon eingesetzt werden.
 */
const meta = {
  title: 'Design System/Toolbar/ToolbarButton',
  component: ToolbarButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ref: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    title: {
      table: {
        disable: false,
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        disable: false,
      },
    },
  },
} satisfies Meta<typeof ToolbarButton>

export default meta
type Story = StoryObj<typeof meta>

export const Normalzustand: Story = {
  args: {
    children: <TagTextIcon />,
    title: 'hello world',
  },
}

export const Deaktiviert: Story = {
  args: {
    children: <TagTextIcon />,
    disabled: true,
    title: 'goodbye mars',
  },
}
