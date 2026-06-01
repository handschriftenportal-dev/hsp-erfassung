import type { Element } from 'slate'
import type { WithErrors } from 'src/domain/erfassung/transformation/WithErrors'
import { InlineTransformation } from 'src/infrastructure/slate/transformation/volltext/InlineTransformation'

describe('InlineTransformation', () => {
  const base = {
    children: [{ text: 'Base element' }],
  }

  it.each([
    [{ ...base, data_origin: 'tei' }, 'box'],
    [{ ...base, data_origin: 'ref', data_type: 'bibliography' }, 'literatur'],
    [{ ...base, data_origin: 'title' }, 'werktitel'],
    [
      { ...base, data_origin: 'persName', data_ref: 'xxx', data_role: 'xxx' },
      'person',
    ],
    [{ ...base, data_origin: 'persName', data_role: 'author' }, 'autor'],
    [
      {
        ...base,
        data_origin: 'ref',
        data_target: 'http://handschriftenportal.de',
      },
      'externerLink',
    ],
    [{ ...base, data_origin: 'ref' }, 'box'],
    [
      {
        data_origin: 'quote',
        data_type: 'incipit',
        children: [{ text: 'hi' }],
      },
      'incipit',
    ],

    [
      {
        data_origin: 'quote',
        data_type: 'incipit',
        children: [
          { text: 'hi' },
          {
            data_origin: 'index',
            data_indexName: 'initia',
            children: [
              {
                data_origin: 'term',
                data_key: 'NORM-123',
                data_ref: 'https://normdatenservice/NORM-123',
                children: [{ text: '' }],
              },
            ],
          },
        ],
      },
      'initium',
    ],
  ])('Element %p is transformed to %s', (node, origin) => {
    const {
      data: { data_origin },
    } = InlineTransformation.transform({ data: node }) as WithErrors<Element>
    expect(data_origin).toBe(origin)
  })

  it('Texts are invariant under transformation and inversion', () => {
    const text = { data: { text: 'Fixpoint' } }
    expect(InlineTransformation.transform(text)).toEqual(text)
    expect(InlineTransformation.invert(text)).toEqual(text)
  })
})
