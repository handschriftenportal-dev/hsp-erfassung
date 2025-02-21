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

import { toPairs } from '../../../../../src/infrastructure/helper'
import {
  TEIElement,
  TEIText,
} from '../../../../../src/infrastructure/slate/TEI'
import { ParagraphTransformation } from '../../../../../src/infrastructure/slate/transformation/volltext/ParagraphTransformation'
import { VolltextBlock } from '../../../../../src/infrastructure/slate/volltext/VolltextElement'

function noConsecutiveText(nodes: Node[]): boolean {
  const pairs = toPairs(nodes)
  return pairs.every(([x, y]) => !(Text.isText(x) && Text.isText(y)))
}

function isParagraph(block: VolltextBlock): boolean {
  return (
    block.data_origin === 'paragraph' &&
    block.children.length > 0 &&
    noConsecutiveText(block.children)
  )
}

describe('ParagraphTransformation', () => {
  const { lbElement } = TEIElement
  const { normalizedText } = TEIText
  const a = normalizedText('a')
  const b = normalizedText('b')
  const c = normalizedText('c')

  it.each([
    [[], 1],
    [[a, b, c], 1],
    [[a, lbElement(), b, c], 2],
    [[lbElement(), lbElement()], 3],
  ])('%o is split into %d paragraphs', (nodes, length) => {
    const { data: paragraphs } = ParagraphTransformation.transform({
      data: nodes,
    })
    expect(paragraphs).toHaveLength(length)
    paragraphs.forEach((p) => expect(isParagraph(p)).toBeTruthy())
  })

  it('inversion is invariant modulo empty texts', () => {
    const nodes = [a, lbElement(), b, lbElement(), c, lbElement()]
    const outputs = ParagraphTransformation.transform({ data: nodes })
    expect(
      ParagraphTransformation.invert(outputs).data.filter(
        (element) => !TEIText.isEmptyText(element)
      )
    ).toEqual(nodes)
  })
})
