import { act, render } from "@testing-library/react";
import {
  updateBeschreibung,
  updateConfiguration,
  updateMode,
} from "src/domain/erfassung/ErfassungsState";
import { WindowTitleUpdateService } from "src/domain/erfassung/WindowTitleUpdateService";
import { configureTestStore, TestContext } from "test/TestContext";

describe("WindowTitleUpdateService", () => {
  const signature = "Cgm 7332";
  const store = configureTestStore();
  store.dispatch(updateConfiguration({ isEditable: true }));
  store.dispatch(updateBeschreibung({ signature }));

  beforeEach(() => {
    render(
      <TestContext store={store}>
        <WindowTitleUpdateService />
      </TestContext>
    );
  });

  it("shows signature and pencil in editMode", () => {
    act(() => {
      store.dispatch(updateMode("editMode"));
    });
    const title = global.document.title;
    expect(title).toContain(signature);
    expect(title).toContain("✏️");
  });

  it("shows signature and eye in readMode", () => {
    act(() => {
      store.dispatch(updateMode("previewMode"));
    });
    const title = global.document.title;
    expect(title).toContain(signature);
    expect(title).toContain("👁️");
  });
});
