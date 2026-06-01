import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { useState } from 'react'
import { ThesaurusAuswahl } from 'src/domain/editor/normdaten/ThesaurusAuswahl'

const einfachAuswahl = 'NORM-1727e64f-d87c-34a8-a07c-ae1d6d569d71'
const mehrfachAuswahl = [
  'NORM-1727e64f-d87c-34a8-a07c-ae1d6d569d71',
  'NORM-821ba04d-895d-3e45-970b-3a93d5a7ab7f',
]

/**
 * Auswahl eines einzelnen oder mehreren Begriffs aus einem Thesaurus
 * Diese Komponente soll folgendes Interface bekommen:
 * - multiple: Ob ein oder mehrere Begriffe ausgewählt werden können sollen
 * - thesaurus: Die Notation eines Thesaurus
 * - auswahl:
 *   - Bei einfacher Auswahl: Eine einzelne Id eines Begriff aus dem
 *   Thesaurus oder null
 *   - Bei mehrfach Auswahl: Ein Array aus Ids
 * - onChange: Event Handler
 *
 * Die Komponente soll nicht kontrolliert sein.
 * Die Komponente soll nur Begriffe aus dem angegebenen Thesaurus anzeigen.
 * Wenn der Thesaurus ein Fachbegriff Thesaurus ist, soll bei der Auswahl
 * eines Fachbegriffs auch die notwendigen Begriffe über den onChange-Handler
 * mitgegeben werden
 */
const meta = {
  title: 'Design System/Auswahl/ThesaurusEinfachAuswahl',
  component: ThesaurusAuswahl,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThesaurusAuswahl>

export default meta
type Story = StoryObj<typeof meta>

function ControlledRender(
  props: Omit<Parameters<typeof ThesaurusAuswahl>[0], 'onChange'>
) {
  const [auswahl, setAuswahl] = useState(props.auswahl)

  if (props.multiple === true) {
    return (
      <ThesaurusAuswahl
        {...props}
        multiple
        auswahl={auswahl as string[]}
        onChange={(begriffe) =>
          setAuswahl(begriffe.map((begriff) => begriff.identifier.id))
        }
      />
    )
  }

  return (
    <ThesaurusAuswahl
      {...props}
      multiple={false}
      auswahl={auswahl as string | undefined}
      onChange={(begriff) => setAuswahl(begriff?.identifier?.id)}
    />
  )
}

/**
 * In einer einfachen Auswahl muss kein Begriff ausgewählt sein
 */
export const EinfachAuswahlLeer: Story = {
  args: {
    auswahl: undefined,
    thesaurus: 'BNDG-A',
    multiple: false,
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * In einer einfachen Auswahl kann ein Begriff ausgewählt sein
 */
export const EinfachAuswahlKontrolliert: Story = {
  args: {
    auswahl: einfachAuswahl,
    thesaurus: 'BNDG-A',
    multiple: false,
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * Die einfache Auswahl zeigt einen Fehler bei einem invaliden Thesaurus
 */
export const EinfachAuswahlUngueltigerThesaurus: Story = {
  args: {
    auswahl: einfachAuswahl,
    thesaurus: 'INVALID',
    multiple: false,
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * In einer kontrollierten Komponente können mehrere Begriffe eines Thesaurus
 * ausgewählt werden
 */
export const KontrolliertMehrfach: Story = {
  args: {
    auswahl: mehrfachAuswahl,
    thesaurus: 'BNDG-A',
    multiple: true,
  },
  render: (args) => <ControlledRender {...args} />,
}

/**
 * In einer kontrollierten Komponente können mehrere Begriffe eines Thesaurus
 * ausgewählt werden
 */
export const MehrfachAuswahlUngueltigerThesaurus: Story = {
  args: {
    auswahl: mehrfachAuswahl,
    thesaurus: 'INVALID',
    multiple: true,
  },
  render: (args) => <ControlledRender {...args} />,
}
