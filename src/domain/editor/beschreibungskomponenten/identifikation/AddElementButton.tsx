import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import type { Element } from "slate";
import { useAddElement } from "src/domain/editor/beschreibungskomponenten/identifikation/useAddElement";

interface Props {
  element: Element;
  type: "sammlung" | "vorbesitzer" | "koerperschaft" | "ort";
  gap?: "small" | "mid";
}

export const AddElementButton: FC<PropsWithChildren<Props>> = memo(
  ({ element, type, children, gap = "small" }) => {
    const { path = "" } = element;
    const { isAltIdentifier, addElement } = useAddElement(
      type,
      path,
      element.children
    );

    return (
      <Grid
        style={{ marginBottom: "12px", justifyContent: "end" }}
        container
        size={11}
      >
        <Grid
          className={gap === "small" ? "small-bottom-gab" : "mid-bottom-gab"}
          size={3}
        >
          <Button
            startIcon={<Add />}
            className={
              isAltIdentifier
                ? "black-add-button-style"
                : "grey-add-button-style"
            }
            onClick={addElement}
            size="small"
            variant="text"
          >
            {children}
          </Button>
        </Grid>
      </Grid>
    );
  }
);
