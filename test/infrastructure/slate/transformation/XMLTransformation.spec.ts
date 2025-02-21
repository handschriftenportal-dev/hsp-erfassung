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

import { Diagnostics } from '../../../../src/infrastructure/nachweis/ValidationResponse'
import { XMLTransformation } from '../../../../src/infrastructure/slate/transformation/XMLTransformation'

describe('XMLTransformation', () => {
  const { transform, invert } = XMLTransformation
  it('invariance of transformation and inversion of simple xml', () => {
    const data = '<hello a="1"><world b="1">hi</world></hello>'
    const output = transform({ data })
    expect(output).toEqual({
      data: [
        {
          tag: 'hello',
          attributes: {
            a: '1',
          },
          children: [
            {
              tag: 'world',
              attributes: {
                b: '1',
              },
              children: [{ text: 'hi' }],
            },
          ],
        },
      ],
    })
    expect(invert(output)).toMatchObject({ data })
  })

  it('transformation preserves whitespaces between tags', () => {
    const data = '<hello> <world   a="1">\n</world>\t</hello>'
    const output = transform({ data })
    expect(output.data).toEqual([
      {
        tag: 'hello',
        attributes: {},
        children: [
          { text: ' ' },
          {
            tag: 'world',
            attributes: {
              a: '1',
            },
            children: [{ text: '\n' }],
          },
          { text: '\t' },
        ],
      },
    ])
    expect(invert(output).data).toBe('<hello> <world a="1" />\t</hello>')
  })

  it('transformation ignores whitespace before and after root tag', () => {
    const data = '   \n\t  <hello><world a="1">hi</world></hello>  \n\t '
    const output = transform({ data })
    expect(output.data).toMatchObject([
      {
        tag: 'hello',
      },
    ])
    expect(invert(output)).toMatchObject({ data: data.trim() })
  })

  it('ignores xml comments', () => {
    const comment = ' this is a comment '
    const data = `<hello><!--${comment}--></hello>`
    const output = transform({ data })
    expect(output.data).toEqual([
      {
        tag: 'hello',
        attributes: {},
        children: [{ comment }],
      },
    ])
    expect(invert(output)).toMatchObject({ data })
  })

  it('ignores xml CDATA', () => {
    const data = 'xml <, &, \', ", *is* %COMPLICATED%'
    const xml = `<hello><![CDATA[${data}]]></hello>`
    const output = transform({ data: xml })
    expect(output.data).toEqual([
      {
        tag: 'hello',
        attributes: {},
        children: [{ data }],
      },
    ])
    expect(invert(output)).toMatchObject({ data: xml })
  })

  it('handles document type system node', () => {
    const data = '<!DOCTYPE hello SYSTEM "example.dtd"><hello>world</hello>'
    const {
      data: [doctype, hello],
    } = transform({ data }) as any
    expect(doctype).toMatchObject({
      doctype: { name: 'hello', systemId: 'example.dtd' },
    })
    expect(invert({ data: [doctype, hello] })).toMatchObject({ data })
  })
  it('handles document type public node', () => {
    const data =
      '<!DOCTYPE hello PUBLIC "identifier" "example.dtd"><hello>world</hello>'
    const {
      data: [doctype, hello],
    } = transform({ data }) as any
    expect(doctype).toMatchObject({
      doctype: {
        name: 'hello',
        publicId: 'identifier',
        systemId: 'example.dtd',
      },
    })
    expect(invert({ data: [doctype, hello] })).toMatchObject({ data })
  })

  describe('handles detailsError input', () => {
    const data = '<hello>world</hello>'
    const root = {
      tag: 'hello',
      attributes: {},
      children: [{ text: 'world' }],
    }
    const diagnostics: Diagnostics = [
      { languageCode: 'de', message: 'Fehler' },
      { languageCode: 'en', message: 'Mistake' },
    ]
    it('when empty', () => {
      const output = transform({ data, detailErrors: [] })
      expect(output).toEqual({ data: [root] })
    })

    it('on root element', () => {
      const output = transform({
        data,
        detailErrors: [
          {
            xpath: '/*:hello[1]',
            error: 'error',
            diagnostics,
          },
        ],
      })
      expect(output.data).toEqual([
        {
          ...root,
          error: [
            {
              de: 'Fehler',
              en: 'Mistake',
            },
          ],
        },
      ])
      expect(invert(output)).toMatchObject({ data })
    })

    it.each([
      '/*:tags[1]:not[2]:existing[3]',
      'Malformed/*123Xpath',
      '/*:hello[-1]',
      '/*:hello[]',
      '/*:hello[2]',
    ])('handles wrong xpath %s gracefully', (xpath) => {
      const output = transform({
        data,
        detailErrors: [
          {
            xpath,
            error: 'error',
            diagnostics,
          },
        ],
      })
      expect(output.data).toEqual([root])
      expect(invert(output)).toMatchObject({ data })
    })

    it('attaches multiple errors to same element', () => {
      const xpath = '/*:hello[1]'
      const output = transform({
        data,
        detailErrors: [
          {
            xpath,
            error: 'error',
            diagnostics,
          },
          {
            xpath,
            error: 'another error',
            diagnostics,
          },
        ],
      })
      expect(output.data).toEqual([
        {
          ...root,
          error: [
            {
              de: 'Fehler',
              en: 'Mistake',
            },
            {
              de: 'Fehler',
              en: 'Mistake',
            },
          ],
        },
      ])
      expect(invert(output)).toMatchObject({ data })
    })

    it('works with multiple, nested errors', () => {
      const data = '<a><b><c>hello</c><c><d>world</d></c></b></a>'
      const error = [
        {
          de: 'Fehler',
          en: 'Mistake',
        },
      ]
      const {
        data: [
          {
            children: [
              {
                children: [c1, c2],
              },
            ],
          },
        ],
      } = transform({
        data,
        detailErrors: [
          {
            xpath: '/*:a[1]/*:b[1]/*:c[1]',
            error: 'to first c',
            diagnostics,
          },
          {
            xpath: '/*:a[1]/*:b[1]/*:c[2]',
            error: 'to second c',
            diagnostics,
          },
          {
            xpath: '/*:a[1]/*:b[1]/*:c[2]/*:d[1]',
            error: 'to first d',
            diagnostics,
          },
        ],
      }) as any
      expect(c1).toMatchObject({ error })
      expect(c2).toMatchObject({ error })
      const {
        children: [d],
      } = c2
      expect(d).toMatchObject({ error })
    })
  })
})
