import type { Identifier } from 'src/domain/erfassung/ThemenbereicheAPI'
import {
  simplifySearch,
  ThemenbereicheAPI,
} from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { regEx } from 'test/regEx'

const withIdentifier = {
  identifier: {
    id: regEx.nonEmptyString,
    notation: regEx.nonEmptyString,
    uri: regEx.nonEmptyString,
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
    ['BNDG-G', 44, 7],
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
      definition: regEx.nonEmptyString,
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

  it('thesauri in themenbereich start with fachthesaurus', () => {
    const themenbereich = api.themenbereich({ notation: 'BNDG' })!
    const fachthesaurus = api.thesaurus({ id: themenbereich.thesauri[0] })!
    expect(fachthesaurus.identifier.notation).toBe('BNDG-X')
  })

  it('thesauri in themenbereich are sorted in reversed alphabetical order', () => {
    const thesauri = api
      .themenbereich({ notation: 'BNDG' })!
      .thesauri.map((id) => api.thesaurus({ id })!.identifier.notation)
    expect(thesauri).toMatchObject([
      'BNDG-X',
      'BNDG-N',
      'BNDG-M',
      'BNDG-K',
      'BNDG-H',
      'BNDG-G',
      'BNDG-F',
      'BNDG-E',
      'BNDG-D',
      'BNDG-C',
      'BNDG-B',
      'BNDG-A',
    ])
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
    expect(result[0].begriffe).toHaveLength(thesaurusB.begriffe.length)
    expect(result[1].begriffe).toHaveLength(thesaurusA.begriffe.length)
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

  describe('Fachbegriffe', () => {
    it('with notwendige Begriffe exists', () => {
      const result = api.begriff({ notation: 'BNDG-X774' })!
      expect(result.notwendigeBegriffe).not.toHaveLength(0)
    })

    it('with optionale Begriffe exists', () => {
      const result = api.begriff({ notation: 'BNDG-X434' })!
      expect(result.optionaleBegriffe).not.toHaveLength(0)
    })

    it('with mehrfach auswahl begriffs Set exists', () => {
      const result = api.begriff({ notation: 'BNDG-X717' })!
      expect(result.mehrfachAuswahlBegriffMengen).not.toHaveLength(0)
      result.mehrfachAuswahlBegriffMengen?.forEach((bag) => {
        expect(bag.elemente).not.toHaveLength(0)
      })
    })

    it('with einzel auswahl begriffs Set exists', () => {
      const result = api.begriff({ notation: 'BNDG-X980' })!
      expect(result.einzelAuswahlBegriffMengen).not.toHaveLength(0)
      result.einzelAuswahlBegriffMengen?.forEach((bag) => {
        expect(bag.elemente).not.toHaveLength(0)
      })
    })
  })

  describe('guards', () => {
    const other = '...'
    const themenbereich = api.themenbereich({ notation: 'BNDG' })!
    const thesaurus = api.themenbereich({ notation: 'BNDG-A' })!
    const begriff = api.begriff({ notation: 'BNDG-A460' })!

    it('isThemenbereich recognizes Themenbereich', () => {
      expect(
        ThemenbereicheAPI.guards.isThemenbereich(themenbereich)
      ).toBeTruthy()
    })

    it('isThemenbereich fails on different items', () => {
      expect(ThemenbereicheAPI.guards.isThemenbereich(other)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isThemenbereich(thesaurus)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isThemenbereich(begriff)).toBeFalsy()
    })

    it('isThesaurus recognizes Thesaurus', () => {
      expect(ThemenbereicheAPI.guards.isThesaurus(thesaurus)).toBeTruthy()
    })

    it('isThesaurus fails on different items', () => {
      expect(ThemenbereicheAPI.guards.isThesaurus(other)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isThesaurus(themenbereich)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isThesaurus(begriff)).toBeFalsy()
    })

    it('isBegriff recognizes Begriff', () => {
      expect(ThemenbereicheAPI.guards.isBegriff(begriff)).toBeTruthy()
    })

    it('isBegriff fails on different items', () => {
      expect(ThemenbereicheAPI.guards.isBegriff(other)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isBegriff(thesaurus)).toBeFalsy()
      expect(ThemenbereicheAPI.guards.isBegriff(themenbereich)).toBeFalsy()
    })
  })

  describe('ThemenbereichAPI.thesaurusToList', () => {
    it('returns undefined for unknown thesaurus', () => {
      expect(ThemenbereicheAPI.thesaurusToList(api, 'UNKNOWN')).toBeUndefined()
    })

    const liste = ThemenbereicheAPI.thesaurusToList(api, 'BNDG-A')!

    it('list conserves tree structure of thesaurus', () => {
      expect(liste).toMatchObject([
        { item: { identifier: { notation: 'BNDG-A239' } }, level: 0 },
        { item: { identifier: { notation: 'BNDG-A532' } }, level: 1 },
        { item: { identifier: { notation: 'BNDG-A345' } }, level: 2 },
        { item: { identifier: { notation: 'BNDG-A206' } }, level: 2 },
        { item: { identifier: { notation: 'BNDG-A507' } }, level: 1 },
        { item: { identifier: { notation: 'BNDG-A960' } }, level: 2 },
        { item: { identifier: { notation: 'BNDG-A415' } }, level: 2 },
        { item: { identifier: { notation: 'BNDG-A343' } }, level: 1 },
        { item: { identifier: { notation: 'BNDG-A460' } }, level: 0 },
        { item: { identifier: { notation: 'BNDG-A180' } }, level: 1 },
        { item: { identifier: { notation: 'BNDG-A284' } }, level: 1 },
      ])
    })

    it.each(liste)('$item.identifier.notation is Begriff', ({ item }) => {
      expect(ThemenbereicheAPI.guards.isBegriff(item)).toBe(true)
    })
  })
})
