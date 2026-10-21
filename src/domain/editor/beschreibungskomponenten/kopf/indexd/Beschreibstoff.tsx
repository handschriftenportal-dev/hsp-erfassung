import { FormLabel } from "@mui/material";
import type { FC } from "react";
import { useState } from "react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import type { Element } from "slate";
import { useSlateStatic } from "slate-react";
import { LabeledTextField } from "src/domain/editor/LabeledTextField";
import { ThesaurusAuswahl } from "src/domain/editor/normdaten/ThesaurusAuswahl";
import { TitleTwoColumnElement } from "src/domain/editor/TitleTwoColumnElement";
import { BESCHREIBSTOFF_NORMDATUM } from "src/domain/erfassung/TEIConstants";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { TitledBlock } from "src/infrastructure/components/TitledBlock";
import { Notationen } from "src/infrastructure/normdaten/Notationen";
import type { TermElement } from "src/infrastructure/slate/HSPElement";
import { HSPElement } from "src/infrastructure/slate/HSPElement";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import { replaceMatchingChildren } from "src/infrastructure/slate/SlateBoundary";

interface Props {
  element: Element;
}

export const Beschreibstoff: FC<Props> = ({ element }) => {
  const editor = useSlateStatic();
  const id = useId();
  const { t } = useTranslation();

  const { children } = element;
  const [freitext, ...normdaten] = children as TermElement[];
  const [auswahl, setAuswahl] = useState(() =>
    normdaten.reduce<string[]>(
      (acc, termElement) =>
        termElement.data_key === undefined
          ? acc
          : [...acc, termElement.data_key],
      []
    )
  );

  return (
    <TitledBlock
      key={id}
      title={
        <TitleTwoColumnElement
          element={element}
          title={t("editor.material")}
          helperText={t("editor.help_text.material")}
        />
      }
    >
      <LabeledTextField
        label={t("editor.free_text")}
        element={freitext}
        indentLabel
      />
      <LabeledField
        label={
          <FormLabel id={id} className="indent-label">
            {t("editor.linked_normdata")}
          </FormLabel>
        }
      >
        <ThesaurusAuswahl
          multiple
          aria-labelledby={id}
          thesaurus={Notationen.thesaurus.beschreibstoff}
          auswahl={auswahl}
          onChange={(begriffe) => {
            const newTerm = HSPElement.termElement(BESCHREIBSTOFF_NORMDATUM);
            setAuswahl(begriffe.map((begriff) => begriff.identifier.id));
            const termElements =
              begriffe.length === 0
                ? newTerm.createEmpty()
                : begriffe.map((begriff) => newTerm.fromBegriff(begriff));
            replaceMatchingChildren(
              editor,
              element,
              HSPNode.isBeschreibstoffTermElement,
              termElements
            );
          }}
        />
      </LabeledField>
    </TitledBlock>
  );
};
