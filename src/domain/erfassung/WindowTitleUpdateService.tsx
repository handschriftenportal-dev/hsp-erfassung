import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectBeschreibung,
  selectMode,
} from "src/domain/erfassung/ErfassungsState";
import { isReadOnly } from "src/domain/erfassung/ViewMode";

export const WindowTitleUpdateService = () => {
  const { t } = useTranslation();
  const { signature } = useSelector(selectBeschreibung);
  const isPreview = isReadOnly(useSelector(selectMode));

  useEffect(() => {
    document.title = t(isPreview ? "title.previewMode" : "title.editMode", {
      signature,
    });
  }, [signature, isPreview, t]);

  return null;
};
