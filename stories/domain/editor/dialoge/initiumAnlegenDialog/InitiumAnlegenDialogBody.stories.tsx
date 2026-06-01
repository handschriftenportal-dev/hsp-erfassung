import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { InitiumAnlegenDialogBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import { WithModal } from 'stories/Decorators'
import initien from 'test/infrastructure/normdaten/fixtures/initien.json'

const meta = {
  title: 'Design System/Dialog/InitiumAnlegenDialog/InitiumAnlegenDialogBody',
  component: InitiumAnlegenDialogBody,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  decorators: [WithModal(false)],
} satisfies Meta<typeof InitiumAnlegenDialogBody>

export default meta
type Story = StoryObj<typeof meta>

const duplicates = initien.data.findInitia.items.slice(0, 5)

const initialState = InitiumAnlegenDialogState.initialState('Alea iacta est', {
  id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
  gndIdentifier: null,
  preferredName: 'unbekannt',
  typeName: 'Language',
  identifier: [],
  variantName: [],
})

export const InitiumEingeben: Story = {
  args: {
    state: initialState,
    dispatch: console.log,
  },
}

export const InitiumUnbekannteSpracheBestaetigen: Story = {
  args: {
    state: {
      ...initialState,
      type: 'confirming_unknown_language',
    },
    dispatch: console.log,
  },
}

export const InitiumDuplikateLaden: Story = {
  args: {
    state: {
      ...initialState,
      type: 'checking_for_duplicates',
    },
    dispatch: console.log,
  },
}

export const InitiumAufDuplikateUeberpruefen: Story = {
  args: {
    state: {
      ...initialState,
      type: 'resolving_duplicates',
      duplicates,
    },
    dispatch: console.log,
  },
}

export const InitiumAnlegen: Story = {
  args: {
    state: {
      ...initialState,
      type: 'creating_initium',
    },
    dispatch: console.log,
  },
}

export const InitiumNutzen: Story = {
  args: {
    state: {
      ...initialState,
      type: 'apply_initium',
      initium: duplicates[0],
    },
    dispatch: console.log,
  },
}

export const InitiumFehler: Story = {
  args: {
    state: {
      ...initialState,
      type: 'error',
      message: 'Fehlernachricht',
    },
    dispatch: console.log,
  },
}
export const InitiumAbbrechen: Story = {
  args: {
    state: {
      ...initialState,
      type: 'cancel',
    },
    dispatch: console.log,
  },
}
