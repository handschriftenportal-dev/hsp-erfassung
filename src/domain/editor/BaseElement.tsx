import type { FC } from "react";
import type { RenderElementProps } from "slate-react";

interface Props extends Pick<RenderElementProps, "children" | "attributes"> {}

export const BaseElement: FC<Props> = ({ children, attributes }) => {
  return (
    <span {...attributes} className="base-element">
      {children}
    </span>
  );
};
