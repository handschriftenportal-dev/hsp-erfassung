import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { XMLVorschauDialog } from 'src/domain/toolbar/dialog/XMLVorschauDialog'
import { WithModal } from 'stories/Decorators'

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
