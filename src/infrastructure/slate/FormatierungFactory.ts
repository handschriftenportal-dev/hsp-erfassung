import { cloneDeep } from 'lodash'
import type { Element } from 'slate'

import type { VolltextFormatierung } from './volltext/VolltextElement'

const explicit: VolltextFormatierung = {
  data_origin: 'explicit',
  box: {
    data_origin: 'quote',
    data_type: 'explicit',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const incipit: VolltextFormatierung = {
  data_origin: 'incipit',
  box: {
    data_origin: 'quote',
    data_type: 'incipit',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const zitat: VolltextFormatierung = {
  data_origin: 'zitat',
  box: {
    data_origin: 'quote',
    children: [{ text: '' }],
  },
  children: [{ text: '' }],
}
const werktitel: VolltextFormatierung = {
  data_origin: 'werktitel',
  box: {
    data_origin: 'title',
    children: [{ text: '' }],
  },
  children: [{ text: '' }],
}
const autor: VolltextFormatierung = {
  data_origin: 'autor',
  box: {
    data_origin: 'persName',
    data_role: 'author',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const emptyElements: Partial<
  Record<VolltextFormatierung['data_origin'], VolltextFormatierung>
> = {
  explicit,
  incipit,
  zitat,
  werktitel,
  autor,
}

export const FormatierungFactory = Object.freeze({
  from(auszeichnung: VolltextFormatierung['data_origin']): Element {
    const element = emptyElements[auszeichnung]
    if (element) {
      return cloneDeep(element)
    } else {
      throw new Error(
        `Elemente zu semantischer Auszeichnung "${auszeichnung}" nicht definiert`
      )
    }
  },
})
