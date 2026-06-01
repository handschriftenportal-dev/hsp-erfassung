import {
  erfassungsState,
  initialState,
  updateSlate,
} from 'src/domain/erfassung/ErfassungsState'

describe('ErfassungsState', () => {
  it('reducer updateSlate without state', () => {
    expect(erfassungsState.reducer(undefined, updateSlate([]))).toMatchObject({
      slateValue: [],
      unsavedDocument: false,
    })
  })

  it('reducer updateSlate with nonempty content', () => {
    expect(
      erfassungsState.reducer(
        undefined,
        updateSlate([
          {
            data_origin: 'TEI',
            children: [],
          },
        ])
      )
    ).toMatchObject({
      slateValue: [
        {
          data_origin: 'TEI',
          children: [],
        },
      ],
    })
  })
  it('ErfassungsState Test Slate Valued Update', () => {
    expect(
      erfassungsState.reducer(
        {
          ...initialState,
          mode: 'editMode',
          unsavedDocument: true,
          contentChanged: true,
        },
        updateSlate([
          {
            data_origin: 'TEI',
            children: [{ text: 'Erste Änderung' }],
          },
        ])
      ).unsavedDocument
    ).toEqual(true)
  })
})
