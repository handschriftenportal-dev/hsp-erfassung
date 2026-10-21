import { Grid } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import type { RenderElementProps } from "slate-react";

interface Props extends Pick<RenderElementProps, "children" | "attributes"> {}

export const BlockElement: FC<Props> = memo(({ children, attributes }) => {
  return (
    <Grid size={12} {...attributes}>
      {children}
    </Grid>
  );
});
