import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'

interface Props {
  onDiscard: () => void
  onSave: () => Promise<{ success: boolean }>
}

export const NeuladenWarnungDialog: FC<Props> = ({ onDiscard, onSave }) => {
  const { hideModal } = useGlobalModalContext()
  const { t } = useTranslation()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = useCallback(async () => {
    setIsLoading(true)
    const result = await onSave()
    setIsLoading(false)
    if (result.success) {
      hideModal()
    } else {
      setError(true)
    }
  }, [hideModal, onSave])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'Escape') {
        event.preventDefault()
        hideModal()
      } else if (key === 'Enter' && !error) {
        event.preventDefault()
        handleSave()
      }
    }
    document.addEventListener('keydown', handleKeyDown, {
      capture: true,
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown, {
        capture: true,
      })
    }
  }, [hideModal, handleSave, error])

  return (
    <DraggableDialog title={t('neuladen_warnung_dialog.title')} maxWidth={'sm'}>
      <DialogContent>
        {t('neuladen_warnung_dialog.content')}
        {error ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <ErrorOutlineIcon color="error" />
            <Typography color="error">
              {t('neuladen_warnung_dialog.error')}
            </Typography>
          </Box>
        ) : (
          <Typography>{t('neuladen_warnung_dialog.call_to_action')}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>
          {t('neuladen_warnung_dialog.cancel_action')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onDiscard()
            hideModal()
          }}
        >
          {t('neuladen_warnung_dialog.discard_action')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={error}
          loading={isLoading}
        >
          {t('neuladen_warnung_dialog.save_action')}
        </Button>
      </DialogActions>
    </DraggableDialog>
  )
}
