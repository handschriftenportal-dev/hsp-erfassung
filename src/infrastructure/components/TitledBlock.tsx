import { Grid } from "@mui/material";
import type { FC, PropsWithChildren, ReactNode } from "react";

interface Props {
  title: ReactNode;
  action?: ReactNode;
}

export const TitledBlock: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <Grid container size={12}>
      <Grid container size={12}>
        {title}
      </Grid>
      <Grid container size={12} spacing={1} className={"titled-block"}>
        {children}
      </Grid>
    </Grid>
  );
};
