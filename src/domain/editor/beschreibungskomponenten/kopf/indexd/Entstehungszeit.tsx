import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { AddIndexElementButton } from "src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton";
import { useInsertNewTEINodeForIndex } from "src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";
import { ErfassungsRegeln } from "src/infrastructure/slate/ErfassungsRegeln";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import { createInsertTextChangeEventHandler } from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Entstehungszeit: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation();
  const { data_indexName = "" } = element;
  const [origDate, notBefore, notAfter, dateType] =
    element.children as Element[];
  const { id } = origDate;
  const useInsertNewOrigDateElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    origDate
  );
  const { repeatable } = ErfassungsRegeln.indexRegel(data_indexName);
  const notBeforeValue = HSPNode.extractFirstText(notBefore);
  const notAfterValue = HSPNode.extractFirstText(notAfter);
  const dateTypeValue = HSPNode.extractFirstText(dateType);

  return (
    <TitledBlock
      key={id}
      title={
        <TitleTwoColumnElement
          element={element}
          title={t("editor.orig_date")}
          showDelete
          helperText={t("editor.help_text.orig_date")}
        />
      }
    >
      <LabeledTextField
        indentLabel
        label={t("editor.free_text")}
        element={origDate}
      />

      <Grid size={3} />
      <Grid size={2}>
        <TextField
          label={t("editor.not_before")}
          onChange={createInsertTextChangeEventHandler(editor, notBefore)}
          defaultValue={notBeforeValue}
          size="small"
          variant="filled"
          slotProps={{
            input: { className: "text-field-input-style" },
          }}
        />
      </Grid>
      <Grid size={2}>
        <TextField
          label={t("editor.not_after")}
          onChange={createInsertTextChangeEventHandler(editor, notAfter)}
          defaultValue={notAfterValue}
          size="small"
          variant="filled"
          slotProps={{
            input: { className: "text-field-input-style" },
          }}
        />
      </Grid>
      <Grid size={5} />
      <Grid size={3} />
      <Grid size={9}>
        <FormControl
          variant="standard"
          style={{ display: "flex" }}
          component="fieldset"
        >
          <RadioGroup
            value={dateTypeValue}
            row
            aria-label={t("editor.origTime")}
            name="orig-time-row-radio-buttons-group"
          >
            <FormControlLabel
              style={{ marginRight: "100px" }}
              value="datable"
              control={
                <Radio
                  onChange={createInsertTextChangeEventHandler(
                    editor,
                    dateType
                  )}
                />
              }
              label={t("editor.datable")}
            />
            <FormControlLabel
              value="dated"
              control={
                <Radio
                  onChange={createInsertTextChangeEventHandler(
                    editor,
                    dateType
                  )}
                />
              }
              label={t("editor.dated")}
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {repeatable && (
        <AddIndexElementButton
          element={element}
          insertNewErfassungsElementNode={useInsertNewOrigDateElement}
          buttonLabel={t("editor.orig_date")}
        />
      )}
    </TitledBlock>
  );
});
