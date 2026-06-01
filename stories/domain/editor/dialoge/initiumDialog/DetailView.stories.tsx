import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { DetailView } from 'src/domain/editor/dialoge/initiumDialog/DetailView'

const meta = {
  title: 'Design System/Dialog/InitiumDialog/DetailView',
  component: DetailView,
  parameters: {
    layout: 'centered',
  },
  tags: [],
} satisfies Meta<typeof DetailView>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitium: Story = {
  args: {
    state: {
      status: 'withInitium',
      readOnly: false,
      text: 'Der heilige Rittermeister',
      initium: {
        id: 'NORM-9f1ef79f-7b3a-4a1b-b4db-1638265618a6',
        uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-9f1ef79f-7b3a-4a1b-b4db-1638265618a6',
        text: '"Der heilig rittermaister sand Eustachius der hies vor seiner tauff"',
        alternativeText: [],
        languages: [],
      },
    },
  },
}

export const WithoutInitium: Story = {
  args: {
    state: {
      status: 'withoutInitium',
      readOnly: false,
      text: 'Der heilige Rittermeister',
    },
  },
}

export const LoadingFromUri: Story = {
  args: {
    state: {
      status: 'loadingFromTei',
      readOnly: false,
      text: 'Der heilige Rittermeister',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-9f1ef79f-7b3a-4a1b-b4db-1638265618a6',
      id: 'NORM-9f1ef79f-7b3a-4a1b-b4db-1638265618a6',
    },
  },
}

export const LoadingError: Story = {
  args: {
    state: {
      status: 'loadingError',
      readOnly: false,
      text: 'Der heilige Rittermeister',
      reason: 'Could not connect to Normdatenservice',
    },
  },
}
