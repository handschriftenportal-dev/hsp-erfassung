import { ImportiereNormdatumDialogReducer } from 'src/domain/editor/dialoge/importiereNormdatumDialog/ImportiereNormdatumDialogReducer'
import type { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'

type State = ReturnType<typeof ImportiereNormdatumDialogReducer>

function position({ selected, page, rowsPerPage }: State): number {
  return selected + page * rowsPerPage
}

describe('DialogReducer of ImportiereNormdatenDialog', () => {
  const state: State = {
    searchTerm: 'Alan Turing',
    selected: 5,
    total: 123,
    page: 2,
    rowsPerPage: 10,
    status: 'success',
    items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as unknown as LobidEntity[],
  }

  it('set search term with new search term', () => {
    expect(
      ImportiereNormdatumDialogReducer(state, {
        type: 'set_search_term',
        searchTerm: 'Alonzo Church',
      })
    ).toMatchObject({
      ...state,
      status: 'loading',
      searchTerm: 'Alonzo Church',
      page: 0,
      selected: 0,
    })
  })

  it('set search term with same search term', () => {
    expect(
      ImportiereNormdatumDialogReducer(state, {
        type: 'set_search_term',
        searchTerm: state.searchTerm,
      })
    ).toMatchObject(state)
  })

  it.each([10, 25, 50, 100])(
    'updating rows per page to %d keeps position invariant',
    (rowsPerPage) => {
      const newState = ImportiereNormdatumDialogReducer(state, {
        type: 'set_rows_per_page',
        rowsPerPage,
      })
      expect(position(state)).toBe(position(newState))
    }
  )

  it.each([-5, -1, 10, 100])(
    'selection can only be in range of api result length, i.e. not %d',
    (selected) => {
      expect(
        ImportiereNormdatumDialogReducer(state, {
          type: 'set_selected',
          selected,
        })
      ).not.toMatchObject({
        selected,
      })
    }
  )

  it.each([0, 3, 9])(
    'selection can be in range of api result length, i.e. %d',
    (selected) => {
      expect(
        ImportiereNormdatumDialogReducer(state, {
          type: 'set_selected',
          selected,
        })
      ).toMatchObject({
        selected,
      })
    }
  )

  describe('error message is readable', () => {
    it('for error object', () => {
      const error = new Error('Error Instance')
      expect(
        ImportiereNormdatumDialogReducer(state, {
          type: 'set_import_failed',
          error: error,
        })
      ).toMatchObject({
        error: 'Error Instance',
      })
    })

    it('for normdatum service response', () => {
      expect(
        ImportiereNormdatumDialogReducer(state, {
          type: 'set_import_failed',
          error: {
            status: 'failed',
            reason: {
              data: null,
              error: 'Error Message',
            },
          },
        })
      ).toMatchObject({
        error: 'Error Message',
      })
    })

    it.each([
      [null, 'null'],
      [undefined, 'undefined'],
      ['string', '"string"'],
      [[1, 2, 3], '[1,2,3]'],
      [1, '1'],
      [{ message: 'hi' }, '{"message":"hi"}'],
      [Symbol('symbol'), 'undefined'],
      [new Set([1, 2, 3]), '{}'],
    ])('for unknown case: %p', (error, serialized) => {
      expect(
        ImportiereNormdatumDialogReducer(state, {
          type: 'set_import_failed',
          error,
        })
      ).toMatchObject({
        error: `Unknown error: ${serialized}`,
      })
    })
  })
})
