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

import { OpenInNew } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../../../infrastructure/modal/GlobalModal'
import { HSPRightButton } from '../../styles/HSPRightButton'
import { DialogUtilities } from '../DialogUtilities'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from '../styles/NormdatenStyle'
import { NormdatenDialogTitle } from './NormdatenDialogTitle'

type Value = {
  text: string
  url: string
}

interface Props {
  initialValue?: Value
  onSave?: (value: Value) => void
  readOnly?: boolean
}

function isValidValue({ text, url }: Value): boolean {
  return text !== '' && url !== ''
}

export const ExternerLinkDialog: FC<Props> = memo(
  ({
    initialValue = { text: '', url: '' },
    onSave = console.warn,
    readOnly = false,
  }) => {
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()

    const [value, setValue] = useState(initialValue)
    const handleCancel = hideModal
    const handleSave = useCallback(() => {
      if (isValidValue(value)) {
        onSave(value)
        hideModal()
      }
    }, [value, onSave, hideModal])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event
        if (key === 'Escape') {
          event.preventDefault()
          handleCancel()
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
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [readOnly, handleCancel, handleSave])

    return (
      <Dialog open={true} maxWidth={'md'} fullWidth={true}>
        <NormdatenDialogTitle
          title={t('externer_link_dialog.title')}
          clickHandler={handleCancel}
        />
        <DialogContent>
          <TextField
            variant="standard"
            label={t('externer_link_dialog.linked_text')}
            fullWidth
            autoFocus={true}
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
            variant="standard"
            label={t('externer_link_dialog.linked_url')}
            fullWidth
            value={value.url}
            onChange={(event) =>
              setValue({ ...value, url: event.target.value })
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
              onClick={() => DialogUtilities.openInNewTab(value.url)}
              disableTouchRipple={true}
              disabled={false}
              style={{ backgroundColor: 'white' }}
            >
              <OpenInNew />
            </HSPRightButton>
          ) : (
            <>
              <ActionCancelButton
                disableTouchRipple={true}
                onClick={handleSave}
                className={'black-add-button-style'}
                disabled={!isValidValue(value)}
              >
                {t('externer_link_dialog.save')}
              </ActionCancelButton>
              <ActionDetermineButton
                disableTouchRipple={true}
                onClick={handleCancel}
                className={'grey-add-button-style'}
              >
                {t('externer_link_dialog.cancel')}
              </ActionDetermineButton>
            </>
          )}
        </DialogActions>
      </Dialog>
    )
  }
)
