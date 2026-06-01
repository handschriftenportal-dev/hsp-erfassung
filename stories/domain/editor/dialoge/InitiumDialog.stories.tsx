import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { InitiumDialog } from 'src/domain/editor/dialoge/InitiumDialog'
import { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'
import { WithModal } from 'stories/Decorators'

const meta = {
  title: 'Design System/Dialog/InitiumDialog',
  component: InitiumDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof InitiumDialog>

export default meta
type Story = StoryObj<typeof meta>

const mockInitium: Initium = {
  id: 'NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
  text: 'In principio erat Verbum',
  uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
  alternativeText: ['In principio erat uerbum', 'In princip erat Verbum'],
  languages: [
    {
      id: 'la',
      variantName: [
        { isoCode: 'de', text: 'Latein' },
        { isoCode: 'en', text: 'Latin' },
      ],
    },
    {
      id: 'de',
      variantName: [
        { isoCode: 'de', text: 'Deutsch' },
        { isoCode: 'en', text: 'German' },
      ],
    },
  ],
}

export const LeerMitText: Story = {
  args: {
    initialState: InitiumDialogState.new({ text: 'Hallo' }),
  },
}

export const URILadend: Story = {
  args: {
    initialState: InitiumDialogState.new({
      text: 'Homo Quidam',
      id: 'NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
    }),
  },
}

export const MitInitium: Story = {
  args: {
    initialState: {
      status: 'withInitium',
      readOnly: false,
      text: 'Homo Quidam',
      initium: mockInitium,
    },
  },
}

export const MitInitiumUndLoeschfunktion: Story = {
  args: {
    initialState: {
      status: 'withInitium',
      readOnly: false,
      text: 'Homo Quidam',
      initium: mockInitium,
    },
    onDelete: () => console.log('Delete pressed'),
  },
}

export const ReadonlyMitInitium: Story = {
  args: {
    initialState: {
      status: 'withInitium',
      readOnly: true,
      text: 'Homo Quidam',
      initium: mockInitium,
    },
  },
}
