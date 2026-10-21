import { FormLabel } from "@mui/material";
import type { FC } from "react";
import { memo, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { NormdatenMehrfachAuswahl } from "src/domain/editor/normdaten/NormdatenMehrfachAuswahl";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { selectGrundsprachen } from "src/domain/erfassung/ErfassungsState";
import { GNDEntityFact } from "src/domain/erfassung/GNDEntityFact";
import { GRUNDSPRACHE_NORMDATUM } from "src/domain/erfassung/TEIConstants";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";
import type { TermElement } from "src/infrastructure/slate/HSPElement";
import { HSPElement } from "src/infrastructure/slate/HSPElement";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import { replaceMatchingChildren } from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Grundsprache: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic();
  const id = useId();
  const { t } = useTranslation();
  const grundsprachen = useSelector(selectGrundsprachen);

  const { children } = element;
  const [freitext, ...normdaten] = children as TermElement[];
  const [auswahl, setAuswahl] = useState<GNDEntityFact[]>(() =>
    normdaten.reduce<GNDEntityFact[]>((result, termElement) => {
      const normdatum = GNDEntityFact.fromTermElement(termElement);
      return normdatum.id === "" ? result : [...result, normdatum];
    }, [])
  );

  return (
    <TitledBlock
      title={
        <TitleTwoColumnElement
          element={element}
          title={t("editor.textLang")}
          helperText={t("editor.help_text.text_language")}
        />
      }
    >
      <LabeledTextField
        indentLabel
        label={t("editor.free_text")}
        element={freitext}
      />
      <LabeledField
        label={
          <FormLabel className="indent-label" id={id}>
            {t("editor.linked_normdata")}
          </FormLabel>
        }
      >
        <NormdatenMehrfachAuswahl
          auswahl={auswahl}
          normdaten={grundsprachen}
          onChange={(auswahl) => {
            const newTerm = HSPElement.termElement(GRUNDSPRACHE_NORMDATUM);
            setAuswahl(auswahl);
            const termElements =
              auswahl.length === 0
                ? newTerm.createEmpty()
                : auswahl.map(newTerm.fromGNDEntityFact);
            replaceMatchingChildren(
              editor,
              element,
              HSPNode.isGrundspracheTermElement,
              termElements
            );
          }}
          aria-labelledby={id}
        />
      </LabeledField>
    </TitledBlock>
  );
});
