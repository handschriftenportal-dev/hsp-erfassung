import { Element } from 'slate'

import type { VolltextBlock } from './VolltextElement'

export interface VolltextEditorElement extends Element {
  data_origin: 'volltext'
  content: VolltextBlock[]
  children: [{ text: '' }]
}

export const VolltextEditorElement = Object.freeze({
  isVolltextEditorElement(e: unknown): e is VolltextEditorElement {
    return Element.isElement(e) && e.data_origin === 'volltext'
  },
  emptyVolltext(): VolltextEditorElement {
    return {
      data_origin: 'volltext',
      content: [
        {
          data_origin: 'paragraph',
          children: [{ text: '' }],
        },
      ],
      children: [{ text: '' }],
    }
  },
})
