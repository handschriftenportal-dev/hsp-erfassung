import type { Element } from 'slate'
import { BoxTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/BoxTransformation'

describe('BoxTransformation', () => {
  const content = 'Content'
  const element: Element = {
    data_origin: 'tei',
    children: [{ text: content }],
  }
  const box = BoxTransformation.transform({ data: element })
  it('transforms element to box', () => {
    expect(box.data_origin).toBe('box')
  })
  it('box content equals elements extracted text', () => {
    expect(box.content).toBe(content)
  })
  it('inversion is invariant to equality', () => {
    expect(BoxTransformation.invert(box)).toMatchObject({ data: element })
  })
})
