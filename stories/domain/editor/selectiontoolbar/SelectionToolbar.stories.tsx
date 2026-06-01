import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { Transforms } from 'slate'
import { SelectionToolbar } from 'src/domain/editor/selectiontoolbar/SelectionToolbar'
import { createErfassungsEditor } from 'src/infrastructure/slate/ErfassungsEditorFactory'
import { WithModal } from 'stories/Decorators'

const editor = createErfassungsEditor()
editor.children = [{ data_origin: 'WRAPPER', children: [{ text: 'content' }] }]
const anchor = { path: [0, 0], offset: 0 }
const focus = { path: [0, 0], offset: 4 }
Transforms.select(editor, { anchor, focus })

const disabledEditor = createErfassungsEditor()
editor.children = [{ data_origin: 'WRAPPER', children: [{ text: 'content' }] }]

const meta = {
  title: 'Design System/Toolbar/SelectionToolbar',
  component: SelectionToolbar,
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
  },
} satisfies Meta<typeof SelectionToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const ValideTextAuswahl: Story = {
  args: {
    editor,
  },
}
export const InvalideTextAuswahl: Story = {
  args: {
    editor: disabledEditor,
  },
}
