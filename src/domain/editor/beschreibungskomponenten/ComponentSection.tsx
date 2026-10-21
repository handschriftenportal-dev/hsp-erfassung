import { Grid } from "@mui/material";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { BeschreibungsKomponenteAccordion } from "src/domain/editor/BeschreibungsKomponenteAccordion";
import { HeadLine } from "src/domain/editor/HeadLine";
import {
  HorizontalRule,
  HorizontalRuleLight,
} from "src/domain/editor/HorizontalRule";
import { selectReadOnly } from "src/domain/erfassung/ErfassungsState";
import {
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_PHYSICAL,
} from "src/domain/erfassung/TEIConstants";

interface Props extends RenderElementProps {
  headlineKey: string;
  helperTextKey: string;
}

export const BESCHREIBUNGS_KOMPONENTEN_LEVEL = 5;
export const INDENTATION = 24;
const noShiftComponents = new Set([
  TEI_ELEMENT_PHYSICAL,
  TEI_ELEMENT_DECONOTE_FORM,
]);

export const ComponentSection: FC<Props> = ({
  attributes,
  element,
  children,
  headlineKey,
  helperTextKey,
}) => {
  const readOnly = useSelector(selectReadOnly);
  const { t } = useTranslation();
  const { id, level = BESCHREIBUNGS_KOMPONENTEN_LEVEL, region = "" } = element;
  const relativeLevel = level - BESCHREIBUNGS_KOMPONENTEN_LEVEL;

  const margin = {
    marginLeft: `${relativeLevel > 0 ? INDENTATION : 0}px`,
  };
  const subcomponentRulerShift = {
    marginLeft: noShiftComponents.has(region)
      ? "0px"
      : `${-INDENTATION * (relativeLevel - 1)}px`,
  };

  return (
    <Grid id={id} size={12}>
      {level === BESCHREIBUNGS_KOMPONENTEN_LEVEL ? (
        <HorizontalRule />
      ) : (
        <HorizontalRuleLight style={subcomponentRulerShift} />
      )}
      <div style={margin}>
        {readOnly ? (
          <>
            <HeadLine label={t(headlineKey)} labelSize="h3" />
            <Grid container {...attributes}>
              {children}
            </Grid>
          </>
        ) : (
          <BeschreibungsKomponenteAccordion
            attributes={attributes}
            element={element}
            level={relativeLevel}
            headline={t(headlineKey)}
            helperText={t(helperTextKey)}
          >
            {children}
          </BeschreibungsKomponenteAccordion>
        )}
      </div>
    </Grid>
  );
};
