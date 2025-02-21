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

import {
  Identifier,
  simplifySearch,
  ThemenbereicheAPI,
} from '../../../src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from '../../infrastructure/normdaten/fixtures/einband.json'
import { nonEmptyString } from '../../regEx'

const withIdentifier = {
  identifier: {
    id: nonEmptyString,
    notation: nonEmptyString,
    uri: nonEmptyString,
  },
}

function expectFindAllIdentifier(
  find:
    | ThemenbereicheAPI['thesaurus']
    | ThemenbereicheAPI['themenbereich']
    | ThemenbereicheAPI['begriff'],
  identifier: Identifier
) {
  const byId = find({ id: identifier.id })
  const byNotation = find({ notation: identifier.notation })
  const byURI = find({ uri: identifier.uri })
  expect(byId).toBe(byNotation)
  expect(byId).toBe(byURI)
}

describe('ThemenbereichAPI', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)

  it.each([
    ['themenbereich', api.themenbereich],
    ['thesaurus', api.thesaurus],
    ['begriff', api.begriff],
  ])('%s with id "invalid" returns undefined', (_, find) => {
    expect(find({ id: 'INVALID' })).toBeUndefined()
  })

  it(`find themenbereich with id ${einband.id}}`, () => {
    const themenbereich = api.themenbereich({ id: einband.id })!
    expect(themenbereich).toMatchObject(withIdentifier)
    expectFindAllIdentifier(api.themenbereich, themenbereich.identifier)
  })

  it(`find themenbereich with notation "BNDG"`, () => {
    const themenbereich = api.themenbereich({ notation: 'BNDG' })!
    expect(themenbereich).toMatchObject(withIdentifier)
    expectFindAllIdentifier(api.themenbereich, themenbereich.identifier)
  })

  it.each([
    ['BNDG-A', 11, 2],
    ['BNDG-B', 16, 6],
    ['BNDG-C', 15, 4],
    ['BNDG-G', 39, 2],
  ])(
    'find thesaurus with notation "%s" has %d begriffe and %d unterbegriffe',
    (notation, begriffeAnzahl, unterBegriffeAnzahl) => {
      const thesaurus = api.thesaurus({ notation })!
      expect(thesaurus).toMatchObject(withIdentifier)
      expectFindAllIdentifier(api.thesaurus, thesaurus.identifier)
      expect(thesaurus.begriffe).toHaveLength(begriffeAnzahl)
      expect(thesaurus.unterBegriffe).toHaveLength(unterBegriffeAnzahl)
    }
  )

  it.each(['BNDG-G117', 'BNDG-E978', 'BNDG-M340'])(
    'find root begriff with notation "%s"',
    (notation) => {
      const begriff = api.begriff({ notation })!
      expect(begriff).toMatchObject(withIdentifier)
      expectFindAllIdentifier(api.begriff, begriff.identifier)
      expect(begriff.isRoot).toBeTruthy()
    }
  )

  it.each(['BNDG-M878', 'BNDG-C666', 'BNDG-A345'])(
    'find leaf begriff with notation "%s"',
    (notation) => {
      const begriff = api.begriff({ notation })!
      expect(begriff).toMatchObject(withIdentifier)
      expectFindAllIdentifier(api.begriff, begriff.identifier)
      expect(begriff.isLeaf).toBeTruthy()
    }
  )

  it('begriff "BNDG-A960" has definition', () => {
    const begriff = api.begriff({ notation: 'BNDG-A960' })
    expect(begriff).toMatchObject(withIdentifier)
    expect(begriff).toMatchObject({
      definition: nonEmptyString,
    })
  })

  it('begriff "BNDG-F310" has no definition', () => {
    const begriff = api.begriff({ notation: 'BNDG-F310' })
    expect(begriff).toMatchObject(withIdentifier)
    expect(begriff).not.toHaveProperty('definition')
  })

  it('all thesauri and begriffe yield finite path', () => {
    function expectBegriffe(begriffe: readonly string[]) {
      begriffe.forEach((id) => {
        const begriff = api.begriff({ id })!
        expect(begriff).toMatchObject(withIdentifier)
        expectBegriffe(begriff.unterBegriffe)
      })
    }

    const themenbereich = api.themenbereich({ notation: 'BNDG' })!
    expect(themenbereich).toMatchObject(withIdentifier)
    themenbereich.thesauri.forEach((id) => {
      const thesaurus = api.thesaurus({ id })!
      expect(thesaurus).toMatchObject(withIdentifier)
      expectBegriffe(thesaurus.unterBegriffe)
    })
  })

  it('finds nothing if themenbereich notation is not legal', () => {
    expect(api.search('INVALID', 'BNDG-B')).toHaveLength(0)
  })

  it('finds nothing if search term is empty', () => {
    expect(api.search('BNDG', '')).toHaveLength(0)
  })

  it('finds exact notation', () => {
    const result = api.search('BNDG', 'BNDG-A960')
    expect(result).toHaveLength(1)
    expect(result[0].begriffe).toHaveLength(1)
  })

  it('finds in label of begriff', () => {
    const result = api.search('BNDG', 'Kettenstichhef')
    expect(result).toHaveLength(1)
    expect(result[0].begriffe).toHaveLength(1)
    expect(result[0].begriffe[0].identifier.notation).toBe('BNDG-B285')
  })

  it('finds in altLabel of begriff', () => {
    const result = api.search('BNDG', 'Sonstige Heftungsart')
    expect(result).toHaveLength(1)
    expect(result[0].begriffe).toHaveLength(1)
    expect(result[0].begriffe[0].identifier.notation).toBe('BNDG-B869')
  })

  it.each(['(', ')', '([|', '*'])(
    'does not throw on search term "%s"',
    (searchTerm) => {
      expect(() => api.search('BNDG', searchTerm)).not.toThrow()
    }
  )

  it('finds all begriffe of a thesaurus', () => {
    const result = api.search('BNDG', 'BNDG-B')
    const thesaurus = api.thesaurus({ notation: 'BNDG-B' })!
    expect(result).toHaveLength(1)
    expect(result[0].begriffe).toHaveLength(thesaurus.begriffe.length)
  })

  it('searchTerm supports regex expression', () => {
    const result = api.search('BNDG', 'BNDG-(A|B)')
    const thesaurusA = api.thesaurus({ notation: 'BNDG-A' })!
    const thesaurusB = api.thesaurus({ notation: 'BNDG-B' })!
    expect(result).toHaveLength(2)
    expect(result[0].begriffe).toHaveLength(thesaurusA.begriffe.length)
    expect(result[1].begriffe).toHaveLength(thesaurusB.begriffe.length)
  })

  it.each([
    ['abc', 'abc'],
    ['a*b(c', 'abc'],
    ['a(b)c|', 'abc'],
    ['a|||[])bc(', 'abc'],
    ['a+b.*c', 'abc'],
    ['a\\bc', 'a\\\\bc'],
  ])('search "%s" becomes "%s"', (search, expected) => {
    expect(simplifySearch(search)).toMatch(expected)
  })
})
