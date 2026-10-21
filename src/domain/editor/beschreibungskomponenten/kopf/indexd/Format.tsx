import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { isEmpty } from "lodash";
import type { FC } from "react";
import { memo, useId } from "react";
import { useTranslation } from "react-i18next";
import { Element as ScrollAnchor } from "react-scroll";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { AddIndexElementButton } from "src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton";
import { useInsertNewTEINodeForIndex } from "src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks";
import { ThesaurusAuswahl } from "src/domain/editor/normdaten/ThesaurusAuswahl";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";
import { Notationen } from "src/infrastructure/normdaten/Notationen";
import { HSPElement } from "src/infrastructure/slate/HSPElement";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import {
  findPath,
  insertSlateText,
  replaceMatchingChildren,
} from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Format: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation();
  const { children, data_indexName = "" } = element;
  const termElements = children as Element[];
  const [format, formatType] = termElements;
  const { error, id: formatId = "" } = format;
  const labelFormat = useId();
  const labelType = useId();
  const useInsertNewFormatElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    format
  );

  const selectValue = formatType ? HSPNode.extractFirstText(formatType) : "";

  return (
    <TitledBlock
      title={
        <TitleTwoColumnElement
          showDelete
          element={element}
          title={t("editor.format")}
          helperText={t("editor.help_text.format")}
        />
      }
    >
      <LabeledField
        label={
          <ScrollAnchor name={formatId}>
            <FormLabel
              className="indent-label"
              error={!isEmpty(error)}
              id={labelFormat}
            >
              {t("editor.format_normdatum")}
            </FormLabel>
            :
          </ScrollAnchor>
        }
      >
        <ThesaurusAuswahl
          thesaurus={Notationen.thesaurus.format}
          auswahl={format.data_key}
          aria-labelledby={labelFormat}
          onChange={(begriff) =>
            replaceMatchingChildren(
              editor,
              element,
              (_) => true,
              HSPElement.formatElementFactory(begriff, selectValue)
            )
          }
        />
      </LabeledField>
      <LabeledField
        label={
          <FormLabel className="indent-label" id={labelType}>
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
              const at = findPath(editor, formatType);
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
            <MenuItem value="computed">
              {t("editor.type_of_information.computed")}
            </MenuItem>
          </Select>
        </FormControl>
      </LabeledField>
      <AddIndexElementButton
        element={element}
        insertNewErfassungsElementNode={useInsertNewFormatElement}
        buttonLabel={t("editor.format")}
      />
    </TitledBlock>
  );
});
