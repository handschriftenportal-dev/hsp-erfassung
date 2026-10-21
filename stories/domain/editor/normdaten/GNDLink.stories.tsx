import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { GNDLink } from "src/domain/editor/normdaten/GNDLink";

const meta = {
  title: "Design System/Komponenten/GNDLink",
  component: GNDLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GNDLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gndIdentifier: "123",
  },
};
