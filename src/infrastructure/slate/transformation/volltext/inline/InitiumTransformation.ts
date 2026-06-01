import type { Element } from 'slate'
import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import type { VolltextInitium } from 'src/infrastructure/slate/volltext/VolltextElement'

export const InitiumTransformation: InvertibleTransformation<
  WithErrors<Element>,
  VolltextInitium
> = {
  transform({ data: element }) {
    if (HSPElement.isTEIInitiumKodierung(element)) {
      const {
        children: [
          { text: content },
          {
            children: [{ data_ref = '', data_key = '' }],
          },
        ],
      } = element
      return {
        data_origin: 'initium',
        content,
        initium: {
          id: data_key,
          uri: data_ref,
        },
        children: [{ text: '' }],
      }
    }

    return {
      data_origin: 'initium',
      content: HSPNode.extractText(element),
      initium: {
        id: '',
        uri: '',
      },
      children: [{ text: '' }],
    }
  },
  invert(element) {
    return {
      data: {
        data_origin: 'quote',
        data_type: 'incipit',
        children: [
          { text: element.content },
          {
            data_origin: 'index',
            data_indexName: 'initia',
            children: [
              {
                data_origin: 'term',
                data_key: element.initium.id,
                data_ref: element.initium.uri,
                children: [{ text: '' }],
              },
            ],
          },
        ],
      },
    }
  },
}
