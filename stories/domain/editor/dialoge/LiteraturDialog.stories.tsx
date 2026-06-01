import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import { LiteraturDialog } from 'src/domain/editor/dialoge/LiteraturDialog'
import { LiteraturService } from 'src/infrastructure/literatur/LiteraturService'
import { GlobalDisabledModal } from 'stories/infrastructure/modal/GlobalDisabledModal'

const meta = {
  title: 'Design System/Dialog/LiteraturDialog',
  component: LiteraturDialog,
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
} satisfies Meta<typeof LiteraturDialog>

export default meta
type Story = StoryObj<typeof meta>

export const OhneParamter: Story = {}

export const MitParameter: Story = {
  args: {
    initialValue: {
      text: 'JavaScript: The Good Parts',
      href: 'https://www.crockford.com/books.html',
    },
  },
}

const literatur = LiteraturService.findByTitle('')[0]

export const MitLiteraturAusListe: Story = {
  args: {
    initialValue: { text: literatur.title, href: literatur.uri },
  },
}

export const InReadOnlyMode: Story = {
  args: {
    initialValue: { text: literatur.title, href: literatur.uri },
    readOnly: true,
  },
}
