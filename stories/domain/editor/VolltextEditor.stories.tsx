import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Element } from 'slate'
import { VolltextEditor } from 'src/domain/editor/volltext/VolltextEditor'
import type {
  VolltextBlock,
  VolltextBox,
  VolltextFormatierung,
  VolltextInitium,
  VolltextReferenz,
  VolltextThemenbereich,
} from 'src/infrastructure/slate/volltext/VolltextElement'
import { WithEditMode, WithModal } from 'stories/Decorators'

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
const author: VolltextReferenz = {
  data_origin: 'person',
  children: [{ text: '' }],
  content: 'Archimedes',
  box: {
    data_origin: 'persName',
    data_ref: 'https://d-nb.info/gnd/118503863',
    data_role: 'author',
    children: [{ text: 'Archimedes' }],
  } as Element,
}
const einband: VolltextThemenbereich = {
  data_origin: 'einband',
  auswahl: [
    {
      id: 'NORM-c329900e-60db-3079-8de1-f7f33f18f56b',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-X671',
    },
    {
      id: 'NORM-2110968e-294f-3ab8-b168-75436b7948ff',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-B548',
    },
    {
      id: 'NORM-75d4cbe0-0e1f-3ed4-a01a-dc3bdf56493c',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-A507',
    },
    {
      id: 'NORM-36acf876-d855-3360-bed2-8c9c2bea5e56',
      uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-E625',
    },
  ],
  content: 'Themenbereich Einband',
  children: [{ text: '' }],
}
const initium: VolltextInitium = {
  data_origin: 'initium',
  content: 'Ut homo digne ad sacramentum...',
  initium: {
    id: 'NORM-226148fa-cc61-3504-b184-db4eebe3d6c8',
    uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-226148fa-cc61-3504-b184-db4eebe3d6c8',
  },
  children: [{ text: '' }],
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
    children: [
      { text: 'Referenz: ' },
      normdatum,
      { text: '. Autor: ' },
      author,
      { text: '.' },
    ],
  },
  {
    data_origin: 'paragraph',
    children: [
      { text: 'E=c' },
      { text: '2', superskript: true },
      { text: 'm' },
    ],
  },
  {
    data_origin: 'paragraph',
    children: [{ text: '' }, einband, { text: '' }],
  },
  {
    data_origin: 'paragraph',
    children: [{ text: 'Initium: "' }, initium, { text: '"' }],
  },
]

export const Default: Story = {
  args: {
    initialValue,
    onChange: undefined,
  },
}
