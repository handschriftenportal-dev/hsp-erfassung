import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  readDocument,
  selectAlertMessage,
  selectReadOnly,
  updateConfiguration,
  updateContentChanged,
  updateMode,
  updateSlate,
  updateStandalone,
} from "src/domain/erfassung/ErfassungsState";
import { LesenBearbeitenButton } from "src/domain/toolbar/LesenBearbeitenButton";
import de from "src/infrastructure/i18n/translation_de.json";
import Loader from "test/LoadPublic";
import { configureTestStore, TestContext } from "test/TestContext";

describe("LesenBearbeitenButton", () => {
  let getCalled = false;
  const server = setupServer(
    http.get("/", () => {
      getCalled = true;
      return HttpResponse.xml(Loader.loremIpsum());
    }),
    http.post("/", () => {
      return HttpResponse.json({});
    }),
    http.get("/sperren", () => {
      return HttpResponse.json([]);
    }),
    http.get("/test/sperren", () => {
      return HttpResponse.json([
        { id: "1", bearbeiter: { id: "b-ke101", rolle: "Redakteur" } },
      ]);
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    getCalled = false;
  });
  afterAll(() => server.close());

  it("switches between read and edit mode", async () => {
    const store = configureTestStore();
    store.dispatch(
      updateConfiguration({
        beschreibungsUrl: "/test",
        isEditable: true,
      })
    );
    store.dispatch(updateMode("previewMode"));

    render(
      <TestContext store={store}>
        <LesenBearbeitenButton />
      </TestContext>
    );
    const button = screen.getByRole("button");

    expect(button).toBeVisible();
    expect(selectReadOnly(store.getState())).toEqual(true);
    await userEvent.click(button);
    expect(selectReadOnly(store.getState())).toEqual(false);
  });

  test("is disabled in readonly mode", () => {
    const store = configureTestStore();
    store.dispatch(readDocument());
    store.dispatch(updateStandalone(false));
    store.dispatch(
      updateConfiguration({
        beschreibungsUrl: "/test",
        isEditable: false,
      })
    );
    store.dispatch(updateMode("previewMode"));

    render(
      <TestContext store={store}>
        <LesenBearbeitenButton />
      </TestContext>
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("cannot edit when sperren are active", async () => {
    const store = configureTestStore();
    store.dispatch(updateStandalone(false));
    store.dispatch(
      updateConfiguration({
        isEditable: true,
      })
    );
    store.dispatch(updateMode("previewMode"));

    render(
      <TestContext store={store}>
        <LesenBearbeitenButton />
      </TestContext>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(selectAlertMessage(store.getState())).toBe(undefined);
    expect(selectReadOnly(store.getState())).toEqual(false);
  });

  it("reloads description after discarding changes", async () => {
    const store = configureTestStore();
    store.dispatch(updateStandalone(false));
    store.dispatch(
      updateConfiguration({
        isEditable: true,
      })
    );
    store.dispatch(updateMode("editMode"));
    store.dispatch(updateContentChanged(true));
    store.dispatch(updateSlate([{ text: "update" }]));

    render(
      <TestContext store={store}>
        <LesenBearbeitenButton />
      </TestContext>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeVisible();

    const noButton = screen.getByRole("button", { name: de.toolbar.no_action });
    await userEvent.click(noButton);

    expect(selectReadOnly(store.getState())).toBe(true);
    expect(getCalled).toBe(true);
  });
});
