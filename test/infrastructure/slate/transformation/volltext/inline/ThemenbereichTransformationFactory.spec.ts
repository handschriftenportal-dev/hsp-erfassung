import { ThemenbereichNotationen } from 'src/domain/erfassung/ThemenbereicheAPI'
import { ThemenbereichTransformationFactory } from 'src/infrastructure/slate/transformation/volltext/inline/ThemenbereichTransformationFactory'
import type { VolltextThemenbereich } from 'src/infrastructure/slate/volltext/VolltextElement'

describe('ThemenbereichTransformationFactory', () => {
  const themenbereichNotationPairs = Object.entries(
    ThemenbereichNotationen
  ) as [VolltextThemenbereich['data_origin'], string][]
  describe.each(themenbereichNotationPairs)(
    'for Themenbereich "%s" (%s)',
    (themenbereich, notation) => {
      const { transform, invert } =
        ThemenbereichTransformationFactory(themenbereich)
      const element = {
        data_origin: 'ref',
        data_type: 'subjectArea',
        children: [
          { text: 'content' },
          {
            data_origin: 'index',
            data_indexName: notation,
            children: [
              {
                data_origin: 'term',
                data_ref: 'uri_1',
                data_key: 'key_1',
                children: [{ text: '' }],
              },
              {
                data_origin: 'term',
                data_ref: 'uri_2',
                data_key: 'key_2',
                children: [{ text: '' }],
              },
            ],
          },
        ],
      }
      const input = { data: element }

      it('transforms to VolltextThemenbereich', () => {
        expect(transform(input)).toMatchObject({
          data_origin: themenbereich,
          auswahl: [
            { id: 'key_1', uri: 'uri_1' },
            { id: 'key_2', uri: 'uri_2' },
          ],
          content: 'content',
          children: [{ text: '' }],
        })
      })

      it('invert is invariant', () => {
        expect(invert(transform(input))).toMatchObject(input)
      })
    }
  )
})
