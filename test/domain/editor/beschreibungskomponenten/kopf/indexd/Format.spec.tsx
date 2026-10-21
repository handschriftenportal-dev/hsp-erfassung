import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import type { Editor } from "slate";
import { Slate } from "slate-react";
import { Format } from "src/domain/editor/beschreibungskomponenten/kopf/indexd/Format";
import { writeDocument } from "src/domain/erfassung/ErfassungsState";
import { ThemenbereicheAPI } from "src/domain/erfassung/ThemenbereicheAPI";
import de from "src/infrastructure/i18n/translation_de.json";
import { ThemenbereichService } from "src/infrastructure/normdaten/ThemenbereichService";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import subjectArea from "test/infrastructure/normdaten/fixtures/buchkunde.json";
import { configureTestStore, TestContext } from "test/TestContext";

describe("Format", () => {
  const api = ThemenbereicheAPI.new("de");
  const buchkunde = subjectArea.data.findSubjectArea;
  api.addSubjectArea(buchkunde);

  describe("without error", () => {
    let editor: Editor;
    let container: HTMLElement;
    const formatElement = {
      data_origin: "index",
      data_indexName: "norm_format",
      children: [
        {
          data_origin: "term",
          data_type: "format",
          data_key: "NORM-1d418d34-4806-3149-ace4-2bed58bdfec8",
          data_ref:
            "https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/CODC-B742",
          children: [
            {
              text: "CODC-B742",
            },
          ],
        },
        {
          data_origin: "term",
          data_type: "format_typeOfInformation",
          children: [
            {
              text: "deduced",
            },
          ],
        },
      ],
    };

    beforeEach(() => {
      const store = configureTestStore();
      store.dispatch(writeDocument());
      editor = createErfassungsEditor();
      container = render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <Slate
              initialValue={[
                {
                  data_origin: "paragraph",
                  children: [{ text: "A line of text in a paragraph." }],
                },
              ]}
              editor={editor}
            >
              <Format element={formatElement} />
            </Slate>
          </ThemenbereichService>
        </TestContext>
      ).container;
    });

    it("renders header", () => {
      expect(
        screen.getByRole("heading", { name: de.editor.format })
      ).toBeVisible();
    });

    it("has helper text", async () => {
      await userEvent.click(
        screen.getByRole("button", { name: de.editor.show_help })
      );
      expect(container.innerHTML).toContain(
        de.editor.help_text.format.slice(0, 50)
      );
    });

    it("renders Begriff label", () => {
      expect(screen.getByText("Quadratformat")).toBeVisible();
    });

    it("has label for normdatum", () => {
      expect(screen.getByLabelText(de.editor.format_normdatum)).toBeVisible();
    });

    it("has label for type of information", () => {
      expect(screen.getByLabelText(de.editor.format_type)).toBeVisible();
    });

    it("selects option", async () => {
      await userEvent.click(screen.queryAllByRole("combobox")[1]);
      expect(
        screen.getByRole("option", {
          name: de.editor.type_of_information.deduced,
        })
      ).toBeVisible();
      expect(
        screen.getByRole("option", {
          name: de.editor.type_of_information.factual,
        })
      ).toBeVisible();
      expect(
        screen.getByRole("option", {
          name: de.editor.type_of_information.computed,
        })
      ).toBeVisible();
      expect(
        screen.getByRole("option", { name: de.editor.type_of_information.none })
      ).toBeVisible();
    });

    it("offers beschreibstoff for selection", async () => {
      await userEvent.click(screen.queryAllByRole("combobox")[0]);
      const name = "Großfolio CODC-B460";
      expect(screen.getByRole("option", { name })).toBeVisible();
    });

    it("does not render error", () => {
      expect(container.getElementsByClassName("Mui-error")).toHaveLength(0);
    });
  });

  describe("with error", () => {
    const formatElement = {
      data_origin: "index",
      data_indexName: "norm_format",
      children: [
        {
          data_origin: "term",
          data_type: "format",
          data_key: "NORM-1d418d34-4806-3149-ace4-2bed58bdfec8",
          error: "xxxxx",
          data_ref:
            "https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/CODC-B742",
          children: [
            {
              text: "CODC-B742",
            },
          ],
        },
        {
          data_origin: "term",
          data_type: "format_typeOfInformation",
          children: [
            {
              text: "deduced",
            },
          ],
        },
      ],
    };

    it("on error renders label red", () => {
      const store = configureTestStore();
      store.dispatch(writeDocument());
      const editor = createErfassungsEditor();
      const container = render(
        <TestContext store={store}>
          <ThemenbereichService api={api}>
            <Slate
              initialValue={[
                {
                  data_origin: "paragraph",
                  children: [{ text: "A line of text in a paragraph." }],
                },
              ]}
              editor={editor}
            >
              <Format element={formatElement} />
            </Slate>
          </ThemenbereichService>
        </TestContext>
      ).container;
      expect(container.getElementsByClassName("Mui-error")).toHaveLength(1);
    });
  });
});
