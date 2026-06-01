import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'

describe('AuswahlItem', () => {
  const fachbegriff = {
    id: 'a',
    beziehungen: {
      auswahl: new Set(),
      notwendig: [],
      optional: [],
      einzelAuswahlMengen: [],
      mehrfachAuswahlMengen: [],
    },
  }
  const begriff = { id: 'b' }

  describe('isFachbegriff', () => {
    it('accepts a fachbegriff', () => {
      expect(AuswahlItem.isFachbegriffItem(fachbegriff)).toBe(true)
    })

    it('rejects a begriff', () => {
      expect(AuswahlItem.isFachbegriffItem(begriff)).toBe(false)
    })
  })

  describe('isValid', () => {
    it('Begriff is valid', () => {
      expect(AuswahlItem.isValid({ id: 'a' })).toBe(true)
    })

    it('Fachbegriff with notwendig not in auswahl is invalid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(['1']),
            notwendig: ['1', '2'],
            optional: [],
            einzelAuswahlMengen: [],
            mehrfachAuswahlMengen: [],
          },
        })
      ).toBe(false)
    })

    it('Fachbegriff with notwendig in auswahl is valid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(['1', '2']),
            notwendig: ['1', '2'],
            optional: [],
            einzelAuswahlMengen: [],
            mehrfachAuswahlMengen: [],
          },
        })
      ).toBe(true)
    })

    it('Fachbegriff with no selection in einzelauswahl menge is invalid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(),
            notwendig: [],
            optional: [],
            einzelAuswahlMengen: [
              {
                id: 'b',
                elemente: ['1', '2'],
              },
            ],
            mehrfachAuswahlMengen: [],
          },
        })
      ).toBe(false)
    })

    it('Fachbegriff with one selection in einzelauswahl menge is invalid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(['1']),
            notwendig: [],
            optional: [],
            einzelAuswahlMengen: [
              {
                id: 'b',
                elemente: ['1', '2'],
              },
            ],
            mehrfachAuswahlMengen: [],
          },
        })
      ).toBe(true)
    })

    it('Fachbegriff with more than one selection in einzelauswahl menge is invalid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(['1', '2']),
            notwendig: [],
            optional: [],
            einzelAuswahlMengen: [
              {
                id: 'b',
                elemente: ['1', '2'],
              },
            ],
            mehrfachAuswahlMengen: [],
          },
        })
      ).toBe(false)
    })

    it('Fachbegriff with no selection in mehrfachauswahl menge is invalid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(),
            notwendig: [],
            optional: [],
            einzelAuswahlMengen: [],
            mehrfachAuswahlMengen: [
              {
                id: 'b',
                elemente: ['1', '2'],
              },
            ],
          },
        })
      ).toBe(false)
    })

    it('Fachbegriff with selection in mehrfachauswahl menge is valid', () => {
      expect(
        AuswahlItem.isValid({
          id: 'a',
          beziehungen: {
            auswahl: new Set(['1', '2']),
            notwendig: [],
            optional: [],
            einzelAuswahlMengen: [],
            mehrfachAuswahlMengen: [
              {
                id: 'b',
                elemente: ['1', '2', '3'],
              },
            ],
          },
        })
      ).toBe(true)
    })
  })

  describe('fromBegriff', () => {
    const begriff = {
      identifier: { id: 'id', notation: 'notation', uri: 'uri' },
      label: 'label',
      altLabels: [],
      isRoot: false,
      isLeaf: false,
      themenbereich: 'BNDG',
      thesaurus: 'BNDG-X',
      unterBegriffe: [],
      notwendigeBegriffe: [],
      optionaleBegriffe: [],
      mehrfachAuswahlBegriffMengen: [],
      einzelAuswahlBegriffMengen: [],
    }

    it('fügt beziehungen nicht hinzu bei Begriff ohne entsprechenden Beziehungen', () => {
      const item = AuswahlItem.fromBegriff(begriff)
      expect(item).not.toHaveProperty('beziehungen')
    })

    it('fügt beziehung hinzu bei Begriff mit notwendigen Begriffen', () => {
      const item = AuswahlItem.fromBegriff({
        ...begriff,
        notwendigeBegriffe: ['1', '2'],
      })
      expect(item).toMatchObject({
        id: 'id',
        beziehungen: {
          auswahl: new Set(['1', '2']),
          notwendig: ['1', '2'],
        },
      })
    })

    it('fügt beziehungen hinzu bei Begriff mit optionalen Begriffen', () => {
      const item = AuswahlItem.fromBegriff({
        ...begriff,
        optionaleBegriffe: ['1', '2'],
      })
      expect(item).toMatchObject({
        id: 'id',
        beziehungen: {
          auswahl: new Set(),
          optional: ['1', '2'],
        },
      })
    })

    it('fügt beziehungen hinzu bei Begriff mit Einzelauswahlbegriffsmengen', () => {
      const menge = { id: 'x', elemente: ['1', '2'] }
      const item = AuswahlItem.fromBegriff({
        ...begriff,
        einzelAuswahlBegriffMengen: [menge],
      })
      expect(item).toMatchObject({
        id: 'id',
        beziehungen: {
          auswahl: new Set(),
          einzelAuswahlMengen: [menge],
        },
      })
    })

    it('fügt beziehungen hinzu bei Begriff mit Mehrfachauswahlbegriffsmengen', () => {
      const menge = { id: 'x', elemente: ['1', '2'] }
      const item = AuswahlItem.fromBegriff({
        ...begriff,
        mehrfachAuswahlBegriffMengen: [menge],
      })
      expect(item).toMatchObject({
        id: 'id',
        beziehungen: {
          auswahl: new Set(),
          mehrfachAuswahlMengen: [menge],
        },
      })
    })
  })

  it('can create empty Begriff', () => {
    expect(AuswahlItem.newBegriffItem('c')).toMatchObject({
      id: 'c',
    })
  })

  it('can create empty Fachbegriff', () => {
    expect(AuswahlItem.newFachbegriffItem('c')).toMatchObject({
      id: 'c',
      beziehungen: {
        auswahl: new Set(),
        notwendig: [],
        optional: [],
        einzelAuswahlMengen: [],
        mehrfachAuswahlMengen: [],
      },
    })
  })
})
