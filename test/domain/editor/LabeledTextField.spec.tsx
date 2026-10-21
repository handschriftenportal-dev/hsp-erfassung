import { render, screen } from "@testing-library/react";
import { Slate } from "slate-react";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { createErfassungsEditor } from "src/infrastructure/slate/ErfassungsEditorFactory";
import { TestContext } from "test/TestContext";

describe("LabeledTextField", () => {
  const editor = createErfassungsEditor();
  const element = {
    data_origin: "altIdentifier",
    region: "altIdentifier",
    path: "#document-TEI-text-body-msDesc-msIdentifier-altIdentifier",
    component: "",
    level: 1,
    id: "5276f915-5da8-450b-8235-b5618fa7c7b3",
    data_type: "corpus",
    children: [
      {
        data_origin: "collection",
        region: "altIdentifiercorpus",
        path: "#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-collection",
        component: "",
        level: 1,
        id: "194fef8e-89af-420f-8456-43ac1f91caf5",
        children: [
          {
            region: "altIdentifier",
            text: "Sammlung XYZ",
          },
        ],
      },
      {
        data_origin: "idno",
        region: "altIdentifier",
        path: "#document-TEI-text-body-msDesc-msIdentifier-altIdentifier-idno",
        component: "",
        level: 1,
        id: "b5b63b39-092b-425d-a8d5-7a8b0a4505bc",
        children: [
          {
            region: "altIdentifier",
            text: "123",
          },
        ],
      },
    ],
  };

  const slateValue = [
    {
      data_origin: "paragraph",
      children: [element],
    },
  ];
  it("has accessible label", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField element={element} label={"Label"} />
        </Slate>
      </TestContext>
    );
    expect(screen.getByLabelText("Label")).toBeVisible();
  });

  it("label points to textfield", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField element={element} label={"Label"} />
        </Slate>
      </TestContext>
    );
    expect(screen.getByLabelText("Label")).toHaveTextContent("Sammlung XYZ");
  });

  it("shows helper text if error flag is set to true", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField
            error
            helperText={"Helper Text"}
            element={element}
            label={"Label"}
          />
        </Slate>
      </TestContext>
    );
    expect(screen.getByText("Helper Text")).toBeVisible();
  });

  it("does not show helper text if error flag is set to false", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField
            error={false}
            helperText={"Helper Text"}
            element={element}
            label={"Label"}
          />
        </Slate>
      </TestContext>
    );
    expect(screen.queryByText("Helper Text")).toBeNull();
  });

  it("does show delete button if delete flag is set", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField deletable element={element} label={"Label"} />
        </Slate>
      </TestContext>
    );
    expect(screen.getByRole("button")).toBeVisible();
  });

  it("does not show delete button if delete flag is set", () => {
    render(
      <TestContext>
        <Slate initialValue={slateValue} editor={editor}>
          <LabeledTextField
            deletable={false}
            element={element}
            label={"Label"}
          />
        </Slate>
      </TestContext>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
