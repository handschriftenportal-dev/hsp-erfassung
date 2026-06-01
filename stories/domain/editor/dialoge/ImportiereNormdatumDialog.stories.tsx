import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { ImportiereNormdatumDialog } from 'src/domain/editor/dialoge/ImportiereNormdatumDialog'

const meta = {
  title: 'Design System/Dialog/ImportiereNormdatumDialog',
  component: ImportiereNormdatumDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
} satisfies Meta<typeof ImportiereNormdatumDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialSearchTerm: 'Turing',
    normdatumTyp: 'person',
    back: (x) => console.log('Normdatum importiert', x),
  },
}
