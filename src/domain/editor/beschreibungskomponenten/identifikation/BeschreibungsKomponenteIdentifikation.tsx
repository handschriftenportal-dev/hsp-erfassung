import { Grid } from "@mui/material";
import type { FC, JSX } from "react";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { BeschreibungsKomponenteAccordion } from "src/domain/editor/BeschreibungsKomponenteAccordion";
import {
  BESCHREIBUNGS_KOMPONENTEN_LEVEL,
  INDENTATION,
} from "src/domain/editor/beschreibungskomponenten/ComponentSection";
import { AddElementButton } from "src/domain/editor/beschreibungskomponenten/identifikation/AddElementButton";
import { HeadLine } from "src/domain/editor/HeadLine";
import {
  HorizontalRule,
  HorizontalRuleLight,
} from "src/domain/editor/HorizontalRule";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from "src/domain/erfassung/TEIConstants";

interface Props extends RenderElementProps {}

type GroupReactElementsResult = {
  andere: JSX.Element[];
  corpus: JSX.Element[];
  vorbesitzer: JSX.Element[];

  ort: JSX.Element[];
  koerperschaft: JSX.Element[];
};

function groupReactElements(children: JSX.Element[]): GroupReactElementsResult {
  return children.reduce<GroupReactElementsResult>(
    (result, child) => {
      const { data_origin, data_type } =
        child?.props?.children?.props?.element ?? {};

      switch (data_origin) {
        case TEI_ELEMENT_SETTLEMENT:
          result.ort.push(child);
          break;
        case TEI_ELEMENT_REPOSITORY:
          result.koerperschaft.push(child);
          break;
      }

      switch (data_type) {
        case VORBESITZER_DATA_TYPE:
          result.vorbesitzer.push(child);
          break;
        case SAMMLUNG_DATA_TYPE:
          result.corpus.push(child);
          break;
        default:
          result.andere.push(child);
      }

      return result;
    },
    {
      vorbesitzer: [],
      corpus: [],
      andere: [],
      ort: [],
      koerperschaft: [],
    }
  );
}

const TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING: boolean = true;

export const BeschreibungsKomponenteIdentifikation: FC<Props> = memo(
  function BeschreibungsKomponenteIdentifikation({
    element,
    children,
    attributes,
  }) {
    const readOnly = useSelector(selectReadOnly);
    const { t } = useTranslation();
    const { path = "", level = BESCHREIBUNGS_KOMPONENTEN_LEVEL, id } = element;

    const reactElementGroups = groupReactElements(children);

    const content = (
      <Grid container size={12}>
        {reactElementGroups.andere}

        {reactElementGroups.ort.length === 0 && (
          <AddElementButton type={"ort"} element={element}>
            {t("editor.settlement")}
          </AddElementButton>
        )}
        {reactElementGroups.koerperschaft.length === 0 && (
          <AddElementButton type={"koerperschaft"} element={element}>
            {t("editor.repository")}
          </AddElementButton>
        )}
        {path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) && (
          <>
            <span>{reactElementGroups.corpus}</span>
            {!TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING && (
              <AddElementButton type={"sammlung"} element={element} gap={"mid"}>
                {t("editor.corpus")}
              </AddElementButton>
            )}
          </>
        )}
        <span>{reactElementGroups.corpus}</span>
        {!TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING &&
          (path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
            reactElementGroups.vorbesitzer.length === 0) && (
            <AddElementButton
              element={element}
              type={"vorbesitzer"}
              gap={"mid"}
            >
              {t("editor.former_signature")}
            </AddElementButton>
          )}
      </Grid>
    );

    const relativeLevel = level - BESCHREIBUNGS_KOMPONENTEN_LEVEL;
    const marginLeft = relativeLevel > 0 ? INDENTATION : 0;
    const margin = {
      marginLeft: `${marginLeft}px`,
    };
    const style = {
      marginLeft: `${-INDENTATION * (relativeLevel - 1)}px`,
    };

    return (
      <section id={id}>
        {level === BESCHREIBUNGS_KOMPONENTEN_LEVEL ? (
          <HorizontalRule />
        ) : (
          <HorizontalRuleLight style={style} />
        )}
        <div style={margin}>
          {!readOnly ? (
            <BeschreibungsKomponenteAccordion
              attributes={attributes}
              element={element}
              level={relativeLevel}
              headline={t("sidebar.identification")}
              helperText={t("editor.help_text.identifikation")}
            >
              {content}
            </BeschreibungsKomponenteAccordion>
          ) : (
            <>
              <HeadLine label={t("sidebar.identification")} labelSize="h3" />
              <Grid container size={12}>
                {reactElementGroups.andere}
                {reactElementGroups.corpus}
                {reactElementGroups.vorbesitzer}
              </Grid>
            </>
          )}
        </div>
      </section>
    );
  }
);
