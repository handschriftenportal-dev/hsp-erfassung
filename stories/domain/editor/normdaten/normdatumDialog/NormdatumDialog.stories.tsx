/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Meta, StoryObj } from '@storybook/react'

import { NormdatumDialog } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialog'
import { Normdatum } from '../../../../../src/domain/editor/normdaten/normdatumDialog/NormdatumDialogState'
import { WithModal } from '../../../../Decorators'

const meta = {
  title: 'Design System/Dialog/NormdatumDialog',
  component: NormdatumDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof NormdatumDialog>

export default meta
type Story = StoryObj<typeof meta>

const normdatum: Normdatum = {
  gndIdentifier: '118597248',
  preferredName: 'Pythagoras',
}

export const Lesemodus: Story = {
  args: {
    initialState: {
      view: 'read',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'idle',
      text: 'Pythagoras',
      identifier: normdatum.gndIdentifier,
    },
    onAction: console.log,
  },
}

export const BearbeitenModus: Story = {
  args: {
    initialState: {
      view: 'edit',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'idle',
      text: 'Pythagoras',
      normdatum,
    },
    onAction: console.log,
  },
}

export const AnlegenModus: Story = {
  args: {
    initialState: {
      view: 'create',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'filled',
      text: 'Pythagoras',
      normdatum,
    },
    onAction: console.log,
  },
}

export const AnlegenModusLeer: Story = {
  args: {
    initialState: {
      view: 'create',
      type: 'person',
      rollen: ['author', 'scribe'],
      status: 'empty',
      text: 'Pythagoras',
    },
    onAction: console.log,
  },
}
