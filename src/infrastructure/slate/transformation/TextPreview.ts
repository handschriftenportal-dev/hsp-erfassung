import type { Node } from 'slate'
import { Text } from 'slate'
import type { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'

const removeDuplicatedWhitespace = /\s\s+/g

function cleanText(text: string) {
  return text.replace(removeDuplicatedWhitespace, ' ')
}

function extractText(node: Node): string {
  if (Text.isText(node)) {
    return cleanText(node.text)
  }
  if ('content' in node && typeof node.content === 'string') {
    return cleanText(node.content)
  }
  return node.children.map(extractText).join('')
}

export const TextPreview = (
  element: VolltextEditorElement,
  maxLength: number
): string => {
  const containsLinebreak = element.content.length > 1
  const [paragraph] = element.content
  const result = extractText(paragraph).trim()

  return containsLinebreak || result.length > maxLength
    ? result.substring(0, maxLength).concat('\u2026')
    : result
}
