import type { Descendant, Element } from 'slate'
import { compose } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import { SerializationError } from 'src/domain/erfassung/transformation/SerializationError'
import { TEITransformation } from 'src/infrastructure/slate/transformation/TEITransformation'
import { XMLTransformation } from 'src/infrastructure/slate/transformation/XMLTransformation'

describe('TEITransformation', () => {
  describe('enriches xml with semantics by interpreting tei heuristics', () => {
    const { transform } = TEITransformation
    const attributes = {}
    const children = [{ text: '' }]
    it.each([
      ['history', { tag: 'history', attributes, children }],
      ['head', { tag: 'head', attributes, children }],
      ['msIdentifier', { tag: 'msIdentifier', attributes, children }],
      ['additional', { tag: 'additional', attributes, children }],
      ['physDesc', { tag: 'physDesc', attributes, children }],
      ['decoNoteform', { tag: 'decoNoteform', attributes, children }],
      [
        'decoNotecontent',
        { tag: 'decoNote', attributes: { type: 'content' }, children },
      ],
      ['notemusic', { tag: 'note', attributes: { type: 'music' }, children }],
      ['msItem', { tag: 'msItem', attributes, children }],
      [
        'msPartbooklet',
        { tag: 'msPart', attributes: { type: 'booklet' }, children },
      ],
      [
        'msPartfragment',
        { tag: 'msPart', attributes: { type: 'fragment' }, children },
      ],
      [
        'msPartaccMat',
        { tag: 'msPart', attributes: { type: 'accMat' }, children },
      ],
      [
        'msPartbinding',
        { tag: 'msPart', attributes: { type: 'binding' }, children },
      ],
      [
        'msPartother',
        { tag: 'msPart', attributes: { type: 'other' }, children },
      ],
    ])('recognizes component attribute for %s', (expected, element) => {
      expect(transform({ data: [element] })).toMatchObject({
        data: [
          {
            component: expected,
          },
        ],
      })
    })

    it('extends the path attribute', () => {
      const [element] = transform({
        data: [
          {
            tag: 'hello',
            attributes: {},
            children: [
              { tag: 'world', attributes: {}, children: [{ text: '' }] },
            ],
          },
        ],
      }).data
      expect(element).toMatchObject({
        path: '#document-hello',
        children: [{ path: '#document-hello-world' }],
      })
    })

    it.each([
      ['p', 'q', 'r', 'TEI', 'TEI', 'TEI'],
      ['p', 'q', 'additional', 'TEI', 'TEI', 'additional'],
      ['p', 'altIdentifier', 'r', 'TEI', 'altIdentifier', 'altIdentifier'],
      ['p', 'history', 'decoNoteform', 'TEI', 'history', 'decoNoteform'],
      ['physDesc', 'p', 'q', 'physDesc', 'physDesc', 'physDesc'],
      ['msPart', 'p', 'msIdentifier', 'msPart', 'msPart', 'msIdentifier'],
      ['msContents', 'msItem', 'p', 'msContents', 'msItem', 'msItem'],
      ['msContents', 'msItem', 'note', 'msContents', 'msItem', 'note'],
    ])(
      'regions of %s>%s>%s are %s>%s>%s',
      (tag1, tag2, tag3, expected1, expected2, expected3) => {
        expect(
          transform({
            data: [
              {
                tag: tag1,
                attributes: {},
                children: [
                  {
                    tag: tag2,
                    attributes: {},
                    children: [
                      {
                        tag: tag3,
                        attributes: {},
                        children: [{ text: 'Some text inside a paragraph' }],
                      },
                    ],
                  },
                ],
              },
            ],
          })
        ).toMatchObject({
          data: [
            {
              region: expected1,
              children: [
                {
                  region: expected2,
                  children: [
                    {
                      region: expected3,
                    },
                  ],
                },
              ],
            },
          ],
        })
      }
    )
  })

  describe('is composable with XMLTransformation', () => {
    const { transform, invert } = compose(XMLTransformation, TEITransformation)

    it('preserves basic structure', () => {
      const xml = '<hello>world</hello>'
      const output = transform({ data: xml })
      expect(output.data).toMatchObject([
        {
          data_origin: 'hello',
          children: [{ text: 'world' }],
        },
      ])
      expect(invert(output).data).toEqual(xml)
    })

    it('renames attributes', () => {
      const xml = '<hello xml:test="4" a="1" b="2" c="3">world</hello>'
      const output = transform({ data: xml })
      expect(output.data).toMatchObject([
        {
          data_origin: 'hello',
          data_a: '1',
          data_b: '2',
          data_c: '3',
          'data_xml:test': '4',
          children: [{ text: 'world' }],
        },
      ])
      expect(invert(output).data).toEqual(xml)
    })

    it('removes comments', () => {
      const xml = '<hello>world</hello><!-- remove me -->'
      const output = transform({ data: xml })
      expect(output.data).toMatchObject([
        {
          data_origin: 'hello',
          children: [{ text: 'world' }],
        },
      ])
      expect(invert(output).data).toEqual('<hello>world</hello>')
    })

    it('tracks level', () => {
      const xml =
        '<hello><world>Earth</world><galaxy>Milky Way</galaxy></hello>'
      const { data: beschreibung } = transform({ data: xml })
      expect(beschreibung).toMatchObject([
        {
          data_origin: 'hello',
          level: 1,
          children: [
            {
              data_origin: 'world',
              level: 2,
            },
            {
              data_origin: 'galaxy',
              level: 2,
            },
          ],
        },
      ])
    })

    it('remove texts according to tei spec', () => {
      const xml = '<hello>   world <galaxy> Milky Way  </galaxy> </hello>'
      const {
        data: [beschreibung],
      } = transform({ data: xml })
      const { children } = beschreibung as unknown as Element
      expect(children).toMatchObject([
        { text: 'world ' },
        { data_origin: 'galaxy', level: 2, children: [{ text: 'Milky Way' }] },
        { text: '' },
      ])
    })

    it('remove texts according to tei strip', () => {
      const xml =
        '<TEI>Remove<abstract>Remove</abstract>Remove<analytic>Remove</analytic><p>I am allowed to have mixed content</p></TEI>'
      const { data: beschreibung } = transform({ data: xml })
      expect(beschreibung).toMatchObject([
        {
          data_origin: 'TEI',
          children: [
            { data_origin: 'abstract', children: [{ text: '' }] },
            { data_origin: 'analytic', children: [{ text: '' }] },
            {
              data_origin: 'p',
              children: [{ text: 'I am allowed to have mixed content' }],
            },
          ],
        },
      ])
    })

    it('keeps whitespace of CDATA', () => {
      const xml = `<TEI><p><![CDATA[Hello
        World
      ]]></p></TEI>`

      expect(transform({ data: xml })).toMatchObject({
        data: [
          {
            children: [
              {
                children: [
                  {
                    text: 'Hello\n        World\n      ',
                  },
                ],
              },
            ],
          },
        ],
      })
    })
  })

  describe('handles corrupt data', () => {
    const { invert } = TEITransformation
    const corrupt = [undefined, { x: 1, y: 2 }] as unknown as Descendant[]
    let spy: jest.Mock
    beforeEach(() => {
      spy = jest.fn()
      jest.spyOn(console, 'error').mockImplementation(spy)
    })

    it('does not throw on corrupted data', () => {
      expect(() => invert({ data: corrupt })).not.toThrow()
    })

    it('produces serialization errors', () => {
      const { serializationErrors } = invert({ data: corrupt })
      expect(serializationErrors).toHaveLength(corrupt.length)
      serializationErrors?.forEach((error) => {
        expect(error).toMatchObject({
          level: 'error',
          errorCode: SerializationError.errorCode.TEITransformationError,
        })
      })
    })

    it('logs to error', () => {
      void invert({ data: corrupt })
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledTimes(corrupt.length)
    })
  })
})
