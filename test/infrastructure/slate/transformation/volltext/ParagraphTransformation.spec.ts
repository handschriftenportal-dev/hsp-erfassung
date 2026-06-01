import type { Element, Node } from 'slate'
import { Text } from 'slate'
import { toPairs } from 'src/infrastructure/helper'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { HSPText } from 'src/infrastructure/slate/HSPText'
import { ParagraphTransformation } from 'src/infrastructure/slate/transformation/volltext/ParagraphTransformation'

function noConsecutiveText(nodes: Node[]): boolean {
  const pairs = toPairs(nodes)
  return pairs.every(([x, y]) => !(Text.isText(x) && Text.isText(y)))
}

function isParagraph(block: Element): boolean {
  return (
    block.data_origin === 'paragraph' &&
    block.children.length > 0 &&
    noConsecutiveText(block.children)
  )
}

describe('ParagraphTransformation', () => {
  const { lbElement } = HSPElement
  const { normalizedText } = HSPText
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
        (element) => !HSPNode.isEmptyText(element)
      )
    ).toEqual(nodes)
  })
})
