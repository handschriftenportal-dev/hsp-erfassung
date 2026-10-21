import { FormLabel } from "@mui/material";
import type { FC } from "react";
import { memo, useId } from "react";
import type { Element } from "slate";
import { BeschreibungsTextField } from "src/domain/editor/BeschreibungsTextField";
import { LabeledField } from "src/infrastructure/components/LabeledField";

import { DeleteSlateNodeButton } from "./DeleteSlateNodeButton";

interface Props {
  element: Element;
  label: string;
  helperText?: string;
  error?: boolean;
  deletable?: boolean;
  indentLabel?: boolean;
}

export const LabeledTextField: FC<Props> = memo(
  ({ element, label, helperText, error, deletable, indentLabel = false }) => {
    const id = useId();
    return (
      <LabeledField
        label={
          <FormLabel
            id={id}
            className={indentLabel ? "indent-label" : undefined}
          >
            {label}
          </FormLabel>
        }
        action={deletable && <DeleteSlateNodeButton element={element} />}
      >
        <BeschreibungsTextField
          element={element}
          labelledBy={id}
          maxRows={4}
          showError={error}
          helperText={error ? helperText : ""}
        />
      </LabeledField>
    );
  }
);
