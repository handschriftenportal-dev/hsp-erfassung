import type { Element, Text } from 'slate'
import {
  TEI_ATTRIBUTE_REND_SUPERSKRIPT,
  TEI_ELEMENT_HIGHLIGHT,
} from 'src/domain/erfassung/TEIConstants'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

export const SuperskriptTransformation: InvertibleTransformation<
  WithErrors<Element>,
  Text
> = {
  transform({ data: element }) {
    const text = HSPNode.extractText(element)
    return { text, superskript: true }
  },
  invert(text) {
    return {
      data: {
        data_origin: TEI_ELEMENT_HIGHLIGHT,
        data_rend: TEI_ATTRIBUTE_REND_SUPERSKRIPT,
        children: [text],
      },
    }
  },
}
