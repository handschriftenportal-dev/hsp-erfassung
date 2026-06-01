import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import { ExternerLinkDialog } from 'src/domain/editor/dialoge/ExternerLinkDialog'
import { GlobalDisabledModal } from 'stories/infrastructure/modal/GlobalDisabledModal'

const meta = {
  title: 'Design System/Dialog/ExternerLinkDialog',
  component: ExternerLinkDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [
    (Story) => (
      <GlobalDisabledModal>
        <Story />
      </GlobalDisabledModal>
    ),
  ],
} satisfies Meta<typeof ExternerLinkDialog>

export default meta
type Story = StoryObj<typeof meta>

export const OhneParamter: Story = {}

export const MitParameter: Story = {
  args: {
    initialValue: { text: 'Hallo', href: 'http://handschriftenportal.de' },
  },
}
