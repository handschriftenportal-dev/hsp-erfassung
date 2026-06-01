import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import { FallbackTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/FallbackTransformation'
import type { VolltextInlineElement } from 'src/infrastructure/slate/transformation/volltext/InlineTransformation'

describe('BoxTransformation', () => {
  const { transform, invert } = FallbackTransformation
  const content = 'Content'
  const input = {
    data: {
      data_origin: 'tei',
      children: [{ text: content }],
    },
  }
  const box = transform(input)
  it('transforms element to box', () => {
    expect(box.data_origin).toBe('box')
  })
  it('inverts boxes proberly', () => {
    expect(invert(box)).toMatchObject(input)
  })

  it('inverts themenbereich element with error message', () => {
    expect(
      invert({
        data_origin: 'einband',
        auswahl: [],
        content: 'preserve me',
        children: [{ text: '' }],
      })
    ).toMatchObject({
      data: {
        data_origin: 'span',
        children: [{ text: 'preserve me' }],
      },
      serializationErrors: [
        {
          level: SerializationError.level.error,
          errorCode: SerializationError.errorCode.unknownVolltextElement,
        },
      ],
    })
  })

  it('prefers children text over content attribute', () => {
    expect(
      invert({
        data_origin: 'nothing',
        auswahl: [],
        content: 'ignore me',
        children: [{ text: 'preserve me' }],
      } as unknown as VolltextInlineElement)
    ).toMatchObject({
      data: {
        data_origin: 'span',
        children: [{ text: 'preserve me' }],
      },
    })
  })
})
