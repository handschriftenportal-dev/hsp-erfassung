import { DialogContent } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectBeschreibung,
  selectConfiguration,
} from "src/domain/erfassung/ErfassungsState";
import { DraggableDialog } from "src/infrastructure/components/DraggableDialog";
import { useGlobalModalContext } from "src/infrastructure/modal/GlobalModal";

export const WorkspaceVorschauDialog = () => {
  const { t } = useTranslation();
  const { hideModal } = useGlobalModalContext();
  const { id, type } = useSelector(selectBeschreibung);
  const { workspaceUrl } = useSelector(selectConfiguration);
  const workspace = useMemo(
    () =>
      window.createHspWorkspace({
        classNamePrefix: "hsp-workspace",
        enableRouting: false,
        hspTeiEndpoint: workspaceUrl,
        theme: {},
        manifestEndpoint: "",
        kodEndpoint: "",
        persistStore: false,
      }),
    [workspaceUrl]
  );

  useEffect(() => {
    return () => {
      workspace.unmount();
    };
  }, [workspace]);

  const setWorkspaceContainer = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }
      workspace.mount({ main: node }).then(() => {
        workspace.addResource({
          id,
          type,
        });
      });
    },
    [id, type, workspace]
  );

  return (
    <DraggableDialog
      title={t("toolbar.preview_title")}
      maxWidth={"xl"}
      onClose={hideModal}
    >
      <DialogContent>
        <div style={{ height: "100vh" }} ref={setWorkspaceContainer} />
      </DialogContent>
    </DraggableDialog>
  );
};
