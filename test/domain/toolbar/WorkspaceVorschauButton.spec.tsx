import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { BeschreibungsObject } from "src/domain/erfassung/Erfassung";
import {
  updateBeschreibung,
  updateConfiguration,
} from "src/domain/erfassung/ErfassungsState";
import { WorkspaceVorschauButton } from "src/domain/toolbar/WorkspaceVorschauButton";
import de from "src/infrastructure/i18n/translation_de.json";
import { MockCreateHspWorkspace } from "test/mocks/MockCreateHspWorkspace";
import { configureTestStore, TestContext } from "test/TestContext";

describe("WorkspaceVorschauButton", () => {
  let createHspWorkspace: jest.Mock;
  beforeEach(() => {
    createHspWorkspace = jest.fn(MockCreateHspWorkspace);
    global.window.createHspWorkspace = createHspWorkspace;
  });

  it("renders a button", () => {
    render(
      <TestContext>
        <WorkspaceVorschauButton />
      </TestContext>
    );
    expect(
      screen.getByRole("button", { name: de.toolbar.preview_action })
    ).toBeVisible();
  });

  it("clicking the button calls the workspace", async () => {
    const hspTeiEndpoint = "workspace";
    const beschreibung: Partial<BeschreibungsObject> = {
      id: "123456",
      type: "hsp:description",
    };
    const store = configureTestStore();
    store.dispatch(updateConfiguration({ workspaceUrl: hspTeiEndpoint }));
    store.dispatch(updateBeschreibung(beschreibung));
    render(
      <TestContext store={store}>
        <WorkspaceVorschauButton />
      </TestContext>
    );
    await userEvent.click(
      screen.getByRole("button", { name: de.toolbar.preview_action })
    );

    expect(createHspWorkspace).toHaveBeenCalled();

    const [[call]] = createHspWorkspace.mock.calls;
    expect(call).toMatchObject({ hspTeiEndpoint });
    const [{ value: workspace }] = createHspWorkspace.mock.results;
    expect(workspace.getResources()).toMatchObject([beschreibung]);
  });

  it("clicking the button opens a dialog", async () => {
    const store = configureTestStore();
    store.dispatch(updateConfiguration({ workspaceUrl: "workspace" }));
    render(
      <TestContext store={store}>
        <WorkspaceVorschauButton />
      </TestContext>
    );

    await userEvent.click(
      screen.getByRole("button", { name: de.toolbar.preview_action })
    );

    expect(screen.getByRole("dialog")).toBeVisible();
  });
});
