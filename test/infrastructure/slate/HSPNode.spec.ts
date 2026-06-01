import type { Descendant, Element } from 'slate'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { HSPText } from 'src/infrastructure/slate/HSPText'
import { regEx } from 'test/regEx'

function createElement(data_origin: string, children: Descendant[]): Element {
  return {
    data_origin,
    children,
  }
}

describe('HSPNode', () => {
  describe('findFirstText', () => {
    const text = { text: 'Hello world' }

    it('idempotent on text', () => {
      expect(HSPNode.findFirstText(text)).toBe(text)
    })

    it('works on element', () => {
      expect(
        HSPNode.findFirstText({
          data_origin: 'p',
          children: [
            {
              data_origin: 'a',
              children: [text, { text: '!' }],
            },
            { text: ' - ' },
          ],
        })
      ).toBe(text)
    })
  })

  describe('extractFirstText', () => {
    const needle = 'needle'
    const text = { text: needle }
    const o1 = createElement('haystack', [text])
    const o2 = createElement('haystack', [text, { text: 'invisible' }])
    const o3 = createElement('nested_haystack', [o1, o2])

    test.each([
      [text, needle],
      [o1, needle],
      [o2, needle],
      [o3, needle],
    ])('from %o should be "%s"', (element, text) => {
      expect(HSPNode.extractFirstText(element)).toBe(text)
    })
  })

  describe('extractText', () => {
    const node = {
      data_origin: 'test',
      children: [{ text: ' a ' }, { text: ' b ' }],
    }
    it('does trim it by default', () => {
      expect(HSPNode.extractText(node)).toBe('ab')
    })

    it('trim: false does not trim it', () => {
      expect(HSPNode.extractText(node, { trim: false })).toBe(' a  b ')
    })
  })

  describe('Guards', () => {
    const term = {
      data_origin: 'term',
      id: 'abc',
      data_type: 'something',
      children: [HSPText.emptyText()],
    }
    const children = [{ text: 'content' }]
    const missingRef = {
      data_origin: 'persName',
      children,
    }
    const invalidDataOrigin = {
      data_origin: 'invalidKey',
      data_ref: '123',
      children,
    }
    const person = {
      data_origin: 'persName',
      data_ref: '123',
      children,
    }
    const organisation = {
      data_origin: 'orgName',
      data_ref: '123',
      children,
    }
    const place = {
      data_origin: 'placeName',
      data_ref: '123',
      children,
    }

    it.each([
      ['has no ref attribute', missingRef],
      ['has invalid tag', invalidDataOrigin],
    ])(
      'isNormdatumElement recognizes element as not a normdatum, since it %s',
      (_, element) => {
        expect(HSPNode.isNormdatumElement(element)).toBe(false)
      }
    )

    it.each([
      ['person', person],
      ['organisation', organisation],
      ['place', place],
    ])(
      'isNormdatumElement recognizes %s element as a normdatum',
      (_, element) => {
        expect(HSPNode.isNormdatumElement(element)).toBe(true)
      }
    )

    it.each([
      [{ data_origin: 'lb', children: [{ text: '' }] }, true],
      [{ data_origin: 'lb', children: [{ text: 'invalid' }] }, false],
      [{ data_origin: 'invalid', children: [{ text: '' }] }, false],
      [{ text: 'invalid' }, false],
    ])('isLbElement %o == %p', (input, expected) => {
      expect(HSPNode.isLbElement(input)).toBe(expected)
    })

    it('lb element satisfies isVoidElement', () => {
      expect(HSPNode.isVoidElement(HSPElement.lbElement())).toBe(true)
    })

    it('text does not satisfy isVoidElement', () => {
      expect(HSPNode.isVoidElement(HSPText.emptyText())).toBe(false)
    })

    it('lb satisfies isInlineElement', () => {
      expect(HSPNode.isInlineElement(HSPElement.lbElement())).toBe(true)
    })

    it('lb satisfies isEmptyElement', () => {
      expect(HSPNode.isEmptyElement(HSPElement.lbElement())).toBe(true)
    })

    it.each([
      [term, true],
      [{ ...term, data_type: 1 }, false],
      [{ ...term, id: 1 }, true],
      [{ data_origin: 'term', children }, false],
    ])('isTermElement %o == %p', (input, expected) => {
      expect(HSPNode.isTermElement(input)).toBe(expected)
    })

    it.each([
      [{ ...term, data_type: 'textLang-ID' }, true],
      [term, false],
    ])('isGrundspracheTermElement %o == %p', (input, expected) => {
      expect(HSPNode.isGrundspracheTermElement(input)).toBe(expected)
    })

    it.each([
      [{ ...term, data_type: 'origPlace_norm' }, true],
      [term, false],
    ])('isOrigPlaceNormElement %o == %p', (input, expected) => {
      expect(HSPNode.isOrigPlaceNormElement(input)).toBe(expected)
    })

    test.each([
      [HSPText.emptyText(), true],
      [HSPText.normalizedText('x'), false],
      [HSPText.normalizedText(' '), false],
      [HSPElement.lbElement(), false],
    ])('isEmptyText %o == %p', (input, expected) => {
      expect(HSPNode.isEmptyText(input)).toBe(expected)
    })
  })

  describe('findFirstElement', () => {
    const xABTree = {
      data_origin: 'x',
      children: [
        {
          data_origin: 'a',
          children: [
            {
              data_origin: 'b',
              children: [{ data_origin: 'c', children: [{ text: 'exists' }] }],
            },
            {
              data_origin: 'b2',
              children: [{ data_origin: 'c', children: [{ text: 'exists' }] }],
            },
          ],
        },
        {
          data_origin: 'a',
          children: [
            {
              data_origin: 'e',
              children: [{ text: 'not reachable' }],
            },
          ],
        },
      ],
    }
    test.each([
      [['a', 'b', 'c'], true],
      [['a', 'b2', 'c'], true],
      [['a', 'b', 'd'], false],
      [['a', 'e'], false],
    ])('findFirstsElements: %o', (dataOriginPath, expected) => {
      expect(!!HSPNode.findFirstElement(xABTree, dataOriginPath)).toBe(expected)
    })
  })

  describe('copy', () => {
    it('copies element with new uuids and text with attributes', () => {
      const node = {
        data_origin: 'x',
        id: '1',
        children: [
          {
            data_origin: 'a',
            id: '2',
            children: [{ text: 'b', marked: true }],
          },
          { data_origin: 'c', id: '3', children: [{ text: 'd' }] },
        ],
      }
      const copy = HSPNode.copy(node)

      expect(copy).toMatchObject({
        data_origin: 'x',
        id: regEx.isUuid,
        children: [
          {
            data_origin: 'a',
            id: regEx.isUuid,
            children: [{ text: 'b', marked: true }],
          },
          {
            data_origin: 'c',
            id: regEx.isUuid,
            children: [{ text: 'd' }],
          },
        ],
      })
    })
  })
})
