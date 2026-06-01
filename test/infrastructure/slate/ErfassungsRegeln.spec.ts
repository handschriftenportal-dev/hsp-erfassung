import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'

describe('ErfassungsRegeln', () => {
  it.each([
    ['msIdentifier', 'head', -1],
    ['history', 'physDesc', 1],
    ['notetext', 'notetext', 0],
  ] as const)(
    'komponentenReihenfolge can order Komponenten %s and %s',
    (a, b, signum) => {
      const result = ErfassungsRegeln.komponentenReihenfolge(a, b)
      expect(result + ErfassungsRegeln.komponentenReihenfolge(b, a)).toEqual(0)
      expect(ErfassungsRegeln.komponentenReihenfolge(a, a)).toEqual(0)
      expect(Math.sign(result)).toEqual(signum)
    }
  )

  it.each([
    ['msPartfragment', true],
    ['head', false],
    ['notemusic', true],
    ['msPartbooklet', true],
  ] as const)(
    'komponente %s is duplicatable = %p',
    (komponente, isDuplicatable) => {
      expect(ErfassungsRegeln.komponentenRegel(komponente)).toMatchObject({
        duplicate: isDuplicatable,
      })
    }
  )

  it.each(['person', 'ort', 'koerperschaft'] as const)(
    'normdatumElement for normdatumElement for %s',
    (normdatum) => {
      const options = {
        normdatenText: 'marker',
        role: 'author',
        gndIdentifierOption: '123',
      }
      const result = ErfassungsRegeln.normdatumElement(normdatum, options)
      expect(result).toMatchObject({
        data_origin: normdatum,
        content: options.normdatenText,
        box: {
          data_role: 'author',
          data_ref: 'https://d-nb.info/gnd/123',
        },
      })
    }
  )

  it.each([
    ['norm_material', false, false],
    ['norm_musicNotation', false, false],
    ['unknown_index', false, false],
  ])(
    'indexRegel for index "%s" is repeatable %p, required %p',
    (indexName, repeatable, required) => {
      expect(ErfassungsRegeln.indexRegel(indexName)).toMatchObject({
        repeatable,
        required,
      })
    }
  )

  it.each([
    ['norm_material', 'material_type', true, true],
    ['norm_musicNotation', 'musicNotation', false, false],
    ['unknown_index', 'unknown_term', false, false],
  ])(
    'termRegel for index "%s", term "%s" is repeatable %p, required %p',
    (indexName, termName, repeatable, required) => {
      expect(ErfassungsRegeln.termRegel(indexName, termName)).toMatchObject({
        repeatable,
        required,
      })
    }
  )

  it.each([
    ['form', 15],
    ['format', 10],
  ] as const)('termValues for "%s" has count %d', (termName, count) => {
    expect(ErfassungsRegeln.termValues(termName)).toHaveLength(count)
  })

  it.each([
    ['history', 'sidebar.history'],
    ['unknown', 'unknown'],
  ])('komponentenLabel for "%s" is "%s"', (komponente, expected) => {
    expect(ErfassungsRegeln.komponentenLabel(komponente)).toBe(expected)
  })

  it.each([
    ['history', true],
    ['unknown', false],
  ])('isRegion of "%s" is %p', (regionName, expected) => {
    expect(ErfassungsRegeln.isRegion(regionName)).toBe(expected)
  })

  it.each([
    ['history', true],
    ['unknown', false],
  ])('isKomponente of "%s" is %p', (komponente, expected) => {
    expect(ErfassungsRegeln.isKomponente(komponente)).toBe(expected)
  })
})
