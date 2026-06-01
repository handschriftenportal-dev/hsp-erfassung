import type { Element } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextBox } from 'src/infrastructure/slate/volltext/VolltextElement'

export const BoxTransformation: InvertibleTransformation<
  WithErrors<Element>,
  VolltextBox
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
    return { data: element.box }
  },
}
