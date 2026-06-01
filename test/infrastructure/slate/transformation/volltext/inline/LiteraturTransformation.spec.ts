import { LiteraturTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/LiteraturTransformation'

describe('LiteraturTransformation', () => {
  const { transform, invert } = LiteraturTransformation
  const input = {
    data: {
      data_origin: 'ref',
      data_type: 'bibliography',
      data_target: 'https://literatur.com/literatur',
      children: [{ text: 'hello world' }],
    },
  }
  it('transform maps to VolltextLink', () => {
    expect(transform(input)).toMatchObject({
      data_origin: 'literatur',
      content: 'hello world',
      uri: 'https://literatur.com/literatur',
      children: [{ text: '' }],
    })
  })
  it('invert is invariant', () => {
    expect(invert(transform(input))).toMatchObject(input)
  })
})
