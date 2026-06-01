import { InitiumTransformation } from 'src/infrastructure/slate/transformation/volltext/inline/InitiumTransformation'

describe('InitiumTransformation', () => {
  const { transform, invert } = InitiumTransformation

  describe('transform', () => {
    it('transforms TEInitiumKodierung element with data_ref and data_key', () => {
      const input = {
        data: {
          data_origin: 'quote',
          data_type: 'incipit',
          children: [
            { text: 'In principio erat verbum' },
            {
              data_origin: 'index',
              data_indexName: 'initia',
              children: [
                {
                  data_origin: 'term',
                  data_key: 'initium-123',
                  data_ref: 'https://example.com/initium/123',
                  children: [{ text: '' }],
                },
              ],
            },
          ],
        },
      }

      expect(transform(input)).toMatchObject({
        data_origin: 'initium',
        content: 'In principio erat verbum',
        initium: {
          id: 'initium-123',
          uri: 'https://example.com/initium/123',
        },
        children: [{ text: '' }],
      })
    })

    it('transforms element without data_ref and data_key to empty initium', () => {
      const input = {
        data: {
          data_origin: 'quote',
          data_type: 'incipit',
          children: [{ text: 'Some text without initium' }],
        },
      }

      expect(transform(input)).toMatchObject({
        data_origin: 'initium',
        content: 'Some text without initium',
        initium: {
          id: '',
          uri: '',
        },
        children: [{ text: '' }],
      })
    })
  })

  describe('invert', () => {
    it('is invariant for complete initium', () => {
      const input = {
        data: {
          data_origin: 'quote',
          data_type: 'incipit',
          children: [
            { text: 'In principio erat verbum' },
            {
              data_origin: 'index',
              data_indexName: 'initia',
              children: [
                {
                  data_origin: 'term',
                  data_key: 'initium-123',
                  data_ref: 'https://example.com/initium/123',
                  children: [{ text: '' }],
                },
              ],
            },
          ],
        },
      }

      expect(invert(transform(input))).toMatchObject(input)
    })

    it('inverts VolltextInitium back to TEInitiumKodierung structure', () => {
      expect(
        invert({
          data_origin: 'initium',
          content: 'Test content',
          initium: {
            id: 'test-id',
            uri: 'https://test.com/uri',
          },
          children: [{ text: '' }],
        })
      ).toMatchObject({
        data: {
          data_origin: 'quote',
          data_type: 'incipit',
          children: [
            { text: 'Test content' },
            {
              data_origin: 'index',
              data_indexName: 'initia',
              children: [
                {
                  data_origin: 'term',
                  data_key: 'test-id',
                  data_ref: 'https://test.com/uri',
                  children: [{ text: '' }],
                },
              ],
            },
          ],
        },
      })
    })
  })
})
