import type { InitiumDialogAction } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogReducer'
import { InitiumDialogReducer } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogReducer'
import type { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'

describe('InitiumDialogReducer', () => {
  const mockInitium: Initium = {
    id: '123',
    text: 'In principio erat Verbum',
    uri: 'https://example.com/initium/123',
    alternativeText: [],
    languages: [],
  }

  describe('set_text', () => {
    it('updates text in withoutInitium state', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: false,
        text: 'old text',
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_text',
        text: 'new text',
      })

      expect(result).toEqual({
        status: 'withoutInitium',
        readOnly: false,
        text: 'new text',
      })
    })

    it('updates text in withInitium state', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: false,
        text: 'old text',
        initium: mockInitium,
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_text',
        text: 'new text',
      })

      expect(result.text).toBe('new text')
      expect(result.status).toBe('withInitium')
    })
  })

  describe('set_initium', () => {
    it('transitions from withoutInitium to withInitium', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: false,
        text: 'some text',
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_initium',
        initium: mockInitium,
      })

      expect(result).toEqual({
        status: 'withInitium',
        readOnly: false,
        text: 'some text',
        initium: mockInitium,
      })
    })

    it('updates initium in withInitium state', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: false,
        text: 'some text',
        initium: mockInitium,
      }

      const newInitium: Initium = {
        id: '456',
        text: 'Different initium',
        uri: 'https://example.com/initium/456',
        alternativeText: [],
        languages: [],
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_initium',
        initium: newInitium,
      })

      expect(result).toMatchObject({
        initium: newInitium,
      })
    })

    it('preserves readOnly and text when setting initium', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: true,
        text: 'preserved text',
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_initium',
        initium: mockInitium,
      })

      expect(result.readOnly).toBe(true)
      expect(result.text).toBe('preserved text')
    })
  })

  describe('clear_initium', () => {
    it('transitions from withInitium to withoutInitium', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: false,
        text: 'some text',
        initium: mockInitium,
      }

      const result = InitiumDialogReducer(state, { type: 'clear_initium' })

      expect(result).toEqual({
        status: 'withoutInitium',
        readOnly: false,
        text: 'some text',
      })
    })

    it('preserves readOnly and text when clearing initium', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: true,
        text: 'preserved text',
        initium: mockInitium,
      }

      const result = InitiumDialogReducer(state, { type: 'clear_initium' })

      expect(result.readOnly).toBe(true)
      expect(result.text).toBe('preserved text')
    })
  })

  describe('set_error', () => {
    it('transitions to loadingError state', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: false,
        text: 'some text',
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_error',
        reason: 'Network error',
      })

      expect(result).toEqual({
        status: 'loadingError',
        readOnly: false,
        text: 'some text',
        reason: 'Network error',
      })
    })

    it('preserves readOnly and text when setting error', () => {
      const state: InitiumDialogState = {
        status: 'loadingFromTei',
        readOnly: true,
        text: 'preserved text',
        uri: 'https://example.com/initium/123',
        id: '123',
      }

      const result = InitiumDialogReducer(state, {
        type: 'set_error',
        reason: 'Failed to fetch',
      })

      expect(result).toMatchObject({
        readOnly: true,
        text: 'preserved text',
        reason: 'Failed to fetch',
      })
    })
  })

  describe('loadingError state', () => {
    it('blocks all actions when in loadingError state', () => {
      const state: InitiumDialogState = {
        status: 'loadingError',
        readOnly: false,
        text: 'some text',
        reason: 'Previous error',
      }

      const resultSetText = InitiumDialogReducer(state, {
        type: 'set_text',
        text: 'new text',
      })
      expect(resultSetText).toBe(state)

      const resultSetInitium = InitiumDialogReducer(state, {
        type: 'set_initium',
        initium: mockInitium,
      })
      expect(resultSetInitium).toBe(state)

      const resultClear = InitiumDialogReducer(state, { type: 'clear_initium' })
      expect(resultClear).toBe(state)

      const resultError = InitiumDialogReducer(state, {
        type: 'set_error',
        reason: 'New error',
      })
      expect(resultError).toBe(state)
    })
  })

  describe('unknown action', () => {
    it('throws error for unhandled action type', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: false,
        text: 'some text',
      }

      expect(() => {
        InitiumDialogReducer(state, {
          type: 'unknown_action',
        } as unknown as InitiumDialogAction)
      }).toThrow('Unhandled action type')
    })
  })
})
