import type { FC } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { RenderElementProps } from "slate-react";
import { BaseElement } from "src/domain/editor/BaseElement";
import { ReadOnlyLabeledField } from "src/domain/editor/ReadOnlyLabeledField";
import { NormdatenService } from "src/domain/erfassung/NormdatenService";
import {
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
} from "src/domain/erfassung/TEIConstants";
import { ErfassungsRegeln } from "src/infrastructure/slate/ErfassungsRegeln";
import { HSPNode } from "src/infrastructure/slate/HSPNode";

import { NormdataWithAutocomplete } from "./NormdataWithAutocomplete";

interface Props extends RenderElementProps {}

const MsPartAndMsIdentifier: FC<Props> = ({ element }) => {
  const { t } = useTranslation();
  const { data_origin } = element;
  const { required } = ErfassungsRegeln.regionElementRegel(
    "msPart",
    data_origin
  );

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t("editor.settlement")}
      origin={NormdatenService.nodeLabel.ort}
      required={required}
    />
  );
};

const MsDescMsIdentifierAndMSIdentifierSettlement: FC<Props> = ({
  element,
}) => {
  const { t } = useTranslation();
  return (
    <ReadOnlyLabeledField label={t("editor.settlement")}>
      {HSPNode.extractFirstText(element)}
    </ReadOnlyLabeledField>
  );
};

const MsDescMsIdentifierAndAltIdentifierSettlement: FC<Props> = ({
  element,
}) => {
  const { t } = useTranslation();
  const { region = "", data_origin } = element;
  const { required } = ErfassungsRegeln.regionElementRegel(region, data_origin);

  return (
    <NormdataWithAutocomplete
      element={element}
      title={t("editor.place")}
      origin={NormdatenService.nodeLabel.ort}
      required={required}
    />
  );
};

const MS_IDENTIFIER_SETTLEMENT = "msIdentifier-settlement";
const ALT_IDENTIFIER_SETTLEMENT = "altIdentifier-settlement";

export const Settlement: FC<Props> = memo(
  ({ element, attributes, children }) => {
    const { path = "" } = element;
    let SettlementComponent: FC<Props>;

    if (
      path.includes(TEI_ELEMENT_MSPART) &&
      path.includes(TEI_ELEMENT_IDENTIFICATION)
    ) {
      SettlementComponent = MsPartAndMsIdentifier;
    } else if (
      path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
      path.includes(MS_IDENTIFIER_SETTLEMENT)
    ) {
      SettlementComponent = MsDescMsIdentifierAndMSIdentifierSettlement;
    } else if (
      path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) &&
      path.includes(ALT_IDENTIFIER_SETTLEMENT)
    ) {
      SettlementComponent = MsDescMsIdentifierAndAltIdentifierSettlement;
    } else {
      SettlementComponent = BaseElement;
    }

    return (
      <SettlementComponent attributes={attributes} element={element}>
        {children}
      </SettlementComponent>
    );
  }
);
