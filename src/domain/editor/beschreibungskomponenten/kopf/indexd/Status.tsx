import { FormLabel, TextField } from "@mui/material";
import { isEmpty } from "lodash";
import type { FC } from "react";
import { type SyntheticEvent, useCallback } from "react";
import { useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Element as ScrollAnchor } from "react-scroll";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { getOptionStr } from "src/domain/editor/beschreibungskomponenten/BeschreibungsKomponentenCustomHooks";
import {
  HilfeButton,
  HilfeText,
} from "src/domain/editor/beschreibungskomponenten/hilfetexte";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TranslatedAutocomplete } from "src/infrastructure/components/TranslatedAutocomplete";
import { ErfassungsRegeln } from "src/infrastructure/slate/ErfassungsRegeln";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import {
  findPath,
  insertSlateText,
} from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Status: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation();
  const [termElement] = element.children as Element[];
  const error = element.error ?? termElement.error;
  const id = element.id ?? termElement.id ?? "";
  const [showHelpText, setShowHelpText] = useState(false);
  const editor = useSlateStatic();

  const changeStatus = useCallback(
    (event: SyntheticEvent, value: string | null) => {
      event.preventDefault();
      value = value || "";

      const path = findPath(editor, termElement);
      if (path) {
        insertSlateText(editor, value, path);
      }
    },
    [editor, termElement]
  );

  return (
    <LabeledField
      label={
        <ScrollAnchor name={id}>
          <FormLabel error={!isEmpty(error)}>{t("editor.status")}</FormLabel>
          <HilfeButton
            onClick={() => setShowHelpText(!showHelpText)}
            activated={showHelpText}
          />
        </ScrollAnchor>
      }
    >
      {showHelpText && <HilfeText helperText={t("editor.help_text.status")} />}
      <TranslatedAutocomplete
        options={ErfassungsRegeln.statusValues()}
        classes={{
          option: "autocomplete-option-style",
          paper: "autocomplete-paper-style",
          input: "autocomplete-input-style",
        }}
        value={HSPNode.extractFirstText(element)}
        getOptionLabel={(option: string) => t("status." + getOptionStr(option))}
        onChange={changeStatus}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="filled"
            title={"status"}
          />
        )}
      />
    </LabeledField>
  );
});
