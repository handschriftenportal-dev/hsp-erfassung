import { render, screen } from "@testing-library/react";
import { AuszeichnungAuswahlDialog } from "src/domain/editor/selectiontoolbar/AuszeichnungAuswahlDialog";
import de from "src/infrastructure/i18n/translation_de.json";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import { TestContext } from "test/TestContext";

describe("AuszeichnungAuswahlDialog Factory", () => {
  const editor = createErfassungsEditor();
  const tests = [
    ["referenz", de.text_tagging.referenz.title],
    ["formatierung", de.text_tagging.formatierung.title],
    ["andere", de.text_tagging.andere.title],
  ] as const;
  it.each(tests)('for type "%s" has title "%s"', (type, name) => {
    render(
      <TestContext>
        <AuszeichnungAuswahlDialog editor={editor} type={type} />
      </TestContext>
    );
    expect(screen.getByRole("heading", { name })).toBeVisible();
  });
});
