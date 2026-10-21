import type { FC } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";

interface Props {
  element: Element;
}

export const KopfTitel: FC<Props> = memo(function KopfTitel({ element }) {
  const [termElement] = element.children as Element[];
  const { t } = useTranslation();

  return (
    <LabeledTextField label={t("editor.norm_title")} element={termElement} />
  );
});
