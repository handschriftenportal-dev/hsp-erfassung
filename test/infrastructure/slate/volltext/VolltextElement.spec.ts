import type { Element } from 'slate'
import { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { VolltextElement } from 'src/infrastructure/slate/volltext/VolltextElement'

describe('VolltextElement', () => {
  const baseElement = {
    children: [{ text: '' }],
  }
  const { boxen, bloecke, formatierungen, referenzen } = VolltextSemantik
  const tei = ['note', 'decoNote', 'index', 'term', 'msDesc', 'TEI', 'p', 'lb']

  describe('Typ', () => {
    it.each([
      [tei, undefined],
      [boxen, 'box'],
      [bloecke, 'block'],
      [formatierungen, 'formatierung'],
      [referenzen, 'referenz'],
    ])('von Elementen mit Origin %p ist %s', (origins, typ) => {
      origins.forEach((data_origin) => {
        expect(VolltextElement.typ({ ...baseElement, data_origin })).toBe(typ)
      })
    })
  })

  describe('Type Guards', () => {
    const {
      isVolltextBlock,
      isVolltextBox,
      isVolltextFormatierung,
      isVolltextReferenz,
    } = VolltextElement
    it.each([
      [
        'sind nicht für TEI Elemente erfüllt',
        tei,
        {
          isBox: false,
          isBlock: false,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Box Elemente erfüllen nur isVolltextBox',
        boxen,
        {
          isBox: true,
          isBlock: false,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Block Elemente erfüllen nur isVolltextBlock',
        bloecke,
        {
          isBox: false,
          isBlock: true,
          isReferenz: false,
          isFormatierung: false,
        },
      ],
      [
        'für Formatierung Elemente erfüllen nur isVolltextFormatierung',
        formatierungen,
        {
          isBox: false,
          isBlock: false,
          isReferenz: false,
          isFormatierung: true,
        },
      ],
      [
        'für Referenz Elemente erfüllen nur isVolltextReferenz',
        referenzen,
        {
          isBox: false,
          isBlock: false,
          isReferenz: true,
          isFormatierung: false,
        },
      ],
    ])('%s', (_, origins, expected) => {
      origins.forEach((data_origin: string) => {
        const element = { ...baseElement, data_origin }
        expect({
          isBox: isVolltextBox(element),
          isBlock: isVolltextBlock(element),
          isReferenz: isVolltextReferenz(element),
          isFormatierung: isVolltextFormatierung(element),
        }).toEqual(expected)
      })
    })
  })

  describe('style', () => {
    it('person of role author has font-variant small-caps', () => {
      expect(
        VolltextElement.style({
          data_origin: 'person',
          children: [{ text: '' }],
          content: 'Archimedes',
          box: {
            data_origin: 'persName',
            data_ref: 'https://d-nb.info/gnd/118503863',
            data_role: 'author',
            children: [{ text: 'Archimedes' }],
          } as Element,
        })
      ).toMatchObject({
        fontVariant: 'small-caps',
      })
    })

    it('person which is not an author does not is in small-caps', () => {
      expect(
        VolltextElement.style({
          data_origin: 'person',
          children: [{ text: '' }],
          content: 'Archimedes',
          box: {
            data_origin: 'persName',
            data_ref: 'https://d-nb.info/gnd/118503863',
            data_role: 'scribe other',
            children: [{ text: 'Archimedes' }],
          } as Element,
        })
      ).not.toMatchObject({
        fontVariant: 'small-caps',
      })
    })

    it('ort is not in small-caps', () => {
      expect(
        VolltextElement.style({
          data_origin: 'ort',
          children: [{ text: '' }],
          content: 'Berlin',
          box: {
            data_origin: 'placeName',
            data_ref: 'https://d-nb.info/gnd/4005728-8',
            data_role: 'author',
            children: [{ text: 'Berlin' }],
          } as Element,
        })
      ).not.toMatchObject({
        fontVariant: 'small-caps',
      })
    })

    it('VolltextThemenbereich is not in small-caps', () => {
      expect(
        VolltextElement.style({
          data_origin: 'einband',
          auswahl: [
            { id: 'key_1', uri: 'uri_1' },
            { id: 'key_2', uri: 'uri_2' },
          ],
          content: 'xxx',
          children: [{ text: '' }],
        })
      ).not.toMatchObject({
        fontVariant: 'small-caps',
      })
    })
  })
})
