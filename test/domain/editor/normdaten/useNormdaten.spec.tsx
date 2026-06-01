import { findIDOrName } from 'src/domain/editor/normdaten/useNormdaten'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

describe('useNormdaten', () => {
  describe('findIDOrName', () => {
    function newReferenzWithBoxAttributes(
      attributes: Record<string, string>
    ): VolltextNormdatum {
      return {
        data_origin: 'person',
        content: 'text',
        box: {
          data_origin: 'tag',
          children: [{ text: 'text' }],
          ...attributes,
        },
        children: [{ text: '' }],
      }
    }

    it('by Key', () => {
      expect(
        findIDOrName(newReferenzWithBoxAttributes({ data_key: 'key' }))
      ).toEqual('key')
    })

    it('by Ref', () => {
      expect(
        findIDOrName(newReferenzWithBoxAttributes({ data_ref: 'ref' }))
      ).toEqual('ref')
    })

    it('by text', () => {
      expect(findIDOrName(newReferenzWithBoxAttributes({}))).toEqual('text')
    })
  })
})
