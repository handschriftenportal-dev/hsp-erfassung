/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { findIDOrName } from '../../../../src/domain/editor/normdaten/useNormdaten'
import { VolltextNormdatum } from '../../../../src/infrastructure/slate/volltext/VolltextElement'

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
