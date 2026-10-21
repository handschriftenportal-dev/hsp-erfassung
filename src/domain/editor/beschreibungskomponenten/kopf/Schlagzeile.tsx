import { FormLabel } from "@mui/material";
import { isEmpty } from "lodash";
import type { FC } from "react";
import { useId } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { BaseElement } from "src/domain/editor/BaseElement";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import { TEI_ELEMENT_HEAD } from "src/domain/erfassung/TEIConstants";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { HSPNode } from "src/infrastructure/slate/HSPNode";

interface Props extends RenderElementProps {}

export const Schlagzeile: FC<Props> = memo(
  ({ element, children, attributes }) => {
    const readOnly = useSelector(selectReadOnly);
    const { t } = useTranslation();
    const { path = "", data_type } = element;
    const id = useId();

    if (!path.includes(TEI_ELEMENT_HEAD)) {
      return <BaseElement attributes={attributes}>{children}</BaseElement>;
    }
    if (data_type !== "headline") {
      return null;
    }

    if (readOnly) {
      const content = HSPNode.extractFirstText(element).trim();
      if (isEmpty(content)) {
        return null;
      }
      return (
        <LabeledField
          label={
            <FormLabel color="readonly" id={id}>
              {t("editor.headline")}
            </FormLabel>
          }
        >
          <span aria-labelledby={id}>{children}</span>
        </LabeledField>
      );
    }

    return (
      <LabeledTextField
        label={t("editor.headline")}
        element={element}
        deletable={false}
        error={false}
      />
    );
  }
);
