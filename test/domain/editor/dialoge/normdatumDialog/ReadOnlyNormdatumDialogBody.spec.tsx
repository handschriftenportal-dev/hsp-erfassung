import { render, screen } from "@testing-library/react";
import type { NormdatumDialogState } from "src/domain/editor/dialoge/normdatumDialog/NormdatumDialogState";
import { ReadOnlyNormdatumDialogBody } from "src/domain/editor/dialoge/normdatumDialog/ReadOnlyNormdatumDialogBody";
import de from "src/infrastructure/i18n/translation_de.json";
import { TestContext } from "test/TestContext";

describe("ReadOnlyNormdatumDialogBody", () => {
  const state: NormdatumDialogState = {
    view: "read",
    status: "idle",
    type: "person",
    text: "xxx",
    rollen: [],
    identifier: "123",
  };
  beforeEach(() => {
    render(
      <TestContext>
        <ReadOnlyNormdatumDialogBody state={state} />
      </TestContext>
    );
  });

  const { text_label, link_label, role_other, open_action } =
    de.normdatum_dialog;

  it(`has labeled element "normdata_text"`, () => {
    expect(screen.getByLabelText(text_label)).toHaveValue(state.text);
  });

  it(`has labeled element "normdata_link"`, () => {
    expect(screen.getByLabelText(link_label)).toBeVisible();
  });

  it(`has labeled element "role"`, () => {
    expect(screen.getByLabelText(role_other)).toBeVisible();
  });

  it(`has button to open`, () => {
    expect(
      screen.getByRole("button", {
        name: open_action,
      })
    ).toBeVisible();
  });
});
