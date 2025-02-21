/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Node, Text } from 'slate'

import { VolltextEditorElement } from '../volltext/VolltextEditorElement'

const removeDuplicatedWhitespace = /\s\s+/g

function cleanText(text: string) {
  return text.replace(removeDuplicatedWhitespace, ' ')
}

function extractText(node: Node): string {
  if (Text.isText(node)) {
    return cleanText(node.text)
  }
  const { content } = node as any
  if (content !== undefined && typeof content === 'string') {
    return cleanText(content)
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
