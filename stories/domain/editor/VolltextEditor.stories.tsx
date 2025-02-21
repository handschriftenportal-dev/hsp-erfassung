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
import { Element } from 'slate'

import { VolltextEditor } from '../../../src/domain/editor/volltext/VolltextEditor'
import {
  VolltextBlock,
  VolltextBox,
  VolltextFormatierung,
  VolltextReferenz,
} from '../../../src/infrastructure/slate/volltext/VolltextElement'
import { WithEditMode, WithModal } from '../../Decorators'

const meta = {
  title: 'Design System/Volltext/Editor',
  component: VolltextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [WithModal(true), WithEditMode],
  argTypes: {},
} satisfies Meta<typeof VolltextEditor>

export default meta
type Story = StoryObj<typeof meta>

const box: VolltextBox = {
  data_origin: 'box',
  children: [{ text: '' }],
  box: { data_origin: 'locus', children: [{ text: 'locus' }] },
  content: 'Locus',
}
const formatierung: VolltextFormatierung = {
  data_origin: 'autor',
  children: [{ text: 'Pythagoras' }],
  box: {
    data_origin: 'persName',
    data_role: 'author',
    children: [{ text: 'Pythagoras' }],
  } as Element,
}

const normdatum: VolltextReferenz = {
  data_origin: 'person',
  children: [{ text: '' }],
  content: 'Archimedes',
  box: {
    data_origin: 'persName',
    data_ref: 'https://d-nb.info/gnd/118503863',
    data_role: 'scribe',
    children: [{ text: 'Archimedes' }],
  } as Element,
}

const initialValue: VolltextBlock[] = [
  {
    data_origin: 'paragraph',
    children: [{ text: 'Box: ' }, box, { text: '.' }],
  },
  {
    data_origin: 'paragraph',
    children: [{ text: 'Formatierung: ' }, formatierung, { text: '.' }],
  },
  {
    data_origin: 'paragraph',
    children: [{ text: 'Referenz: ' }, normdatum, { text: '.' }],
  },
]

export const Default: Story = {
  args: {
    initialValue,
    onChange: undefined,
  },
}
