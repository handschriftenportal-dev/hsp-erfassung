import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'

describe('InitiumAnlegenDialogState', () => {
  const unbekannt: GNDEntityFact = {
    id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
    gndIdentifier: null,
    preferredName: 'unbekannt',
    typeName: 'Language',
    identifier: [],
    variantName: [],
  }

  const initialState = InitiumAnlegenDialogState.initialState('x', unbekannt)

  const deutsch: GNDEntityFact = {
    id: 'NORM-5f02f088-9301-3d7b-a1ac-972c11bf3e7d',
    gndIdentifier: '4113292-0',
    preferredName: 'deutsch',
    typeName: 'Language',
    identifier: [
      { text: 'deu', type: 'ISO_639-2' },
      { text: 'de', type: 'ISO_639-1' },
      { text: 'ger', type: 'ISO_639-2' },
    ],
    variantName: [
      { name: 'Hochdeutsch', languageCode: 'de' },
      { name: 'Deutsche Sprache', languageCode: 'de' },
      { name: 'Neuhochdeutsch', languageCode: 'de' },
      { name: 'Deutsch', languageCode: 'de' },
    ],
  }

  it('can create initial initialState from text', () => {
    expect(initialState).toMatchObject({
      type: 'entering_initium',
      text: 'x',
      languages: [unbekannt],
    })
  })

  it('initialState without language is perceived as unknown language', () => {
    expect(InitiumAnlegenDialogState.isUnknownLanguageState(initialState)).toBe(
      true
    )
  })

  it('state without empty language perceived as unknown language', () => {
    expect(
      InitiumAnlegenDialogState.isUnknownLanguageState({
        ...initialState,
        languages: [],
      })
    ).toBe(true)
  })

  it('state with multiple languages containing unknown language is perceived as unknown language', () => {
    expect(
      InitiumAnlegenDialogState.isUnknownLanguageState({
        ...initialState,
        languages: [deutsch, unbekannt],
      })
    ).toBe(true)
  })

  it('initialState with short text and language is not submittable', () => {
    expect(
      InitiumAnlegenDialogState.isSubmittable({
        ...initialState,
        languages: [deutsch],
      })
    ).toBe(false)
  })

  it('initialState with long text and without language is not submittable', () => {
    expect(
      InitiumAnlegenDialogState.isSubmittable({
        ...initialState,
        text: 'A not too short text',
        languages: [],
      })
    ).toBe(false)
  })

  it('initialState with long text and with language is submittable', () => {
    expect(
      InitiumAnlegenDialogState.isSubmittable({
        ...initialState,
        text: 'A not too short text',
        languages: [deutsch],
      })
    ).toBe(true)
  })
})
