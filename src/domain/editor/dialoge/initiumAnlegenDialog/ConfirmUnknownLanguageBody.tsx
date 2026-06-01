import { Button, DialogActions, DialogContent } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { PropsOf } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody.types'

export const ConfirmUnknownLanguageBody: FC<
  PropsOf<'confirming_unknown_language'>
> = ({ dispatch }) => {
  const { t } = useTranslation()
  return (
    <>
      <DialogContent>
        {t('initium_anlegen_dialog.confirm_unknown_language')}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'cancel' })}>
          {t('initium_anlegen_dialog.cancel_action')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'enter_initium' })}
        >
          {t('initium_anlegen_dialog.back_action')}
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'submit' })}
        >
          {t('initium_anlegen_dialog.confirm_action')}
        </Button>
      </DialogActions>
    </>
  )
}
