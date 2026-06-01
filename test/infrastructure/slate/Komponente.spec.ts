import type { Element } from 'slate'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { Komponente } from 'src/infrastructure/slate/Komponente'
import Loader from 'test/LoadPublic'

function emptyElement(props: Record<string, string>) {
  return {
    data_origin: 'UNDEFINED',
    children: [{ text: '' }],
    ...props,
  }
}

describe('Komponente.type', () => {
  it("recognizes 'history' as Geschichte", () => {
    const history = emptyElement({ data_origin: 'history' })
    expect(Komponente.type(history)).toBe('geschichte')
  })
  it("recognizes 'additional' as Literatur", () => {
    const additional = emptyElement({ data_origin: 'additional' })
    expect(Komponente.type(additional)).toBe('literatur')
  })
  it("recognizes 'physDesc' as Äußeres", () => {
    const physDesc = emptyElement({ data_origin: 'physDesc' })
    expect(Komponente.type(physDesc)).toBe('aeusseres')
  })
  it("recognizes 'mspart.type=other' as Sonstiges", () => {
    const msPart = emptyElement({
      data_origin: 'msPart',
      data_type: 'other',
    })
    expect(Komponente.type(msPart)).toBe('sonstiges')
  })
  it("doesn't recognize 'mspart' without type", () => {
    const msPart = emptyElement({ data_origin: 'msPart' })
    expect(Komponente.type(msPart)).toBeFalsy()
  })
})

describe('Lorem Ipsum: msDesc has only Komponenten as direct children', () => {
  const loremIpsum = Loader.loremIpsumXML()
  const msDesc: Element = HSPNode.findFirstElement(loremIpsum[0], [
    'text',
    'body',
    'msDesc',
  ])!
  it('msDesc is in lorem ipsum', () => {
    expect(msDesc).not.toBeFalsy()
  })
  it.each(msDesc.children as Element[])('%o is Komponente', (child) => {
    expect(Komponente.type(child)).not.toBeFalsy()
  })
})
