/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton, Snackbar } from '@mui/material'
import {
  FC,
  memo,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
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
