import { FormLabel } from "@mui/material";
import type { TFunction } from "i18next";
import { isEmpty } from "lodash";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { Element } from "slate";
import type { RenderElementProps } from "slate-react";
import { BaseElement } from "src/domain/editor/BaseElement";
import { getOptionStr } from "src/domain/editor/beschreibungskomponenten/BeschreibungsKomponentenCustomHooks";
import { Beschreibstoff } from "src/domain/editor/beschreibungskomponenten/kopf/indexd/Beschreibstoff";
import { Ueberlieferungsform } from "src/domain/editor/beschreibungskomponenten/kopf/indexd/Ueberlieferungsform";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import { ErfassungTEITermTypen } from "src/domain/erfassung/ErfassungTEITermTypen";
import { TEI_ELEMENT_HEAD } from "src/domain/erfassung/TEIConstants";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { HSPNode } from "src/infrastructure/slate/HSPNode";

import { Abmessungen } from "./Abmessungen";
import { Buchschmuck } from "./Buchschmuck";
import { Entstehungsort } from "./Entstehungsort";
import { Entstehungszeit } from "./Entstehungszeit";
import { Format } from "./Format";
import { Grundsprache } from "./Grundsprache";
import { KopfTitel } from "./KopfTitel";
import { MusikNotation } from "./MusikNotation";
import { Status } from "./Status";
import { Umfang } from "./Umfang";

interface Props extends RenderElementProps {}

function optionValueTranslateKey(content: string): string | undefined {
  switch (content) {
    case "not specified":
      return "editor.not_specified";
    case "yes":
      return "editor.yes";
    case "no":
      return "editor.no";
    default:
      return undefined;
  }
}

function dataTypeLabelTranslateKey(data_type: string): string {
  switch (data_type) {
    case "title":
      return "editor.norm_title";
    case "origPlace":
      return "editor.orig_place";
    case "origDate":
      return "editor.orig_date";
    case "musicNotation":
      return "editor.music_notation";
    default:
      return "editor." + data_type;
  }
}

function getTermField(
  element: Element,
  t: TFunction
): { label: string; content: string } | undefined {
  const { data_type = "" } = element;
  if (!ErfassungTEITermTypen.isTermTyp(data_type)) {
    return undefined;
  }

  const content = HSPNode.extractText(element).trim();
  if (isEmpty(content) && data_type !== "title") {
    return undefined;
  }

  const label = t(dataTypeLabelTranslateKey(data_type));

  switch (data_type) {
    case "decoration":
    case "musicNotation": {
      const translateKey = optionValueTranslateKey(content);
      return {
        label,
        content: translateKey === undefined ? content : t(translateKey),
      };
    }
    case "status": {
      return {
        label,
        content: t(data_type + "." + getOptionStr(content)),
      };
    }
    default: {
      return {
        label,
        content,
      };
    }
  }
}

const IndexReadOnly: FC<Pick<Props, "element">> = ({ element }) => {
  const { t } = useTranslation();
  const [termElement] = element.children as Element[];

  const field = getTermField(termElement, t);

  return (
    field && (
      <LabeledField
        label={<FormLabel color="readonly">{field.label}</FormLabel>}
      >
        {field.content}
      </LabeledField>
    )
  );
};

const IndexEditMode: FC<Pick<Props, "element">> = ({ element }) => {
  const [termElement] = element.children as [Element];
  const { data_type } = termElement;

  switch (data_type) {
    case "measure":
      return <Umfang element={element} />;
    case "format":
      return <Format element={element} />;
    case "origPlace":
      return <Entstehungsort element={element} />;
    case "origDate":
      return <Entstehungszeit element={element} />;
    case "textLang":
      return <Grundsprache element={element} />;
    case "form":
      return <Ueberlieferungsform element={element} />;
    case "status":
      return <Status element={element} />;
    case "decoration":
      return <Buchschmuck element={element} />;
    case "musicNotation":
      return <MusikNotation element={element} />;
    case "dimensions":
      return <Abmessungen element={element} />;
    case "material":
      return <Beschreibstoff element={element} />;
    case "title":
      return <KopfTitel element={element} />;
    default:
      return null;
  }
};
export const Index: FC<Props> = ({ element, children, attributes }) => {
  const readOnly = useSelector(selectReadOnly);
  const { path = "" } = element;

  if (!path.includes(TEI_ELEMENT_HEAD)) {
    return <BaseElement attributes={attributes}>{children}</BaseElement>;
  }

  return readOnly ? (
    <IndexReadOnly element={element} />
  ) : (
    <IndexEditMode element={element} />
  );
};
