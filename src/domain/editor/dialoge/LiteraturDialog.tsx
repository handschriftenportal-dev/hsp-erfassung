import { OpenInNew } from '@mui/icons-material'
import {
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogUtilities } from 'src/domain/editor/dialoge/DialogUtilities'
import { DeleteWhiteIcon } from 'src/domain/editor/icons/DeleteWhiteIcon'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from 'src/domain/editor/normdaten/styles/NormdatenStyle'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import { LiteraturService } from 'src/infrastructure/literatur/LiteraturService'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { Link } from 'src/types/Link'

interface Props {
  initialValue?: Link
  onSave?: (value: Link) => void
  onDelete?: () => void
  readOnly?: boolean
}

export const LiteraturDialog: FC<Props> = memo(
  ({
    initialValue = { text: '', href: '' },
    onSave = console.warn,
    readOnly = false,
    onDelete,
  }) => {
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()

    const [value, setValue] = useState(initialValue)
    const urlError =
      value.href !== '' && !DialogUtilities.isSafeWebUrl(value.href)

    const description = LiteraturService.findByUri(value.href)?.description

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
        title={t('literatur_dialog.title')}
        onClose={hideModal}
      >
        <DialogContent>
          <TranslatedAutocomplete
            freeSolo
            openOnFocus
            options={LiteraturService.all()}
            inputValue={value.text}
            onInputChange={(_, newInputValue) => {
              setValue({ ...value, text: newInputValue })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={t('literatur_dialog.linked_text')}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    readOnly,
                  },
                }}
              />
            )}
            getOptionLabel={(option) => {
              return typeof option === 'string' ? option : option.title
            }}
            filterOptions={createFilterOptions({
              ignoreCase: true,
              matchFrom: 'start',
            })}
            onChange={(event, selection) => {
              event.preventDefault()
              if (selection === null) {
                setValue({ ...value, text: '' })
              } else if (typeof selection === 'string') {
                setValue({ ...value, text: selection })
              } else {
                setValue({ href: selection.uri, text: selection.title })
              }
            }}
          />
          <TextField
            error={urlError}
            variant="standard"
            label={t('literatur_dialog.linked_url')}
            helperText={urlError && t('literatur_dialog.invalid_url')}
            fullWidth
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
          {description && (
            <Typography variant="caption">{description}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {readOnly ? (
            <HSPRightButton
              aria-label={t('literatur_dialog.open_link')}
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
                {t('literatur_dialog.save_action')}
              </ActionCancelButton>
              <ActionDetermineButton
                disableTouchRipple
                onClick={hideModal}
                className={'grey-add-button-style'}
              >
                {t('literatur_dialog.cancel_action')}
              </ActionDetermineButton>
              {onDelete && (
                <HSPRightButton
                  title={t('literatur_dialog.delete_action')}
                  disableTouchRipple
                  onClick={() => {
                    onDelete()
                    hideModal()
                  }}
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <DeleteWhiteIcon />
                </HSPRightButton>
              )}
            </>
          )}
        </DialogActions>
      </DraggableDialog>
    )
  }
)
