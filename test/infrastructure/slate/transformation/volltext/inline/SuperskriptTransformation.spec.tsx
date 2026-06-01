import type { Element } from 'slate'
import { SuperskriptTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/SuperskriptTransformation'

describe('SuperskriptTransformation', () => {
  const content = 'Content'
  const element = {
    data_origin: 'hi',
    data_rend: 'sup',
    children: [{ text: content }],
  } as Element
  const text = SuperskriptTransformation.transform({ data: element })
  it('text has content as text', () => {
    expect(text.text).toBe(content)
  })
  it('inversion is invariant to equality', () => {
    expect(SuperskriptTransformation.invert(text)).toMatchObject({
      data: element,
    })
  })
})
