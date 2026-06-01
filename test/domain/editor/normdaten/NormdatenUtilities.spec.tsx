import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { VolltextReferenz } from 'src/infrastructure/slate/volltext/VolltextElement'

describe('NormdatenUtilities', () => {
  const { elementToNormdatenTEIElement, idToUrl, urlToId } = NormdatenUtilities
  const url_prefix = 'https://normdaten.com/'
  describe('Extracting a gnd identifier from a gnd url', () => {
    it('works expected at the happy path', () => {
      const identifier = '12345678'
      const url = url_prefix + identifier
      expect(urlToId(url)).toBe(identifier)
    })

    it('trims the result', () => {
      const identifier = '12345678'
      const url = `   ${url_prefix}      ${identifier}   `
      expect(urlToId(url)).toBe(identifier)
    })

    it('extracts from different urls', () => {
      const identifier = '12345678'
      const baseUrl = 'https://some/other/url/'
      const url = baseUrl + identifier
      expect(urlToId(url)).toBe(identifier)
    })
  })

  it.each([
    'https://d-nb.info/gnd/118503863',
    'https://d-nb.info/gnd/4005728-8',
    'https://normdaten.staatsbibliothek-berlin.de/data/authority-file/NORM-5108c216-2963-3009-9d28-956c37fe60d1',
    'https://normdaten.staatsbibliothek-berlin.de/data/authority-file/NORM-5ef698cd-9fe6-3092-bea3-31c15af3b160',
  ])('is invariant on real uris', (url) => {
    expect(idToUrl(urlToId(url))).toBe(url)
  })

  describe('Extracting NormdatenTEIElement from Element', () => {
    const text = { text: 'hello world' }
    const wrapper: VolltextReferenz = {
      data_origin: 'ort',
      box: {
        data_origin: 'placeName',
        children: [text],
        data_ref: 'http://some/ref',
        data_role: 'role',
        data_key: 'key',
      },
      content: text.text,
      children: [{ text: '' }],
    }

    it('contains trimed data_role', () => {
      const result = elementToNormdatenTEIElement(wrapper)
      expect(result.role).toBe('role')
    })
    it('contains extracted gnd identifier', () => {
      const result = elementToNormdatenTEIElement(wrapper)
      expect(result.gndIdentifierOption).toBe('ref')
    })
    it('contains text with reduced whitespaces', () => {
      const result = elementToNormdatenTEIElement(wrapper)
      expect(result.normdatenText).toBe('hello world')
    })
    it('contains data_origin', () => {
      const result = elementToNormdatenTEIElement(wrapper)
      expect(result.dataOrigin).toBe(wrapper.data_origin)
    })
    it('contains key', () => {
      const result = elementToNormdatenTEIElement(wrapper)
      expect(result.identifier).toBe('key')
    })
  })
})
