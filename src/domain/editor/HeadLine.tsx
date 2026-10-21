import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import type { FC, MouseEvent, ReactNode } from "react";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";

import { HilfeButton, HilfeText } from "./beschreibungskomponenten/hilfetexte";

interface Props {
  children?: ReactNode;
  label: string;
  labelSize: "h3" | "h4";
  helperText?: string;
}

export const HeadLine: FC<Props> = memo(
  ({ children, label, labelSize, helperText }) => {
    const readOnly = useSelector(selectReadOnly);
    const [showHelpText, setShowHelpText] = useState(false);

    const handleClickCallback = useCallback(
      (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowHelpText(!showHelpText);
      },
      [showHelpText]
    );

    const ReadOnlyStyle = styled(labelSize)({
      fontSize: labelSize === "h3" ? "20px" : "16px",
      marginBlockEnd: "16px",
      margin: "0px",
      lineHeight: "24px",
    });

    const EditModeStyle = styled(labelSize)({
      fontSize: labelSize === "h3" ? "20px" : "16px",
    });

    return readOnly ? (
      <ReadOnlyStyle>{label}</ReadOnlyStyle>
    ) : (
      <>
        <Grid size={11}>
          <EditModeStyle>
            {label}
            {helperText && (
              <HilfeButton
                onClick={handleClickCallback}
                activated={showHelpText}
              />
            )}
          </EditModeStyle>
        </Grid>
        <Grid size={1}>{children}</Grid>

        {helperText && (
          <>
            <Grid size={3} />
            <Grid className={"small-bottom-gab"} size={8}>
              {showHelpText && <HilfeText helperText={helperText} />}
            </Grid>
          </>
        )}
      </>
    );
  }
);
