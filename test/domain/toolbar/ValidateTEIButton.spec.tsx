import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  selectAlertMessage,
  updateConfiguration,
} from "src/domain/erfassung/ErfassungsState";
import { ValidateTEIButton } from "src/domain/toolbar/ValidateTEIButton";
import de from "src/infrastructure/i18n/translation_de.json";
import type { ValidationResponse } from "src/infrastructure/nachweis/ValidationResponse";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import { configureTestStore, TestContext } from "test/TestContext";

describe("ValidateTEIButton", () => {
  describe("failing validation", () => {
    const failedImportValidation: ValidationResponse = {
      valid: false,
      message: "Error during validation. Line XYZ",
      line: "",
      column: "",
      details: [],
    };

    const server = setupServer(
      http.post("/validate/odd", () => {
        return HttpResponse.json(failedImportValidation);
      }),
      http.post("/validate/tei", () => {
        return HttpResponse.json(failedImportValidation);
      })
    );

    let store: ReturnType<typeof configureTestStore>;

    beforeAll(() => server.listen());
    beforeEach(() => {
      const editor = createErfassungsEditor();
      store = configureTestStore();
      act(() => {
        store.dispatch({
          type: "erfassung/validationState",
          payload: [],
        });
        store.dispatch(
          updateConfiguration({
            validationUrl: "/validate/",
          })
        );
      });
      render(
        <TestContext store={store}>
          <ValidateTEIButton withODD={false} editor={editor} />
        </TestContext>
      );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("renders button", () => {
      expect(screen.getByRole("button")).toBeVisible();
    });

    it("updates alert message", async () => {
      expect(selectAlertMessage(store.getState())).toBeUndefined();
      await userEvent.click(screen.getByRole("button"));
      expect(selectAlertMessage(store.getState())).toMatchObject({
        message: failedImportValidation.message,
        level: "error",
      });
    });
  });

  describe("on server error", () => {
    const server = setupServer(
      http.post("/validate/tei", async () => {
        await delay(100);
        return HttpResponse.error();
      })
    );

    let store: ReturnType<typeof configureTestStore>;

    beforeAll(() => server.listen());
    beforeEach(() => {
      const editor = createErfassungsEditor();
      store = configureTestStore();
      act(() => {
        store.dispatch({
          type: "erfassung/validationState",
          payload: [],
        });
        store.dispatch(
          updateConfiguration({
            validationUrl: "/validate/",
          })
        );
      });
      render(
        <TestContext store={store}>
          <ValidateTEIButton withODD={false} editor={editor} />
        </TestContext>
      );
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("disable button till error and show error message", async () => {
      expect(selectAlertMessage(store.getState())).toBeUndefined();
      const button = screen.getByRole("button");
      await userEvent.click(screen.getByRole("button"));
      expect(button).toBeDisabled();
      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
      expect(button).not.toBeDisabled();
      expect(selectAlertMessage(store.getState())).toMatchObject({
        message: de.toolbar.validate_server_error_msg,
        level: "error",
      });
    });
  });
});
