import { OpenInNew } from '@mui/icons-material'
import { DialogActions, DialogContent, TextField } from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from 'src/domain/editor/normdaten/styles/NormdatenStyle'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { Link } from 'src/types/Link'

interface Props {
  initialValue?: Link
  onSave?: (value: Link) => void
  readOnly?: boolean
}

export const ExternerLinkDialog: FC<Props> = memo(
  ({
    initialValue = { text: '', href: '' },
    onSave = console.warn,
    readOnly = false,
  }) => {
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()

    const [value, setValue] = useState(initialValue)
    const urlError =
      value.href !== '' && !DialogUtilities.isSafeWebUrl(value.href)

    const handleSave = useCallback(() => {
      if (DialogUtilities.isValidLink(value)) {
        onSave(value)
        hideModal()
      }
    }, [value, onSave, hideModal])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event
        if (key === 'Escape') {
          event.preventDefault()
          hideModal()
        } else if (key === 'Enter' && !readOnly) {
          event.preventDefault()
          handleSave()
        }
      }
      document.addEventListener('keydown', handleKeyDown, {
        capture: true,
        once: true,
      })
      return () => {
        document.removeEventListener('keydown', handleKeyDown, {
          capture: true,
        })
      }
    }, [readOnly, hideModal, handleSave])

    return (
      <DraggableDialog
        maxWidth={'md'}
        title={t('externer_link_dialog.title')}
        onClose={hideModal}
      >
        <DialogContent>
          <TextField
            variant="standard"
            label={t('externer_link_dialog.linked_text')}
            fullWidth
            autoFocus
            value={value.text}
            onChange={(event) =>
              setValue({ ...value, text: event.target.value })
            }
            slotProps={{
              input: {
                readOnly,
              },
            }}
          />
          <TextField
            fullWidth
            error={urlError}
            variant="standard"
            label={t('externer_link_dialog.linked_url')}
            helperText={urlError && t('literatur_dialog.invalid_url')}
            value={value.href}
            onChange={(event) =>
              setValue({ ...value, href: event.target.value })
            }
            slotProps={{
              input: {
                readOnly,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          {readOnly ? (
            <HSPRightButton
              aria-label={t('externer_link_dialog.open_link')}
              onClick={() => DialogUtilities.openInNewTab(value.href)}
              disableTouchRipple
              disabled={false}
              style={{ backgroundColor: 'white' }}
            >
              <OpenInNew />
            </HSPRightButton>
          ) : (
            <>
              <ActionCancelButton
                disableTouchRipple
                onClick={handleSave}
                className={'black-add-button-style'}
                disabled={!DialogUtilities.isValidLink(value)}
              >
                {t('externer_link_dialog.save')}
              </ActionCancelButton>
              <ActionDetermineButton
                disableTouchRipple
                onClick={hideModal}
                className={'grey-add-button-style'}
              >
                {t('externer_link_dialog.cancel')}
              </ActionDetermineButton>
            </>
          )}
        </DialogActions>
      </DraggableDialog>
    )
  }
)
