import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { useState } from 'react'
import { NormdatenMehrfachAuswahl } from 'src/domain/editor/normdaten/NormdatenMehrfachAuswahl'

/**
 * Auswahl mehrerer Normdaten aus einer Liste.
 * Diese Komponente soll folgendes Interface bekommen:
 * - normdatum: Zu einer Normdatum-Auszeichnung gibt es statisch hinterlegte
 *              Rollen. Diese werden mit diesem Typ geladen
 * - value: Eine String Array von gesetzter Rollen. In dieser Liste können auch
 *          Strings drinnen sein, die nicht in Rollen übergeben werden.
 *          Diese Werte werden dann direkt angezeigt, nicht aber "übersetzt".
 * - onChange: Event Handler
 *
 */
const meta = {
  title: 'Design System/Auswahl/NormdatenMehrfachAuswahl',
  component: NormdatenMehrfachAuswahl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NormdatenMehrfachAuswahl>

export default meta
type Story = StoryObj<typeof meta>

const normdaten = [
  {
    id: '0',
    preferredName: 'Null',
    gndIdentifier: '00-0000001',
  },
  {
    id: '1',
    preferredName: 'Eins',
    gndIdentifier: '00-0000001',
  },
  {
    id: '2',
    preferredName: 'Zwei',
    gndIdentifier: '00-0000002',
  },
  {
    id: '3',
    preferredName: 'Drei',
    gndIdentifier: '00-0000003',
  },
  {
    id: '4',
    preferredName: 'Vier',
    gndIdentifier: '00-0000004',
  },
  {
    id: '5',
    preferredName: 'Fünf',
    gndIdentifier: '00-0000005',
  },
]

const [nulll, eins, zwei, drei, vier, fuenf] = normdaten

/**
 * Diese Komponente ist kontrolliert, d.h. sie hat keinen internen status
 * und gibt Änderungen über einen EventHandler weiter
 */
export const Default: Story = {
  args: {
    auswahl: [eins, zwei, drei],
    normdaten,
  },
}

function ControlledRender(
  props: Omit<Parameters<typeof NormdatenMehrfachAuswahl>[0], 'onChange'>
) {
  const [auswahl, setAuswahl] = useState(props.auswahl)
  return (
    <NormdatenMehrfachAuswahl
      {...props}
      auswahl={auswahl}
      onChange={setAuswahl}
    />
  )
}

/**
 * In einer kontrollierten Komponente kann man mehrere Normdaten auswählen
 */
export const Kontrolliert: Story = {
  args: {
    auswahl: [nulll, vier, fuenf],
    normdaten,
  },
  render: (args) => <ControlledRender {...args} />,
}
