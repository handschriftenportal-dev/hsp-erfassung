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

import { HilfeText } from '../../../../src/domain/editor/beschreibungskomponenten/hilfetexte'

/**
 * UI Element, um Hilfetext anzuzeigen. Setzt HTML nicht-escaped ein.
 * Vorsicht: Darf aus Sicherheitsgründen nur Text aus einer sicheren Quelle
 * einsetzen!
 */
const meta = {
  title: 'Design System/Hilfe/HilfeText',
  component: HilfeText,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    helpText: {
      control: 'text',
      description: 'Ein beliebiger HTML valider Text',
    },
  },
} satisfies Meta<typeof HilfeText>

export default meta
type Story = StoryObj<typeof meta>

export const HTMLText: Story = {
  args: {
    helpText: 'Lorem <em>ipsum</em> dolor <strong>amet</strong>',
  },
}

export const PlainText: Story = {
  args: {
    helpText: 'Lorem ipsum dolor amet',
  },
}
