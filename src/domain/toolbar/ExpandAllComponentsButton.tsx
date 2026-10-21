import type { MouseEvent } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExpandAllComponents,
  updateExpandAllComponents,
} from "src/domain/erfassung/ErfassungsState";

import { UnfoldLessIcon } from "./icons/UnfoldLessIcon";
import { UnfoldMoreIcon } from "./icons/UnfoldMoreIcon";
import { HSPToolbarButton } from "./styles/HSPToolbarButton";

export const ExpandAllComponentsButton = memo(() => {
  const dispatch = useDispatch();
  const isExpanded = useSelector(selectExpandAllComponents);
  const { t } = useTranslation();

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(updateExpandAllComponents(!isExpanded));
  };
  return (
    <HSPToolbarButton
      title={
        isExpanded
          ? t("toolbar.collapse_all_components_action")
          : t("toolbar.expand_all_components_action")
      }
      onMouseDown={handleMouseDown}
    >
      {isExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
    </HSPToolbarButton>
  );
});
