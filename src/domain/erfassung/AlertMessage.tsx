import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton, Snackbar } from '@mui/material'
import type { FC, PropsWithChildren, SyntheticEvent } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { selectAlertMessage } from './ErfassungsState'

export interface AlertMessage {
  message: string
  level: 'info' | 'warning' | 'error'
  hideAfter?: number
}

export const AlertMessage: FC<PropsWithChildren> = memo(function AlertMessage({
  children,
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const alertMessage = useSelector(selectAlertMessage)
  useEffect(() => {
    setOpen(!!alertMessage)
  }, [alertMessage, setOpen])
  const handleClose = useCallback(
    (_event: SyntheticEvent | Event, reason?: string): void => {
      if (reason !== 'clickaway') {
        setOpen(false)
      }
    },
    []
  )

  return (
    <>
      {open && alertMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={alertMessage.hideAfter ?? 4000}
          onClose={handleClose}
        >
          <Alert severity={alertMessage.level}>
            <div>{alertMessage.message}</div>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              title={t('toolbar.close')}
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Alert>
        </Snackbar>
      )}
      {children}
    </>
  )
})
