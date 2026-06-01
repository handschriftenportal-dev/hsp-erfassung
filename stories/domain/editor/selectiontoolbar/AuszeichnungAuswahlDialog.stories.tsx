import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { AuszeichnungAuswahlDialog } from 'src/domain/editor/selectiontoolbar/AuszeichnungAuswahlDialog'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { WithModal } from 'stories/Decorators'

const editor = createErfassungsEditor()

const meta = {
  title: 'Design System/Dialog/AuszeichnungAuswahlDialog',
  component: AuszeichnungAuswahlDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
  argTypes: {
    editor: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: false,
      },
    },
  },
} satisfies Meta<typeof AuszeichnungAuswahlDialog>

export default meta
type Story = StoryObj<typeof meta>

export const DialogAuswahl: Story = {
  args: {
    editor,
    type: 'referenz',
  },
}
