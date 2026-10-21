import type { FC } from "react";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { ReadOnlyLabeledField } from "src/domain/editor/ReadOnlyLabeledField";
import {
  selectReadOnly,
  updateAlertMessage,
  updateSaveAllowed,
} from "src/domain/erfassung/ErfassungsState";
import { HSPNode } from "src/infrastructure/slate/HSPNode";

interface Props extends RenderElementProps {
  title: string;
  required: boolean;
  helperText?: string;
  empty?: boolean;
}

const sliceLength = "#document-TEI-text-body-".length;
function pathSlice(path: string): string {
  return path.slice(sliceLength);
}

export const SignaturInputField: FC<Props> = memo(function SignaturInputField({
  element,
  title,
  required,
  helperText,
  empty,
}) {
  const { t } = useTranslation();
  const readOnly = useSelector(selectReadOnly);
  const dispatch = useDispatch();
  const textContent = HSPNode.extractFirstText(element);
  const error = textContent === "" && !empty;

  useEffect(() => {
    if (error) {
      const stringPath = element.path ?? "";
      dispatch(updateSaveAllowed(false));
      dispatch(
        updateAlertMessage({
          message: t("editor.invalid_fields", {
            path: pathSlice(stringPath),
          }),
          level: "warning",
          hideAfter: undefined,
        })
      );
    } else {
      dispatch(updateSaveAllowed(true));
    }
  }, [dispatch, error, element, t]);

  return !readOnly ? (
    <LabeledTextField
      helperText={helperText}
      error={error}
      label={title}
      element={element}
      deletable={!required}
    />
  ) : (
    <ReadOnlyLabeledField label={title}>{textContent}</ReadOnlyLabeledField>
  );
});
