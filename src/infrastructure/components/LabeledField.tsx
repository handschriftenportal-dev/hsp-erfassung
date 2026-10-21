import { Grid } from "@mui/material";
import type { FC, PropsWithChildren, ReactNode } from "react";

interface Props {
  label: ReactNode;
  action?: ReactNode;
}

export const LabeledField: FC<PropsWithChildren<Props>> = ({
  children,
  label,
  action,
}) => {
  return (
    <>
      <Grid size={3}>{label}</Grid>
      <Grid size={8}>{children}</Grid>
      {action && <Grid size={1}>{action}</Grid>}
    </>
  );
};
