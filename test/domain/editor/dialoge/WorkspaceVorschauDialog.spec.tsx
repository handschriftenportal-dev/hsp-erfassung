import { render, screen, waitFor } from "@testing-library/react";
import { WorkspaceVorschauDialog } from "src/domain/editor/dialoge/WorkspaceVorschauDialog";
import {
  updateBeschreibung,
  updateConfiguration,
} from "src/domain/erfassung/ErfassungsState";
import de from "src/infrastructure/i18n/translation_de.json";
import { MockCreateHspWorkspace } from "test/mocks/MockCreateHspWorkspace";
import { configureTestStore, TestContext } from "test/TestContext";

describe("WorkspaceVorschauDialog", () => {
  const store = configureTestStore();
  const hspTeiEndpoint = "workspace";
  const beschreibung = {
    id: "123456",
    type: "hsp:description",
  } as const;
  store.dispatch(updateConfiguration({ workspaceUrl: hspTeiEndpoint }));
  store.dispatch(updateBeschreibung(beschreibung));

  let createHspWorkspace: jest.Mock;
  beforeEach(() => {
    createHspWorkspace = jest.fn(MockCreateHspWorkspace);
    global.window.createHspWorkspace = createHspWorkspace;
    jest.clearAllMocks();
  });

  it("renders dialog", () => {
    render(
      <TestContext store={store}>
        <WorkspaceVorschauDialog />
      </TestContext>
    );

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("renders dialog title", () => {
    render(
      <TestContext store={store}>
        <WorkspaceVorschauDialog />
      </TestContext>
    );

    expect(
      screen.getByRole("heading", { name: de.toolbar.preview_title })
    ).toBeVisible();
  });

  it("calls createHspWorkspace", async () => {
    render(
      <TestContext store={store}>
        <WorkspaceVorschauDialog />
      </TestContext>
    );

    expect(createHspWorkspace).toHaveBeenCalled();
    const [[call]] = createHspWorkspace.mock.calls;
    expect(call).toMatchObject({ hspTeiEndpoint });
    const [{ value: workspace }] = createHspWorkspace.mock.results;
    await waitFor(() => {
      expect(workspace.getResources()).toMatchObject([beschreibung]);
    });
  });
});
