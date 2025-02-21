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

import { TagTextIcon } from '../../../src/domain/editor/icons/TagTextIcon'
import { ToolbarButton } from '../../../src/infrastructure/components/ToolbarButton'

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
