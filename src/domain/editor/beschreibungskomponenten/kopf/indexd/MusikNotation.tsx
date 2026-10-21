import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { FC } from "react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import {
  HilfeButton,
  HilfeText,
} from "src/domain/editor/beschreibungskomponenten/hilfetexte";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import { createInsertTextChangeEventHandler } from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const MusikNotation: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation();
  const [showHelpText, setShowHelpText] = useState(false);
  const [termElement] = element.children as [Element];

  const handleMusicNotationEvent = createInsertTextChangeEventHandler(
    editor,
    termElement
  );

  return (
    <LabeledField
      label={
        <>
          <FormLabel>{t("editor.music_notation")}</FormLabel>
          <HilfeButton
            onClick={() => setShowHelpText(!showHelpText)}
            activated={showHelpText}
          />
        </>
      }
    >
      {showHelpText && (
        <HilfeText helperText={t("editor.help_text.music_notation")} />
      )}
      <FormControl
        variant="standard"
        style={{ display: "flex" }}
        component="fieldset"
      >
        <RadioGroup
          value={HSPNode.extractFirstText(termElement)}
          row
          aria-label={t("editor.music_notation")}
          name="musicNotation-row-radio-buttons-group"
        >
          <FormControlLabel
            style={{ marginRight: "50px" }}
            value=""
            control={<Radio onChange={handleMusicNotationEvent} />}
            label={t("editor.not_specified")}
          />
          <FormControlLabel
            style={{ marginRight: "50px" }}
            value="yes"
            control={<Radio onChange={handleMusicNotationEvent} />}
            label={t("editor.yes")}
          />
          <FormControlLabel
            value="no"
            control={<Radio onChange={handleMusicNotationEvent} />}
            label={t("editor.no")}
          />
        </RadioGroup>
      </FormControl>
    </LabeledField>
  );
});
