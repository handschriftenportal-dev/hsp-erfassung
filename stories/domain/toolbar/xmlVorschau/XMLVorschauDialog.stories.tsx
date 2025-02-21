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

import { XMLVorschauDialog } from '../../../../src/domain/toolbar/xmlVorschau/XMLVorschauDialog'
import { WithModal } from '../../../Decorators'

const meta = {
  title: 'Design System/Dialog/XMLVorschauDialog',
  component: XMLVorschauDialog,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof XMLVorschauDialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Diese Komponente ist kontrolliert, d.h. sie hat keinen internen status
 * und gibt Änderungen über einen EventHandler weiter
 */
export const Default: Story = {
  args: {
    document: [
      {
        doctype: {
          name: 'hello',
          systemId: 'systemId',
          publicId: '',
        },
      },
      {
        doctype: {
          name: 'world',
          systemId: 'systemId',
          publicId: 'publicId',
        },
      },
      {
        tag: 'hello',
        attributes: {
          x: '1',
          y: '2',
        },
        children: [{ text: 'world.' }, { data: '<This> is pure <data>' }],
      },
      { comment: 'Kommentar' },
      {
        tag: 'br',
        attributes: {},
        children: [],
      },
      {
        tag: 'p',
        attributes: { n: 'bn32' },
        children: [
          {
            tag: 'bold',
            attributes: {},
            children: [{ text: 'Nested Elements' }],
          },
          {
            text: ' are possible and very long strings are split into multiple lines, s.t. we have about 80 characters per line',
          },
        ],
      },
      {
        tag: 'p',
        attributes: {},
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          },
        ],
      },
    ],
  },
}
