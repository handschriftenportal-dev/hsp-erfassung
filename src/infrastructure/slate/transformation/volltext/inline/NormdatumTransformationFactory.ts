import type { Element } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

export const NormdatumTransformationFactory = (
  origin: VolltextNormdatum['data_origin']
): InvertibleTransformation<WithErrors<Element>, VolltextNormdatum> => {
  return {
    transform({ data: element }) {
      const content = HSPNode.extractText(element)
      return {
        data_origin: origin,
        box: element,
        content,
        children: [{ text: '' }],
      }
    },
    invert(element) {
      const { box } = element
      box.children = [{ text: element.content }]
      return { data: box }
    },
  }
}
