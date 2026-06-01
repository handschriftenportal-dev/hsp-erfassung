import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'

describe('ThemenbereichDialogState', () => {
  const notation = 'notation'
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    notation
  )

  it('can create empty state for notation', () => {
    expect(initialState).toMatchObject({ notation })
  })

  describe('canSubmit', () => {
    it('empty auswahl can not be submitted', () => {
      expect(ThemenbereichDialogState.canSubmit(initialState)).toBeFalsy()
    })

    it('non empty auswahl without beziehungen is submittable', () => {
      expect(
        ThemenbereichDialogState.canSubmit({
          ...initialState,
          auswahl: [{ id: 'some' }, { id: 'elements' }],
        })
      ).toBeTruthy()
    })

    it.each([
      [new Set<string>(), false],
      [new Set('1'), false],
      [new Set(['1', '2']), true],
    ])(
      'notwendigen begriffe have to be in auswahl %p: %p',
      (auswahl, expected) => {
        const item = AuswahlItem.newFachbegriffItem('x', {
          notwendig: ['1', '2'],
        })
        item.beziehungen.auswahl = auswahl
        expect(
          ThemenbereichDialogState.canSubmit({
            ...initialState,
            auswahl: [item],
          })
        ).toBe(expected)
      }
    )

    it.each([
      [new Set<string>(), false],
      [new Set('1'), true],
      [new Set(['1', '2']), false],
    ])(
      'einzelbegriffe have to have exactly one match in auswahl %p: %p',
      (auswahl, expected) => {
        expect(
          ThemenbereichDialogState.canSubmit({
            ...initialState,
            auswahl: [
              AuswahlItem.newFachbegriffItem('x', {
                auswahl,
                einzelAuswahlMengen: [
                  {
                    id: 'menge',
                    elemente: ['1', '2'],
                  },
                ],
              }),
            ],
          })
        ).toBe(expected)
      }
    )

    it.each([
      [new Set<string>(), false],
      [new Set('1'), true],
      [new Set(['1', '2']), true],
    ])(
      'mehrfachbegriffe have to have at least one match in auswahl %p: %p',
      (auswahl, expected) => {
        expect(
          ThemenbereichDialogState.canSubmit({
            ...initialState,
            auswahl: [
              AuswahlItem.newFachbegriffItem('x', {
                auswahl,
                mehrfachAuswahlMengen: [
                  {
                    id: 'menge',
                    elemente: ['1', '2'],
                  },
                ],
              }),
            ],
          })
        ).toBe(expected)
      }
    )
  })

  it('can extract unique ids with beziehungen', () => {
    expect(
      ThemenbereichDialogState.uniqueSelection({
        ...initialState,
        auswahl: [
          { id: 'a' },
          { id: 'b' },
          AuswahlItem.newFachbegriffItem('c', {
            auswahl: new Set(['b', 'd', 'e']),
          }),
          AuswahlItem.newFachbegriffItem('f', {
            auswahl: new Set(['g', 'h']),
          }),
        ],
      }).sort((a, b) => a.localeCompare(b))
    ).toMatchObject(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
  })
})
