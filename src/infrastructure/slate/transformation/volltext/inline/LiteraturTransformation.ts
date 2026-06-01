import type { Element } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextLiteratur } from 'src/infrastructure/slate/volltext/VolltextElement'

export const LiteraturTransformation: InvertibleTransformation<
  WithErrors<Element>,
  VolltextLiteratur
> = {
  transform({ data: element }) {
    const content = HSPNode.extractText(element)
    return {
      data_origin: 'literatur',
      content,
      uri: element.data_target ?? '',
      children: [{ text: '' }],
    }
  },
  invert(element) {
    return {
      data: {
        data_origin: 'ref',
        data_type: 'bibliography',
        data_target: element.uri,
        children: [{ text: element.content }],
      },
    }
  },
}
