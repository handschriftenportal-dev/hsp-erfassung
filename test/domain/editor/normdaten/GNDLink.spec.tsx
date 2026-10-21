import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GNDLink } from "src/domain/editor/normdaten/GNDLink";

describe("GNDLink", () => {
  it("renders as button", () => {
    render(<GNDLink gndIdentifier={"123"} />);
    expect(screen.getByRole("button")).toBeVisible();
  });

  it("renders identifier as text", () => {
    render(<GNDLink gndIdentifier={"123"} />);
    expect(screen.getByRole("button", { name: "123" })).toBeVisible();
  });

  it("click opens new window", async () => {
    const open = jest.fn();
    window.open = open;
    render(<GNDLink gndIdentifier={"123"} />);
    await userEvent.click(screen.getByRole("button"));
    expect(open).toHaveBeenCalledWith("https://d-nb.info/gnd/123", "_blank");
  });
});
