import { Close } from '@mui/icons-material'
import { DialogTitle, IconButton } from '@mui/material'
import type { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onClose?: MouseEventHandler<HTMLButtonElement>
  id?: string
}

export const ClosableDialogTitle: FC<PropsWithChildren<Props>> = memo(
  function ClosableDialogTitle({ id, children, onClose }) {
    const { t } = useTranslation()
    return (
      <>
        <DialogTitle id={id} className="closable-dialog-title">
          {children}
        </DialogTitle>
        {onClose && (
          <IconButton
            title={t('editor.close_dialog')}
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 14,
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </>
    )
  }
)
