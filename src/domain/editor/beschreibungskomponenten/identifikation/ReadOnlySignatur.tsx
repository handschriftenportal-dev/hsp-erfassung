import type { FC } from "react";
import { memo } from "react";
import type { RenderElementProps } from "slate-react";
import { ReadOnlyLabeledField } from "src/domain/editor/ReadOnlyLabeledField";
import { HSPNode } from "src/infrastructure/slate/HSPNode";

interface Props extends RenderElementProps {
  title: string;
}

export const ReadOnlySignatur: FC<Props> = memo(({ element, title }) => {
  const content = HSPNode.extractFirstText(element);
  return (
    content && (
      <ReadOnlyLabeledField label={title}>{content}</ReadOnlyLabeledField>
    )
  );
});
