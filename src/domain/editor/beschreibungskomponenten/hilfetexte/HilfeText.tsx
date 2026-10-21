import { Grid } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";

interface Props {
  helperText?: string;
}

export const HilfeText: FC<Props> = memo(({ helperText }) => {
  return (
    <>
      {helperText && (
        <Grid size={12}>
          <span
            dangerouslySetInnerHTML={{ __html: helperText }}
            className="hilfe-text"
          />
        </Grid>
      )}
    </>
  );
});
