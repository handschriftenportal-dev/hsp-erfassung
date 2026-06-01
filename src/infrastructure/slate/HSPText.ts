import type { Node } from 'slate'
import { Text } from 'slate'

import { HSPElement } from './HSPElement'

export interface EmptyText extends Text {
  text: ''
}

function interpose<T>(elements: T[], separator: () => T): T[] {
  return elements.flatMap((element, index) =>
    index === 0 ? [element] : [separator(), element]
  )
}

function emptyText(): EmptyText {
  return { text: '' }
}

function fromPlainText(plainText: string): Node[] {
  const lines = plainText.split('\n').map(normalizedText)
  return interpose<Node>(lines, HSPElement.lbElement)
}

function normalizedText(s: string): Text {
  return {
    text: s.replace(/\s+/g, ' '),
  }
}

export const HSPText = Object.freeze({
  ...Text,
  emptyText,
  fromPlainText,
  normalizedText,
})
