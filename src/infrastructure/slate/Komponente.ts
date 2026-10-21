import type { Element } from "slate";
import {
  TEI_ATTRIBUTE_TYPE_ACCMAT,
  TEI_ATTRIBUTE_TYPE_BINDING,
  TEI_ATTRIBUTE_TYPE_BOOKLET,
  TEI_ATTRIBUTE_TYPE_CONTENT,
  TEI_ATTRIBUTE_TYPE_FORM,
  TEI_ATTRIBUTE_TYPE_FRAGMENT,
  TEI_ATTRIBUTE_TYPE_MUSIC,
  TEI_ATTRIBUTE_TYPE_OTHER,
  TEI_ATTRIBUTE_TYPE_TEXT,
  TEI_ELEMENT_ADDITIONAL,
  TEI_ELEMENT_DECONOTE,
  TEI_ELEMENT_HEAD,
  TEI_ELEMENT_HISTORY,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_MSPART,
  TEI_ELEMENT_NOTE,
  TEI_ELEMENT_PHYSICAL,
} from "src/domain/erfassung/TEIConstants";

export type KomponentenTyp =
  | "identifikation"
  | "kopf"
  | "aeusseres"
  | "inhalt"
  | "abschnitt"
  | "inhaltText"
  | "inhaltMusik"
  | "inhaltKunst"
  | "aeusseresKunst"
  | "geschichte"
  | "literatur"
  | "einband"
  | "fragment"
  | "faszikel"
  | "beigabe"
  | "sonstiges";

const KOMPONENTE_BY_ORIGIN: Record<string, KomponentenTyp> = {
  [TEI_ELEMENT_HISTORY]: "geschichte",
  [TEI_ELEMENT_ADDITIONAL]: "literatur",
  [TEI_ELEMENT_PHYSICAL]: "aeusseres",
  [TEI_ELEMENT_IDENTIFICATION]: "identifikation",
  [TEI_ELEMENT_HEAD]: "kopf",
  [TEI_ELEMENT_MSCONTENTS]: "inhalt",
  [TEI_ELEMENT_ITEM]: "abschnitt",
};

const KOMPONENTE_BY_ORIGIN_AND_TYPE: Record<
  string,
  Record<string, KomponentenTyp>
> = {
  [TEI_ELEMENT_NOTE]: {
    [TEI_ATTRIBUTE_TYPE_TEXT]: "inhaltText",
    [TEI_ATTRIBUTE_TYPE_MUSIC]: "inhaltMusik",
  },
  [TEI_ELEMENT_DECONOTE]: {
    [TEI_ATTRIBUTE_TYPE_CONTENT]: "inhaltKunst",
    [TEI_ATTRIBUTE_TYPE_FORM]: "aeusseresKunst",
  },
  [TEI_ELEMENT_MSPART]: {
    [TEI_ATTRIBUTE_TYPE_BINDING]: "einband",
    [TEI_ATTRIBUTE_TYPE_FRAGMENT]: "fragment",
    [TEI_ATTRIBUTE_TYPE_ACCMAT]: "beigabe",
    [TEI_ATTRIBUTE_TYPE_BOOKLET]: "faszikel",
    [TEI_ATTRIBUTE_TYPE_OTHER]: "sonstiges",
  },
};

function type(element: Element): KomponentenTyp | undefined {
  const { data_origin, data_type } = element;
  return (
    KOMPONENTE_BY_ORIGIN[data_origin] ??
    (data_type !== undefined
      ? KOMPONENTE_BY_ORIGIN_AND_TYPE[data_origin]?.[data_type]
      : undefined)
  );
}

export const Komponente = Object.freeze({
  type,
});
