import { uniq } from 'lodash'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import subjectArea from 'test/infrastructure/normdaten/fixtures/ueberlieferungsform.json'
import { regEx } from 'test/regEx'

describe('HSPElement', () => {
  it('can create lb element', () => {
    expect(HSPElement.lbElement()).toEqual({
      data_origin: 'lb',
      children: [{ text: '' }],
    })
  })

  describe('termElement', () => {
    it('can create empty term element', () => {
      expect(HSPElement.termElement('term_type').createEmpty()).toMatchObject({
        data_origin: 'term',
        data_type: 'term_type',
        children: [{ text: '' }],
      })
    })

    it('can create term element from GNDEntityFact', () => {
      expect(
        HSPElement.termElement('term_type').fromGNDEntityFact({
          id: '1',
          preferredName: 'hallo welt',
          gndIdentifier: '123',
        })
      ).toMatchObject({
        data_origin: 'term',
        data_type: 'term_type',
        data_key: '1',
        data_ref: NormdatenUtilities.idToUrl('123'),
        children: [{ text: 'hallo welt' }],
      })
    })

    it('can create term element from Begriff', () => {
      expect(
        HSPElement.termElement('term_type').fromBegriff({
          identifier: {
            id: '1',
            uri: 'http://example.com/BNDG-A123',
            notation: 'BNDG-A123',
          },
          label: 'label',
          altLabels: [],
          isRoot: false,
          isLeaf: false,
          themenbereich: 'BNDG',
          thesaurus: 'BNDG-A',
          unterBegriffe: [],
          notwendigeBegriffe: [],
          optionaleBegriffe: [],
          einzelAuswahlBegriffMengen: [],
          mehrfachAuswahlBegriffMengen: [],
        })
      ).toMatchObject({
        data_origin: 'term',
        data_type: 'term_type',
        data_key: '1',
        data_ref: 'http://example.com/BNDG-A123',
        children: [{ text: 'label' }],
      })
    })

    it('can create fromBegriff with text', () => {
      expect(
        HSPElement.termElement('term_type').fromBegriff(
          {
            identifier: {
              id: '1',
              uri: 'http://example.com/BNDG-A123',
              notation: 'BNDG-A123',
            },
            label: 'label',
            altLabels: [],
            isRoot: false,
            isLeaf: false,
            themenbereich: 'BNDG',
            thesaurus: 'BNDG-A',
            unterBegriffe: [],
            notwendigeBegriffe: [],
            optionaleBegriffe: [],
            einzelAuswahlBegriffMengen: [],
            mehrfachAuswahlBegriffMengen: [],
          },
          { withoutText: false }
        )
      ).toMatchObject({
        data_origin: 'term',
        data_type: 'term_type',
        data_key: '1',
        data_ref: 'http://example.com/BNDG-A123',
        children: [{ text: 'label' }],
      })
    })

    it('can create fromBegriff without text', () => {
      expect(
        HSPElement.termElement('term_type').fromBegriff(
          {
            identifier: {
              id: '1',
              uri: 'http://example.com/BNDG-A123',
              notation: 'BNDG-A123',
            },
            label: 'label',
            altLabels: [],
            isRoot: false,
            isLeaf: false,
            themenbereich: 'BNDG',
            thesaurus: 'BNDG-A',
            unterBegriffe: [],
            notwendigeBegriffe: [],
            optionaleBegriffe: [],
            einzelAuswahlBegriffMengen: [],
            mehrfachAuswahlBegriffMengen: [],
          },
          { withoutText: true }
        )
      ).toMatchObject({
        data_origin: 'term',
        data_type: 'term_type',
        data_key: '1',
        data_ref: 'http://example.com/BNDG-A123',
        children: [{ text: '' }],
      })
    })
  })

  describe('formatElementFactory', () => {
    it('can create empty elements', () => {
      expect(HSPElement.formatElementFactory(undefined, '')).toMatchObject([
        { data_origin: 'term', data_type: 'format', children: [{ text: '' }] },
        {
          data_origin: 'term',
          data_type: 'format_typeOfInformation',
          children: [{ text: '' }],
        },
      ])
    })

    it('can create empty elements with type text', () => {
      expect(
        HSPElement.formatElementFactory(undefined, 'deduced')
      ).toMatchObject([
        { data_origin: 'term', data_type: 'format', children: [{ text: '' }] },
        {
          data_origin: 'term',
          data_type: 'format_typeOfInformation',
          children: [{ text: 'deduced' }],
        },
      ])
    })

    it('can create elements from begriff with type text', () => {
      const begriff = {
        identifier: {
          id: '1',
          uri: 'http://example.com/BNDG-A123',
          notation: 'BNDG-A123',
        },
        label: 'label',
        altLabels: [],
        isRoot: false,
        isLeaf: false,
        themenbereich: 'BNDG',
        thesaurus: 'BNDG-A',
        unterBegriffe: [],
        notwendigeBegriffe: [],
        optionaleBegriffe: [],
        einzelAuswahlBegriffMengen: [],
        mehrfachAuswahlBegriffMengen: [],
      }
      expect(HSPElement.formatElementFactory(begriff, 'factual')).toMatchObject(
        [
          {
            data_origin: 'term',
            data_type: 'format',
            data_key: '1',
            data_ref: 'http://example.com/BNDG-A123',
            children: [{ text: 'label' }],
          },
          {
            data_origin: 'term',
            data_type: 'format_typeOfInformation',
            children: [{ text: 'factual' }],
          },
        ]
      )
    })
  })

  describe('fromElementFactory', () => {
    const ueberlieferungsform = subjectArea.data.findSubjectArea
    const api = ThemenbereicheAPI.new('de')
    api.addSubjectArea(ueberlieferungsform)

    it('creates terms with fachbegriff and connected begriffe', () => {
      const fachbegriff = api.begriff({ notation: 'FORM-X869' })

      expect(HSPElement.formElementFactory(fachbegriff, api)).toMatchObject([
        {
          data_origin: 'term',
          data_type: 'form',
          data_key: 'NORM-385d6995-a735-3a4c-a8b0-221b21cccf01',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-X869',
          children: [{ text: 'Sammlung handschriftlichen Materials' }],
        },
        {
          data_origin: 'term',
          data_type: 'form_keyFeature',
          data_key: 'NORM-c93ac08a-42e4-3f13-bea2-ed07dfea9892',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-B456',
          children: [{ text: '' }],
        },
        {
          data_origin: 'term',
          data_type: 'form_keyFeature',
          data_key: 'NORM-fcdc9965-677e-3c69-9a70-0c266893e376',
          data_ref:
            'https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/FORM-A890',
          children: [{ text: '' }],
        },
      ])
    })

    it('creates empty term for undefined', () => {
      expect(HSPElement.formElementFactory(undefined, api)).toMatchObject([
        { data_origin: 'term', data_type: 'form', children: [{ text: '' }] },
      ])
    })
  })

  const element = {
    data_origin: 'origin',
    children: [{ text: 'Text' }],
  }

  it('can check for indexName', () => {
    const check = HSPElement.checkIndexName('index')
    expect(check(element)).toBeFalsy()
    expect(check(element)).toBe(HSPElement.checkIndexName('index', element))
    const failing = {
      ...element,
      data_indexName: 'wrongIndex',
    }
    expect(check(failing)).toBeFalsy()
    expect(check(failing)).toBe(HSPElement.checkIndexName('index', failing))
    const succeeding = {
      ...element,
      data_indexName: 'index',
    }
    expect(check(succeeding)).toBeTruthy()
    expect(check(succeeding)).toBe(
      HSPElement.checkIndexName('index', succeeding)
    )
  })

  it('can check for type', () => {
    const check = HSPElement.checkType('type')
    expect(check(element)).toBeFalsy()
    expect(check(element)).toBe(HSPElement.checkType('type', element))
    const failing = {
      ...element,
      data_type: 'wrongType',
    }
    expect(check(failing)).toBeFalsy()
    expect(check(failing)).toBe(HSPElement.checkType('type', failing))
    const succeeding = {
      ...element,
      data_type: 'type',
    }
    expect(check(succeeding)).toBeTruthy()
    expect(check(succeeding)).toBe(HSPElement.checkType('type', succeeding))
  })

  it('can check for undefined type', () => {
    const check = HSPElement.checkType(undefined)
    expect(check(element)).toBeTruthy()
    expect(check(element)).toBe(HSPElement.checkType(undefined, element))
    const failing = {
      ...element,
      data_type: 'any',
    }
    expect(check(failing)).toBeFalsy()
    expect(check(failing)).toBe(HSPElement.checkType('type', failing))
  })

  it('can check for attribute', () => {
    const check = HSPElement.checkAttribute('attribute', 'value')
    expect(check(element)).toBeFalsy()
    expect(check(element)).toBe(
      HSPElement.checkAttribute('attribute', 'value', element)
    )
    const failing = {
      ...element,
      data_attribute: 'wrongValue',
    }
    expect(check(failing)).toBeFalsy()
    expect(check(failing)).toBe(
      HSPElement.checkAttribute('attribute', 'value', failing)
    )
    const succeeding = {
      ...element,
      data_attribute: 'value',
    }
    expect(check(succeeding)).toBeTruthy()
    expect(check(succeeding)).toBe(
      HSPElement.checkAttribute('attribute', 'value', succeeding)
    )
  })

  it.each([
    [{ data_a: 'a' }, false],
    [{ data_a: 'a', data_b: 'b' }, true],
    [{ data_a: 'a', data_b: 'c' }, true],
    [{ data_a: 'a', data_b: 'b', data_x: 'x' }, false],
    [{ data_a: 'c', data_b: 'c' }, false],
  ])('can check for attributes: %o is %p', (attributes, expected) => {
    const spec = {
      a: 'a',
      b: ['b', 'c'],
      x: undefined,
    }
    const check = HSPElement.checkAttributes(spec)
    const e = {
      ...element,
      ...attributes,
    }
    expect(check(e)).toBe(expected)
    expect(check(e)).toBe(HSPElement.checkAttributes(spec, e))
  })

  it('copies element with new uuids', () => {
    const element = {
      data_origin: 'x',
      children: [
        { data_origin: 'a', children: [{ text: 'b' }] },
        { data_origin: 'c', children: [{ text: 'd' }] },
      ],
    }
    const copy = HSPElement.copy(element)

    expect(copy).toMatchObject(element)
    expect(copy).toMatchObject({
      id: regEx.isUuid,
      children: [{ id: regEx.isUuid }, { id: regEx.isUuid }],
    })

    const [c1, c2] = copy.children as unknown as Element[]

    expect(uniq([copy.id, c1.id, c2.id])).toHaveLength(3)
  })
})
