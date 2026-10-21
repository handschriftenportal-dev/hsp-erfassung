import { memo } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceVorschauDialog } from "src/domain/editor/dialoge/WorkspaceVorschauDialog";
import { useGlobalModalContext } from "src/infrastructure/modal/GlobalModal";

import { VisibilityNew24db2 } from "./icons/VisibilityNew24db2";
import { HSPToolbarButton } from "./styles/HSPToolbarButton";

export const WorkspaceVorschauButton = memo(() => {
  const { showModal } = useGlobalModalContext();
  const { t } = useTranslation();

  return (
    <HSPToolbarButton
      title={t("toolbar.preview_action")}
      onClick={() => showModal(<WorkspaceVorschauDialog />)}
      color="secondary"
    >
      {<VisibilityNew24db2 />}
    </HSPToolbarButton>
  );
});
