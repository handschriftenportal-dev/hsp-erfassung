import { render, screen } from "@testing-library/react";
import { LabeledField } from "src/infrastructure/components/LabeledField";

describe("LabeledField", () => {
  it("renders label", () => {
    render(<LabeledField label={"abc"}>child</LabeledField>);
    expect(screen.getByText("abc")).toBeVisible();
  });

  it("renders child", () => {
    render(<LabeledField label={"abc"}>child</LabeledField>);
    expect(screen.getByText("child")).toBeVisible();
  });

  it("renders action", () => {
    render(
      <LabeledField label={"abc"} action={<button>button</button>}>
        child
      </LabeledField>
    );
    expect(screen.getByRole("button", { name: "button" })).toBeVisible();
  });
});
