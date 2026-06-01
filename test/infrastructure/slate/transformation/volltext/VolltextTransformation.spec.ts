import { VolltextTransformation } from 'src/infrastructure/slate/transformation/volltext/VolltextTransformation'

describe('VolltextTransformation', () => {
  const { transform, invert } = VolltextTransformation
  const element = {
    data_origin: 'p',
    children: [{ text: 'hello world' }],
  }
  const input = { data: [element] }
  const emptyText = { text: '' }
  it('transformation is void element', () => {
    expect(transform(input)).toMatchObject({
      data: {
        data_origin: 'volltext',
        children: [emptyText],
      },
    })
  })
  it('transformation adds padding', () => {
    expect(invert(transform(input))).toMatchObject({
      data: [emptyText, element, emptyText],
    })
  })
})
