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
import { useState } from 'react'

import { BeziehungsMehrfachAuswahl } from '../../../../../src/domain/editor/normdaten/dialog/BeziehungsMehrfachAuswahl'

/**
 * Auswahl mehrerer Beziehungen für ein Normdatum.
 * Diese Komponente soll folgendes Interface bekommen:
 * - normdatum: Zu einer Normdatum-Auszeichnung gibt es statisch hinterlegte
 *              Rollen. Diese werden mit diesem Typ geladen
 * - value: Eine String Array von gesetzter Rollen. In dieser Liste können auch
 *          Strings drinnen sein, die nicht in Rollen übergeben werden.
 *          Diese Werte werden dann direkt angezeigt, nicht aber "übersetzt".
 * - onChange: Event Handler
 *
 * **ACHTUNG**: Aktuell enthält der Typ `NormdatumAuszeichnung` neben Normdaten
 *   auch noch Konzepte. Dies soll künftig getrennt werden. Ab dann gibt es
 *   keine leere Liste an Beziehungen mehr.
 */
const meta = {
  title: 'Design System/Auswahl/BeziehungsMehrfachAuswahl',
  component: BeziehungsMehrfachAuswahl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'object',
      },
    },
  },
} satisfies Meta<typeof BeziehungsMehrfachAuswahl>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Diese Komponente ist kontrolliert, d.h. sie hat keinen internen status
 * und gibt Änderungen über einen EventHandler weiter
 */
export const Default: Story = {
  args: {
    value: ['illuminator', 'conservator', 'other'],
    normdatum: 'person',
  },
}

function ControlledRender(
  props: Omit<Parameters<typeof BeziehungsMehrfachAuswahl>[0], 'onChange'>
) {
  const [value, setValue] = useState(props.value)
  return (
    <BeziehungsMehrfachAuswahl {...props} value={value} onChange={setValue} />
  )
}

/**
 * Die Flag `readOnly` erlaubt es die Komponente auch nur zur Ansicht zu nutzen
 */
export const Schreibgeschuetzt: Story = {
  args: {
    value: ['scribe', 'illuminator'],
    readOnly: true,
    normdatum: 'person',
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * Als onChange handler reicht ein useState-Setter
 */
export const Kontrolliert: Story = {
  args: {
    value: [],
    normdatum: 'person',
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * Im `value` können Werte angezeigt werden, die nicht in den statischen
 * Beziehungen des `normdatum` spezifiziert sind. Dies ist notwendig, um
 * alte Beschreibungen darstellen zu können.
 */
export const KontrolliertMitWertenAusserhalbOptions: Story = {
  args: {
    value: ['notSpecified', 'valuesAreAllowed', 'inOldDescriptions'],
    normdatum: 'person',
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * TEI erlaubt doppelte Rollen. Daher wird dies auch angezeigt, auch wenn man
 * diesen Zustand selbst nicht nachstellen kann.
 */
export const KontrolliertMitDoppeltenWerten: Story = {
  args: {
    value: ['other', 'xxx', 'other', 'xxx'],
    normdatum: 'person',
  },
  render: (args) => <ControlledRender {...args} />,
}
