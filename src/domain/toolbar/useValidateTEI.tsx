import { type MouseEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { Editor } from "slate";
import {
  selectConfiguration,
  selectValidationState,
  updateAlertMessage,
  updateValidationState,
} from "src/domain/erfassung/ErfassungsState";
import { ValidierungsFehlerAnzeige } from "src/domain/toolbar/ValidierungsFehlerAnzeige";
import ConfigureReduxStore from "src/infrastructure/ConfigureReduxStore";
import { useGlobalModalContext } from "src/infrastructure/modal/GlobalModal";
import { validateTEI } from "src/infrastructure/nachweis/NachweisServiceAdapter";
import type {
  ValidationError,
  ValidationResponse,
} from "src/infrastructure/nachweis/ValidationResponse";
import {
  detailErrorsToValidationErrors,
  unsetElementMatchId,
  updateNodes,
} from "src/infrastructure/slate/SlateBoundary";
import { XMLPipeline } from "src/infrastructure/slate/transformation/XMLPipeline";

export function useValidateTEI(editor: Editor, withODD: boolean) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { validationUrl } = useSelector(selectConfiguration);
  const validationState = useSelector(selectValidationState);
  const { t } = useTranslation();
  const { showModal } = useGlobalModalContext();

  const validateXML = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setLoading(true);
      event.preventDefault();
      validateTEI(
        validationUrl,
        XMLPipeline.serialize({
          data: ConfigureReduxStore.getState().erfassung.slateValue,
        }).data,
        withODD
      )
        .then((response: ValidationResponse) => {
          const newValidationState = detailErrorsToValidationErrors(
            editor,
            response.details
          );
          validationState.forEach(({ id }: ValidationError): void => {
            unsetElementMatchId(editor, "error", id);
          });
          newValidationState.forEach(
            ({ path, error }: ValidationError): void => {
              updateNodes(editor, { error }, path);
            }
          );
          dispatch(updateValidationState(newValidationState));

          if (newValidationState.length === 0) {
            const { message, valid } = response;
            dispatch(
              updateAlertMessage({
                level: valid ? "info" : "error",
                message,
              })
            );
          } else {
            showModal(<ValidierungsFehlerAnzeige />);
          }
        })
        .catch(() => {
          dispatch(
            updateAlertMessage({
              level: "error",
              message: t("toolbar.validate_server_error_msg"),
            })
          );
        })
        .finally(() => setLoading(false));
    },
    [dispatch, editor, showModal, t, validationState, validationUrl, withODD]
  );

  return { validateXML, loading };
}
