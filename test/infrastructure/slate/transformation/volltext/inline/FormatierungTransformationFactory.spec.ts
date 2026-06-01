import { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { FormatierungTransformationFactory } from 'src/infrastructure/slate/transformation/volltext/inline/FormatierungTransformationFactory'

describe('FormatierungTransformationFactory', () => {
  const { formatierungen } = VolltextSemantik
  const subReferenz = {
    data_origin: 'persName',
    data_role: 'author',
    data_ref: 'http://some-normdatum',
    children: [{ text: 'wrap to Person' }],
  }
  const subFormatierung = {
    data_origin: 'persName',
    data_role: 'author',
    children: [{ text: 'wrap to Box' }],
  }
  const input = {
    data: {
      data_origin: '123',
      other_attribute: 5,
      children: [
        { text: 'Content' },
        subFormatierung,
        { text: '' },
        subReferenz,
        { text: '' },
      ],
    },
  }
  describe.each(formatierungen)('%s transformation', (formatierung) => {
    const { transform, invert } =
      FormatierungTransformationFactory(formatierung)
    const transformedElement = transform(input)

    it(`transformed element has data_origin ${formatierung}`, () => {
      expect(transformedElement.data_origin).toEqual(formatierung)
    })
    it(`transformed element is not void element`, () => {
      expect(transformedElement.children).not.toEqual([{ text: '' }])
    })
    it('satisfies invariance', () => {
      expect(invert(transformedElement)).toMatchObject(input)
    })
    it('subElement becomes box', () => {
      const boxElement = transformedElement.children[1]
      expect(boxElement).toMatchObject({
        data_origin: 'box',
        content: 'wrap to Box',
        children: [{ text: '' }],
      })
    })
    it('subReferenz becomes Referenz', () => {
      const boxElement = transformedElement.children[3]
      expect(boxElement).toMatchObject({
        data_origin: 'person',
        content: 'wrap to Person',
        children: [{ text: '' }],
      })
    })
  })
})
