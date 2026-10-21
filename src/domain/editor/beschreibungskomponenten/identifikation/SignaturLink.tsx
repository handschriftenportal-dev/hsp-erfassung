import { Link } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import type { RenderElementProps } from "slate-react";
import { ReadOnlyLabeledField } from "src/domain/editor/ReadOnlyLabeledField";
import {
  selectConfiguration,
  selectReadOnly,
} from "src/domain/erfassung/ErfassungsState";
import { HSPLink } from "src/infrastructure/components/HSPLink";
import { LabeledField } from "src/infrastructure/components/LabeledField";
import { HSPNode } from "src/infrastructure/slate/HSPNode";
import { colors } from "src/theme";

interface Props extends RenderElementProps {
  title: string;
  link: string;
}

export const SignaturLink: FC<Props> = memo(function SignaturLink({
  element,
  title,
  link,
}) {
  const readOnly = useSelector(selectReadOnly);
  const { standalone } = useSelector(selectConfiguration);
  const text = HSPNode.extractFirstText(element);
  const hspId = standalone ? text : <HSPLink url={link}>{text}</HSPLink>;

  return readOnly || standalone ? (
    <ReadOnlyLabeledField label={title}>{hspId}</ReadOnlyLabeledField>
  ) : (
    <LabeledField label={title}>
      <Link
        style={{
          color: colors.special.linkBlue,
          display: "flex",
          padding: "20px 12px 8px 11px",
          backgroundColor: "rgba(79, 77, 75, 0.04)",
        }}
        href={link}
        target={"_blank"}
        underline="hover"
      >
        {text}
      </Link>
    </LabeledField>
  );
});
