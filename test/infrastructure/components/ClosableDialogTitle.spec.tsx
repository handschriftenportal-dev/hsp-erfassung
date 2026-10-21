import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClosableDialogTitle } from "src/infrastructure/components/ClosableDialogTitle";
import de from "src/infrastructure/i18n/translation_de.json";
import { TestContext } from "test/TestContext";

describe("closable dialog title", () => {
  const { close_dialog_action } = de.editor;
  it("renders children as heading", () => {
    render(
      <TestContext>
        <ClosableDialogTitle>Title</ClosableDialogTitle>
      </TestContext>
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeVisible();
  });

  it("does not render close icon by default", () => {
    render(
      <TestContext>
        <ClosableDialogTitle>Title</ClosableDialogTitle>
      </TestContext>
    );
    expect(
      screen.queryByRole("button", { name: close_dialog_action })
    ).toBeNull();
  });

  it("does render close icon when onClose handler is provided", () => {
    const onClose = jest.fn();
    render(
      <TestContext>
        <ClosableDialogTitle onClose={onClose}>Title</ClosableDialogTitle>
      </TestContext>
    );
    expect(
      screen.getByRole("button", { name: close_dialog_action })
    ).toBeVisible();
  });

  it("does call onClose handler when clicked", async () => {
    const onClose = jest.fn();
    render(
      <TestContext>
        <ClosableDialogTitle onClose={onClose}>Title</ClosableDialogTitle>
      </TestContext>
    );
    const button = screen.getByRole("button", { name: close_dialog_action })!;
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });
});
