import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import type { FC, MouseEvent } from "react";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sendDocumentSpeichernEvent } from "src/domain/editor/HSPEditorDomainEvents";
import { ChangeEvent } from "src/domain/erfassung/ChangeEvent";
import {
  addChangeToHistory,
  readDocument,
  saveDocument,
  selectConfiguration,
  selectReadOnly,
  selectUnsavedDocument,
  updateAlertMessage,
  updateApplicationBusy,
  writeDocument,
} from "src/domain/erfassung/ErfassungsState";
import { NachweisEvents } from "src/infrastructure/nachweis/NachweisEvents";
import type { NachweisSperren } from "src/infrastructure/nachweis/NachweisServiceAdapter";
import {
  useFetchBeschreibung,
  useFindBeschreibungsSperren,
} from "src/infrastructure/nachweis/NachweisServiceHooks";

import { CancelWhiteIcon } from "./icons/CancelWhiteIcon";
import { EditWhiteIcon } from "./icons/EditWhiteIcon";
import { HSPToolbarButton } from "./styles/HSPToolbarButton";

interface Props {}

export const LesenBearbeitenButton: FC<Props> = memo(() => {
  const readOnly = useSelector(selectReadOnly);
  const { isEditable, standalone } = useSelector(selectConfiguration);
  const unsavedChanges = useSelector(selectUnsavedDocument);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [readWriteDisabled, setReadWriteDisabled] = useState(false);
  const { t } = useTranslation();
  const findBeschreibungsSperren = useFindBeschreibungsSperren();
  const fetchBeschreibung = useFetchBeschreibung();

  const switchReadOnlyState = useCallback(() => {
    dispatch(updateApplicationBusy(true));
    setTimeout(() => {
      if (readOnly) {
        if (!standalone) {
          findBeschreibungsSperren().then(
            (sperren: NachweisSperren[]): void => {
              if (sperren.length > 0) {
                dispatch(
                  updateAlertMessage({
                    message: t("toolbar.description_already_locked"),
                    level: "error",
                  })
                );
                setReadWriteDisabled(true);
                NachweisEvents.beschreibungAktualisieren();
              } else {
                dispatch(writeDocument());
              }
            }
          );
        } else {
          dispatch(writeDocument());
        }
      } else {
        dispatch(readDocument());
      }
      setOpenDialog(false);
      dispatch(updateApplicationBusy(false));
    }, 0);
  }, [dispatch, findBeschreibungsSperren, readOnly, standalone, t]);

  const checkUnsavedDocument = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      if (unsavedChanges && !readOnly) {
        setOpenDialog(true);
      } else {
        switchReadOnlyState();
      }
    },
    [unsavedChanges, readOnly, switchReadOnlyState]
  );

  const handleCancel = useCallback(() => setOpenDialog(false), []);

  const handleNo = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      fetchBeschreibung();
      dispatch(readOnly ? writeDocument() : readDocument());
      setOpenDialog(false);
      dispatch(saveDocument());
      dispatch(addChangeToHistory(ChangeEvent.handle_no_save_dialog()));
    },
    [dispatch, fetchBeschreibung, readOnly]
  );

  const handleYes = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      sendDocumentSpeichernEvent();
      switchReadOnlyState();
      dispatch(addChangeToHistory(ChangeEvent.handle_yes_save_dialog()));
    },
    [dispatch, switchReadOnlyState]
  );

  return (
    <>
      <HSPToolbarButton
        title={
          readOnly
            ? t("toolbar.write_action")
            : t("toolbar.finish_writing_action")
        }
        disabled={!isEditable || readWriteDisabled}
        onClick={checkUnsavedDocument}
      >
        {readOnly ? <EditWhiteIcon /> : <CancelWhiteIcon />}
      </HSPToolbarButton>
      <Dialog open={openDialog}>
        <DialogTitle>{t("toolbar.confirm_save_title")}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleYes} color="primary">
            {t("toolbar.yes_action")}
          </Button>
          <Button onClick={handleNo} color="primary">
            {t("toolbar.no_action")}
          </Button>
          <Button onClick={handleCancel} color="primary">
            {t("toolbar.cancel_action")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
