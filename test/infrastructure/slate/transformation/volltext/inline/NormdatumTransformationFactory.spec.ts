import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { NormdatumTransformationFactory } from 'src/infrastructure/slate/transformation/volltext/inline/NormdatumTransformationFactory'

describe('NormdatumTransformationFactory', () => {
  const input = {
    data: {
      data_origin: '123',
      other_attribute: 5,
      children: [{ text: 'Content' }],
    },
  }

  describe.each(['person', 'ort', 'koerperschaft'] as const)(
    '%s transformation',
    (referenz) => {
      const { transform, invert } = NormdatumTransformationFactory(referenz)
      const transformedElement = transform(input)

      it(`transformed element has data_origin ${referenz}`, () => {
        expect(transformedElement.data_origin).toEqual(referenz)
      })
      it(`transformed element is void element`, () => {
        expect(transformedElement.children).toEqual([{ text: '' }])
      })
      it('satisfies invariance', () => {
        expect(invert(transformedElement)).toEqual(input)
      })
      it('changing content becomes text content of inversion', () => {
        const newContent = 'new content'
        transformedElement.content = newContent
        expect(HSPNode.extractText(invert(transformedElement).data)).toEqual(
          newContent
        )
      })
    }
  )
})
