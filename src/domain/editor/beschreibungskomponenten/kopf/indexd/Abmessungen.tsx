import { FormControl, FormLabel, Grid, MenuItem, Select } from "@mui/material";
import type { FC } from "react";
import { useId } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { AddIndexElementButton } from "src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton";
import { useInsertNewTEINodeForIndex } from "src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks";
import { BeschreibungsTextField } from "src/domain/editor/BeschreibungsTextField";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";
import { ErfassungsRegeln } from "src/infrastructure/slate/ErfassungsRegeln";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import {
  findPath,
  insertSlateText,
} from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Abmessungen: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation();
  const { data_indexName = "" } = element;
  const labelType = useId();
  const termElements = element.children;
  const [
    termDimensions,
    termHeight,
    termWidth,
    termDepth,
    termInformationType,
  ] = termElements as Element[];
  const { repeatable } = ErfassungsRegeln.indexRegel(data_indexName);

  const useAddNewDimensionIndexElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    termDimensions
  );

  const selectValue = termInformationType
    ? HSPNode.extractFirstText(termInformationType)
    : "";

  return (
    <TitledBlock
      title={
        <TitleTwoColumnElement
          element={element}
          title={t("editor.dimensions")}
          showDelete
          helperText={t("editor.help_text.dimension")}
        />
      }
    >
      <LabeledField
        label={
          <FormLabel className="indent-label">
            {t("editor.dimensions_label")}
          </FormLabel>
        }
      >
        <Grid container spacing={1}>
          <Grid size={6}>
            <BeschreibungsTextField
              element={termDimensions}
              label={t("editor.free_text")}
            />
          </Grid>
          <Grid size={2}>
            <BeschreibungsTextField
              element={termHeight}
              label={t("editor.height")}
            />
          </Grid>
          <Grid size={2}>
            <BeschreibungsTextField
              element={termWidth}
              label={t("editor.width")}
            />
          </Grid>
          <Grid size={2}>
            <BeschreibungsTextField
              element={termDepth}
              label={t("editor.depth")}
            />
          </Grid>
        </Grid>
      </LabeledField>
      <LabeledField
        label={
          <FormLabel id={labelType} className="indent-label">
            {t("editor.format_type")}
          </FormLabel>
        }
      >
        <FormControl
          variant="filled"
          style={{ display: "flex" }}
          component="fieldset"
          aria-labelledby={labelType}
        >
          <Select
            value={selectValue}
            onChange={(event) => {
              event.preventDefault();
              const at = findPath(editor, termInformationType);
              const target = event.target;
              if (at) {
                insertSlateText(editor, target.value, at);
              }
            }}
            size="small"
          >
            <MenuItem value="">
              <em>{t("editor.type_of_information.none")}</em>
            </MenuItem>
            <MenuItem value="deduced">
              {t("editor.type_of_information.deduced")}
            </MenuItem>
            <MenuItem value="factual">
              {t("editor.type_of_information.factual")}
            </MenuItem>
          </Select>
        </FormControl>
      </LabeledField>
      {repeatable && (
        <AddIndexElementButton
          element={element}
          insertNewErfassungsElementNode={useAddNewDimensionIndexElement}
          buttonLabel={t("editor.dimensions")}
        />
      )}
    </TitledBlock>
  );
});
