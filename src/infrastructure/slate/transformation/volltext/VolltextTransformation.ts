import type { Descendant } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import type { VolltextEditorElement } from 'src/infrastructure/slate/volltext/VolltextEditorElement'

import { ParagraphTransformation } from './ParagraphTransformation'

export const VolltextTransformation: InvertibleTransformation<
  WithErrors<Descendant[]>,
  WithErrors<VolltextEditorElement>
> = {
  transform(input) {
    return {
      data: {
        data_origin: 'volltext',
        content: ParagraphTransformation.transform(input).data,
        children: [{ text: '' }],
      },
    }
  },
  invert({ data, serializationErrors }) {
    return ParagraphTransformation.invert({
      data: data.content,
      serializationErrors,
    })
  },
}
