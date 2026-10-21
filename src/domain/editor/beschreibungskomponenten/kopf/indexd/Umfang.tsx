import type { FC } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";

interface Props {
  element: Element;
}

export const Umfang: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation();
  const [freeText, sheetCount] = element.children as Element[];

  return (
    <TitledBlock
      title={
        <TitleTwoColumnElement
          element={element}
          title={t("editor.measure")}
          helperText={t("editor.help_text.measure")}
        />
      }
    >
      <LabeledTextField
        indentLabel
        label={t("editor.free_text")}
        element={freeText}
        deletable={false}
        error={false}
      />
      <LabeledTextField
        indentLabel
        label={t("editor.sheet_count")}
        element={sheetCount}
        deletable={false}
        error={false}
      />
    </TitledBlock>
  );
});
