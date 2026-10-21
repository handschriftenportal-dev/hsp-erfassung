import { FormLabel, TextField } from "@mui/material";
import type { FC, SyntheticEvent } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { useSlateStatic } from "slate-react";
import { DeleteSlateNodeButton } from "src/domain/editor/DeleteSlateNodeButton";
import {
  selectBeschreibung,
  selectReadOnly,
  updateAlertMessage,
  updateSaveAllowed,
} from "src/domain/erfassung/ErfassungsState";
import { FullscreenPopper } from "src/domain/erfassung/FullscreenPopper";
import { TEI_ELEMENT_ALT_IDENTIFIER } from "src/domain/erfassung/TEIConstants";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TranslatedAutocomplete } from "src/infrastructure/components/TranslatedAutocomplete";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import {
  findPath,
  insertSlateText,
} from "src/infrastructure/slate/SlateBoundary";

interface Props extends RenderElementProps {}

export const SignaturAutocomplete: FC<Props> = memo(
  function SignaturAutocomplete({ children, element }) {
    const { path } = element;
    const [firstChild] = element.children;
    const { t } = useTranslation();
    const readOnly = useSelector(selectReadOnly);
    const beschreibung = useSelector(selectBeschreibung);
    const editor = useSlateStatic();
    const dispatch = useDispatch();
    const text = HSPNode.extractText(element);
    const signaturen: string[] =
      !beschreibung.kodsignaturen || beschreibung.kodsignaturen.length > 0
        ? beschreibung.kodsignaturen
        : children
          ? [text]
          : [t("editor.signature_not_found")];
    const [error, setError] = useState(!children || text === "");

    const insertValueAutocompleteForIdno = useCallback(
      (event: SyntheticEvent) => {
        event.preventDefault();
        const at = findPath(editor, firstChild);
        const target = event.target as HTMLElement;
        if (at && target.innerText) {
          insertSlateText(editor, target.outerText, at);
        }
      },
      [editor, firstChild]
    );

    const insertTextForIdno = useCallback(
      (event: SyntheticEvent) => {
        event.preventDefault();
        const at = findPath(editor, firstChild);
        const target = event.target as HTMLInputElement;
        if (at && target && target.value !== "") {
          setError(false);
          insertSlateText(editor, target.value, at);
        } else {
          setError(true);
        }
      },
      [editor, firstChild]
    );

    useEffect(() => {
      if (error && !readOnly) {
        const stringToCut = "#document-TEI-text-body-";
        dispatch(updateSaveAllowed(false));
        dispatch(
          updateAlertMessage({
            message: t("editor.invalid_fields", {
              path: path?.slice(stringToCut.length) ?? "",
            }),
            level: "warning",
            hideAfter: undefined,
          })
        );
      } else {
        dispatch(updateSaveAllowed(true));
      }
    }, [dispatch, error, path, readOnly, t]);

    return readOnly ? (
      <LabeledField
        label={<FormLabel color="readonly">{t("editor.idno")}</FormLabel>}
      >
        {children}
      </LabeledField>
    ) : (
      <LabeledField
        label={t("editor.idno")}
        action={
          path?.includes(TEI_ELEMENT_ALT_IDENTIFIER) && (
            <DeleteSlateNodeButton element={element} />
          )
        }
      >
        <TranslatedAutocomplete
          onChange={insertValueAutocompleteForIdno}
          value={HSPNode.extractText(element)}
          options={signaturen}
          freeSolo={!path || path.includes(TEI_ELEMENT_ALT_IDENTIFIER)}
          disableClearable
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              autoFocus
              {...params}
              error={error}
              onChange={insertTextForIdno}
              helperText={error ? t("editor.idno_not_empty") : ""}
              variant="filled"
              size="small"
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  className: "autocomplete-input-style",
                },
              }}
            />
          )}
          slots={{
            popper: FullscreenPopper,
          }}
        />
        <span style={{ display: "none" }}>{children}</span>
      </LabeledField>
    );
  }
);
