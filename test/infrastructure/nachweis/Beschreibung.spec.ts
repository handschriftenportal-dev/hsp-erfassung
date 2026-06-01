import { Beschreibung } from 'src/infrastructure/nachweis/Beschreibung'
import Loader from 'test/LoadPublic'

describe('Create Beschreibung from Editor', () => {
  const description = Loader.loremIpsumXML()

  const beschreibung = Beschreibung.create(description)
  test('Signature can be extracted', () => {
    expect(beschreibung.signature).toBe('Cod. ms. Bord. 1')
  })
  test('Type can be extracted', () => {
    expect(beschreibung.type).toBe('hsp:description')
  })

  it('msDesc can be extracted', () => {
    const msDesc = Beschreibung.getMsDesc(description)
    expect(msDesc).toBeDefined()
  })
  it('msDesc can be from lorem ipsum', () => {
    const xmlRepresentation = Loader.loremIpsumXML()
    const msDesc = Beschreibung.getMsDesc(xmlRepresentation)
    expect(msDesc).toBeDefined()
  })
})
