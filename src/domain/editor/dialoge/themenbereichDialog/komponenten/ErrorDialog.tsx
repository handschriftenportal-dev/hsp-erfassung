import { DialogContent } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'

interface Props {
  notation: string
}

export const ErrorDialog: FC<Props> = ({ notation }) => {
  const { hideModal } = useGlobalModalContext()
  const { t } = useTranslation()

  return (
    <DraggableDialog
      title={t('subject_area_dialog.error_dialog_title')}
      onClose={hideModal}
      maxWidth={'sm'}
    >
      <DialogContent>
        {t('subject_area_dialog.error_dialog_content', {
          notation,
        })}
      </DialogContent>
    </DraggableDialog>
  )
}
