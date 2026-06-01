import { Element } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextInlineElement } from 'src/infrastructure/slate/transformation/volltext/InlineTransformation'

function toText(element: VolltextInlineElement): string {
  const text = HSPNode.extractText(element)
  if (text) {
    return text
  }
  if ('content' in element) {
    return element.content
  }
  return ''
}

export const FallbackTransformation: InvertibleTransformation<
  WithErrors<Element>,
  VolltextInlineElement
> = {
  transform({ data: element }) {
    const content = HSPNode.extractText(element)
    return {
      data_origin: 'box',
      box: element,
      content,
      children: [{ text: '' }],
    }
  },
  invert(element) {
    if (
      typeof element === 'object' &&
      element !== null &&
      'box' in element &&
      Element.isElement(element.box)
    ) {
      return {
        data: element.box,
      }
    } else {
      return {
        data: {
          data_origin: 'span',
          children: [{ text: toText(element) }],
        },
        serializationErrors: [
          {
            errorCode: SerializationError.errorCode.unknownVolltextElement,
            level: SerializationError.level.error,
            detail: element,
            tag: element?.data_origin ?? 'NoTagProvided',
          },
        ],
      }
    }
  },
}
