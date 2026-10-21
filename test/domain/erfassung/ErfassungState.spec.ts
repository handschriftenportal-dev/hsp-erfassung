import {
  erfassungsState,
  initialState,
  updateSlate,
} from "src/domain/erfassung/ErfassungsState";

describe("ErfassungsState", () => {
  it("reducer updateSlate without state", () => {
    expect(erfassungsState.reducer(undefined, updateSlate([]))).toMatchObject({
      slateValue: [],
      flags: {
        unsavedDocument: false,
      },
    });
  });

  it("reducer updateSlate with nonempty content", () => {
    expect(
      erfassungsState.reducer(
        undefined,
        updateSlate([
          {
            data_origin: "TEI",
            children: [],
          },
        ])
      )
    ).toMatchObject({
      slateValue: [
        {
          data_origin: "TEI",
          children: [],
        },
      ],
    });
  });
  it("ErfassungsState Test Slate Valued Update", () => {
    expect(
      erfassungsState.reducer(
        {
          ...initialState,
          flags: {
            ...initialState.flags,
            contentChanged: true,
          },
          mode: "editMode",
        },
        updateSlate([
          {
            data_origin: "TEI",
            children: [{ text: "Erste Änderung" }],
          },
        ])
      )
    ).toMatchObject({ flags: { unsavedDocument: true } });
  });
});
