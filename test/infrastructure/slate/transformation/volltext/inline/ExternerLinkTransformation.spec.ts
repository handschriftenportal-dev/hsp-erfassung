import { ExternerLinkTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/ExternerLinkTransformation'

describe('ExternerLinkTransformation', () => {
  const { transform, invert } = ExternerLinkTransformation
  const input = {
    data: {
      data_origin: 'ref',
      data_target: 'uri',
      children: [{ text: 'hello world' }],
    },
  }
  it('transform maps to VolltextLink', () => {
    expect(transform(input)).toMatchObject({
      data_origin: 'externerLink',
      content: 'hello world',
      children: [{ text: '' }],
    })
  })
  it('invert is invariant', () => {
    expect(invert(transform(input))).toMatchObject(input)
  })
})
