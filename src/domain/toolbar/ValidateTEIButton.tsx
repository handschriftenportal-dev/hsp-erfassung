import { CheckCircle } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Editor } from "slate";
import { useValidateTEI } from "src/domain/toolbar/useValidateTEI";
import { colors } from "src/theme";

import { ValidateIcon } from "./icons/ValidateIcon";
import { HSPToolbarButton } from "./styles/HSPToolbarButton";

interface Props {
  editor: Editor;
  withODD?: boolean;
}

export const ValidateTEIButton: FC<Props> = memo(
  ({ editor, withODD = false }) => {
    const { t } = useTranslation();
    const { validateXML, loading } = useValidateTEI(editor, withODD);

    return (
      <HSPToolbarButton
        id={withODD ? "validateTEIButtonODD" : "validateTEIButton"}
        title={
          withODD
            ? t("toolbar.validate_publication_action")
            : t("toolbar.validate_action")
        }
        disableTouchRipple
        onClick={validateXML}
        loading={loading}
        loadingIndicator={
          <CircularProgress
            size={32}
            thickness={4}
            sx={{ color: colors.greyscale.white }}
          />
        }
      >
        {withODD ? <CheckCircle /> : <ValidateIcon />}
      </HSPToolbarButton>
    );
  }
);
