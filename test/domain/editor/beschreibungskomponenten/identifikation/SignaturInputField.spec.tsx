import { render, screen } from "@testing-library/react";
import { Slate } from "slate-react";
import { SignaturInputField } from "src/domain/editor/beschreibungskomponenten/identifikation/SignaturInputField";
import ConfigureStore from "src/infrastructure/ConfigureReduxStore";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import { TestContext } from "test/TestContext";
import { TestSlateAttributes } from "test/TestSlateAttributes";

describe("SignaturInputField", () => {
  it("renders helper text", () => {
    const editor = createErfassungsEditor();
    const slateValue = [
      {
        data_origin: "paragraph",
        type: "paragraph",
        istop: false,
        children: [{ text: "A line of text in a paragraph." }],
      },
    ];
    const element = {
      data_origin: "idno",
      region: "altIdentifiercorpus",
      path: "#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno",
      component: "",
      level: 1,
      id: "XXXX",
      children: [
        {
          region: "altIdentifiercorpus",
          text: "",
        },
      ],
    };

    const store = ConfigureStore;
    store.dispatch({ type: "erfassung/writeDocument", payload: true });

    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <SignaturInputField
            element={element}
            attributes={TestSlateAttributes.element}
            empty={false}
            required={false}
            helperText={"Help"}
            title={"Title"}
          >
            Children
          </SignaturInputField>
        </Slate>
      </TestContext>
    );

    expect(screen.getByText("Help")).toBeTruthy();
  });
});
