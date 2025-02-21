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
import { Transforms } from 'slate'

import { SelectionToolbar } from '../../../../src/domain/editor/selectiontoolbar/SelectionToolbar'
import { createErfassungsEditor } from '../../../../src/infrastructure/slate/ErfassungsEditorFactory'
import { WithModal } from '../../../Decorators'

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
