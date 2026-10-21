import { FormLabel, TextField } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import { memo, useId } from "react";
import { useSelector } from "react-redux";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import { LabeledField } from "src/infrastructure/components/LabeledField";

interface Props {
  label: string;
}

export const ReadOnlyLabeledField: FC<PropsWithChildren<Props>> = memo(
  ({ label, children }) => {
    const id = useId();
    const readOnly = useSelector(selectReadOnly);

    return !readOnly ? (
      <LabeledField label={<FormLabel id={id}>{label}</FormLabel>}>
        <TextField
          aria-labelledby={id}
          defaultValue={children}
          fullWidth
          size="small"
          variant="filled"
          slotProps={{
            input: {
              className: "text-field-input-style",
              readOnly: true,
            },
          }}
        />
      </LabeledField>
    ) : (
      <LabeledField
        label={
          <FormLabel color="readonly" id={id}>
            {label}
          </FormLabel>
        }
      >
        {children}
      </LabeledField>
    );
  }
);
