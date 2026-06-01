import { InitiumAnlegenDialogReducer } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogReducer'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import initien from 'test/infrastructure/normdaten/fixtures/initien.json'

describe('InitiumAnlegenDialogReducer', () => {
  const duplicates = initien.data.findInitia.items.slice(0, 3)
  const language = {
    id: 'NORM-5f02f088-9301-3d7b-a1ac-972c11bf3e7d',
    gndIdentifier: '4113292-0',
    preferredName: 'deutsch',
    typeName: 'Language',
    identifier: [],
    variantName: [],
  }
  const unknownLanguage = {
    id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
    gndIdentifier: null,
    preferredName: 'unbekannt',
    typeName: 'Language',
    identifier: [],
    variantName: [],
  }
  const baseState = InitiumAnlegenDialogState.initialState('', unknownLanguage)

  describe('happy path', () => {
    let state = baseState

    it('1. set_text updates text', () => {
      const text = 'Hello World!'
      state = InitiumAnlegenDialogReducer(state, { type: 'set_text', text })
      expect(state).toMatchObject({
        type: 'entering_initium',
        text,
      })

      expect(
        InitiumAnlegenDialogReducer(state, { type: 'cancel' })
      ).toMatchObject({
        type: 'cancel',
      })
    })

    it('2. set_language updates languages', () => {
      state = InitiumAnlegenDialogReducer(state, {
        type: 'set_languages',
        languages: [language],
      })
      expect(state).toMatchObject({
        type: 'entering_initium',
        languages: [language],
      })

      expect(
        InitiumAnlegenDialogReducer(state, { type: 'cancel' })
      ).toMatchObject({
        type: 'cancel',
      })
    })

    it('3. submit with known language goes to checking_for_duplicates', () => {
      state = InitiumAnlegenDialogReducer(state, { type: 'submit' })
      expect(state).toMatchObject({
        type: 'checking_for_duplicates',
      })

      expect(
        InitiumAnlegenDialogReducer(state, { type: 'cancel' })
      ).toMatchObject({
        type: 'cancel',
      })
    })

    it('4. create_initium goes to creating_initium', () => {
      state = InitiumAnlegenDialogReducer(state, { type: 'create_initium' })
      expect(state).toMatchObject({
        type: 'creating_initium',
      })

      expect(
        InitiumAnlegenDialogReducer(state, { type: 'cancel' })
      ).toMatchObject({
        type: 'cancel',
      })
    })
  })

  describe('difficult path', () => {
    let state = baseState

    it('1. set_text updates text', () => {
      const text = 'Hello World!'
      state = InitiumAnlegenDialogReducer(state, { type: 'set_text', text })
      expect(state).toMatchObject({
        type: 'entering_initium',
        text,
      })
    })

    it('2. set_language updates languages', () => {
      state = InitiumAnlegenDialogReducer(state, {
        type: 'set_languages',
        languages: [language, unknownLanguage],
      })
      expect(state).toMatchObject({
        type: 'entering_initium',
        languages: [language, unknownLanguage],
      })
    })

    it('3. submit with unknown language goes to confirm_unknown_language', () => {
      state = InitiumAnlegenDialogReducer(state, { type: 'submit' })
      expect(state).toMatchObject({
        type: 'confirming_unknown_language',
      })
    })

    it('4. submit goes to check_duplicates', () => {
      state = InitiumAnlegenDialogReducer(state, { type: 'submit' })
      expect(state).toMatchObject({
        type: 'checking_for_duplicates',
      })

      state = InitiumAnlegenDialogReducer(state, {
        type: 'duplicates_found',
        duplicates,
      })
      expect(state).toMatchObject({
        type: 'resolving_duplicates',
      })
    })

    it('5. submit goes to creating_initium', () => {
      state = InitiumAnlegenDialogReducer(state, { type: 'submit' })
      expect(state).toMatchObject({
        type: 'creating_initium',
      })
    })
  })
})
