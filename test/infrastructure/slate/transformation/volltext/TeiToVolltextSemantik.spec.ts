import { teiToVolltextSemantik } from 'src/infrastructure/slate/transformation/volltext/TeiToVolltextSemantik'

describe('TeiToVolltextSemantik', () => {
  it('Unknown elements get recognized as box', () => {
    const element = {
      data_origin: 'unknown',
      children: [{ text: 'Text' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('box')
  })

  it('recognizes "title" as werktitel', () => {
    const element = {
      data_origin: 'title',
      children: [{ text: 'Werktitel' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('werktitel')
  })

  it('recognizes "persName" with ref as person', () => {
    const element = {
      data_origin: 'persName',
      data_ref: 'ref',
      data_role: 'some roles and author',
      children: [{ text: 'Person' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('person')
  })

  it.each([
    ['BNDG', 'einband'],
    ['CODC', 'buchkunde'],
    ['FORM', 'ueberlieferungsform'],
  ])(
    'recognizes "ref" of type "subjectArea" with index of type "%s" as subject area',
    (notation, themenbereich) => {
      const element = {
        data_origin: 'ref',
        data_type: 'subjectArea',
        children: [
          { text: 'Blub' },
          {
            data_origin: 'index',
            data_indexName: notation,
            children: [{ text: '' }],
          },
        ],
      }
      expect(teiToVolltextSemantik(element)).toBe(themenbereich)
    }
  )

  it('recognizes "ref" of type "bibliography" as literatur', () => {
    const element = {
      data_origin: 'ref',
      data_type: 'bibliography',
      children: [{ text: 'Blub' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('literatur')
  })

  it('recognizes "persName" with role author as autor', () => {
    const element = {
      data_origin: 'persName',
      data_role: 'some roles and author',
      children: [{ text: 'Person' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('autor')
  })

  it('recognizes "orgName"', () => {
    const element = {
      data_origin: 'orgName',
      data_ref: 'ref',
      children: [{ text: 'Koerperschaft' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('koerperschaft')
  })

  it('recognizes "ref" with target as externer link', () => {
    const element = {
      data_origin: 'ref',
      data_target: 'uri',
      children: [{ text: 'Link' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('externerLink')
  })

  it('recognizes "quote" of type incipit as incipit', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'incipit',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('incipit')
  })

  it('recognizes "quote" of type explicit as explicit', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'explicit',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('explicit')
  })

  it('recognizes "quote" without type as zitat', () => {
    const element = {
      data_origin: 'quote',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('zitat')
  })

  it('recognizes "quote" with different type as zitat', () => {
    const element = {
      data_origin: 'quote',
      data_type: 'unknown',
      children: [{ text: 'Zitat' }],
    }
    expect(teiToVolltextSemantik(element)).toBe('zitat')
  })
})
