import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogReducer } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'

describe('ThemenbereichDialogReducer', () => {
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('throws on invalid action', () => {
    const invalidAction = {
      type: 'invalid',
      payload: null,
    } as unknown as ThemenbereichDialogAction
    expect(() =>
      ThemenbereichDialogReducer(initialState, invalidAction)
    ).toThrow()
  })

  it('addBegriffe action adds begriffe uniquely in order', () => {
    const addedOnceState = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: [{ id: 'a' }, { id: 'b' }],
    })
    const addedTwiceState = ThemenbereichDialogReducer(addedOnceState, {
      type: 'addBegriffe',
      payload: [{ id: 'a' }, { id: 'c' }],
    })
    expect(addedOnceState.auswahl).toMatchObject([{ id: 'a' }, { id: 'b' }])
    expect(addedTwiceState.auswahl).toMatchObject([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ])
  })

  it('removeBegriff remove begriff if available', () => {
    const newState = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    })
    expect(
      ThemenbereichDialogReducer(newState, {
        type: 'removeBegriff',
        payload: 'a',
      }).auswahl
    ).toMatchObject([{ id: 'b' }, { id: 'c' }])
    expect(
      ThemenbereichDialogReducer(newState, {
        type: 'removeBegriff',
        payload: 'd',
      }).auswahl
    ).toMatchObject([{ id: 'a' }, { id: 'b' }, { id: 'c' }])
  })

  it('setLinkedText action can change linked text', () => {
    const payload = 'new text'
    const newState = ThemenbereichDialogReducer(initialState, {
      type: 'setLinkedText',
      payload,
    })
    expect(newState.linkedText).toBe(payload)
  })

  it('toggleCollapseIdentifier action toggles collapsed identifiers', () => {
    const payload = 'some-identifier'
    const type = 'toggleCollapseIdentifier'
    const addedState = ThemenbereichDialogReducer(initialState, {
      type,
      payload,
    })
    const removedState = ThemenbereichDialogReducer(addedState, {
      type,
      payload,
    })
    expect(initialState.collapsed.has(payload)).toBeFalsy()
    expect(addedState.collapsed.has(payload)).toBeTruthy()
    expect(removedState.collapsed.has(payload)).toBeFalsy()
  })

  describe('toggleBeziehungsAuswahl', () => {
    const state = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: [
        AuswahlItem.newFachbegriffItem('a', { auswahl: new Set(['123']) }),
        AuswahlItem.newBegriffItem('b'),
      ],
    })

    const [a, b] = state.auswahl
    const type = 'toggleBeziehungsAuswahl'

    it('ignores item without beziehungen', () => {
      expect(
        ThemenbereichDialogReducer(state, {
          type,
          payload: { item: b, id: '123' },
        })
      ).toMatchObject(state)
    })

    it('can add identifier to selection of item with beziehungen', () => {
      expect(
        ThemenbereichDialogReducer(state, {
          type,
          payload: { item: a, id: '456' },
        })
      ).toMatchObject({
        auswahl: [
          { id: 'a', beziehungen: { auswahl: new Set(['123', '456']) } },
          b,
        ],
      })
    })

    it('can remove identifier from selection of item with beziehungen', () => {
      expect(
        ThemenbereichDialogReducer(state, {
          type,
          payload: { item: a, id: '123' },
        })
      ).toMatchObject({
        auswahl: [{ id: 'a', beziehungen: { auswahl: new Set() } }, b],
      })
    })
  })

  describe('selectFromMenge', () => {
    const state = ThemenbereichDialogReducer(initialState, {
      type: 'addBegriffe',
      payload: [
        AuswahlItem.newFachbegriffItem('a', { auswahl: new Set(['abc']) }),
        AuswahlItem.newBegriffItem('b'),
      ],
    })

    const [a, b] = state.auswahl
    const menge = {
      id: 'xxx',
      elemente: ['123', '456', '789'],
    }
    const type = 'selectFromMenge'

    it('ignores item without beziehungen', () => {
      expect(
        ThemenbereichDialogReducer(state, {
          type,
          payload: { item: b, menge, value: '123' },
        })
      ).toMatchObject(state)
    })

    it('can change beziehung', () => {
      expect(
        ThemenbereichDialogReducer(state, {
          type,
          payload: { item: a, menge, value: '456' },
        })
      ).toMatchObject({
        auswahl: [
          { id: 'a', beziehungen: { auswahl: new Set(['abc', '456']) } },
          b,
        ],
      })
    })

    it('does remove old selected elements from menge', () => {
      const nextState = ThemenbereichDialogReducer(state, {
        type,
        payload: { item: a, menge, value: '123' },
      })
      expect(
        ThemenbereichDialogReducer(nextState, {
          type,
          payload: { item: nextState.auswahl[0], menge, value: '456' },
        })
      ).toMatchObject({
        auswahl: [
          { id: 'a', beziehungen: { auswahl: new Set(['abc', '456']) } },
          b,
        ],
      })
    })
  })
})
