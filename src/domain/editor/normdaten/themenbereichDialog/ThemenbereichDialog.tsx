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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material'
import { FC, memo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../../../infrastructure/modal/GlobalModal'
import { useThemenbereich } from '../../../../infrastructure/normdaten/ThemenbereichService'
import { VolltextThemenbereich } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { Begriff, Identifier } from '../../../erfassung/ThemenbereicheAPI'
import { DeleteWhiteIcon } from '../../icons/DeleteWhiteIcon'
import { HSPRightButton } from '../../styles/HSPRightButton'
import { NormdatenDialogTitle } from '../dialog/NormdatenDialogTitle'
import { AuswahlAnsicht } from './komponenten/AuswahlAnsicht'
import { BegriffAuswahl } from './komponenten/BegriffAuswahl'
import { ErrorDialog } from './komponenten/ErrorDialog'
import { ThemenbereichDialogReducer } from './ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from './ThemenbereichDialogState'

interface Props {
  initialState: ThemenbereichDialogState
  onAbort?: () => void
  onDelete?: () => void
  onSave?: (
    linkedText: string,
    auswahl: VolltextThemenbereich['auswahl']
  ) => void
}

const idToVolltextThemenbereichAuswahl = (
  result: Identifier[],
  begriff: Begriff | undefined
): Identifier[] => {
  return begriff ? result.concat(begriff.identifier) : result
}

export const ThemenbereichDialog: FC<Props> = memo(
  ({ initialState, onAbort, onDelete, onSave }) => {
    const api = useThemenbereich()
    const [state, dispatch] = useReducer(
      ThemenbereichDialogReducer,
      initialState
    )
    const { hideModal } = useGlobalModalContext()
    const { t } = useTranslation()

    const themenbereich = api.themenbereich({ notation: state.notation })
    const { readOnly } = state

    return themenbereich === undefined ? (
      <ErrorDialog notation={state.notation} />
    ) : (
      <Dialog open={true} fullWidth maxWidth={'lg'}>
        <NormdatenDialogTitle
          title={t('subject_area_dialog.title', {
            label: themenbereich.label,
          })}
          clickHandler={hideModal}
        />
        <DialogContent
          className={
            readOnly
              ? 'themenbereich-dialog-layout-readonly'
              : 'themenbereich-dialog-layout-edit'
          }
        >
          <TextField
            variant="standard"
            label={t('subject_area_dialog.linked_text')}
            className="themenbereich-dialog-linked-text"
            fullWidth
            autoFocus={true}
            value={state.linkedText}
            onChange={(event) =>
              dispatch({ type: 'setLinkedText', payload: event.target.value })
            }
            slotProps={{
              input: {
                readOnly: state.readOnly,
              },
            }}
          />
          {!readOnly && (
            <BegriffAuswahl state={state} dispatch={dispatch} api={api} />
          )}
          <AuswahlAnsicht state={state} dispatch={dispatch} api={api} />
        </DialogContent>
        {!readOnly && (
          <DialogActions>
            {onAbort && (
              <Button onClick={onAbort} variant={'secondary'}>
                {t('subject_area_dialog.abort_action')}
              </Button>
            )}
            {onSave && (
              <Button
                variant="submit"
                onClick={() =>
                  onSave(
                    state.linkedText.trim(),
                    state.auswahl
                      .map((id) => api.begriff({ id }))
                      .reduce(idToVolltextThemenbereichAuswahl, [])
                  )
                }
                disabled={!ThemenbereichDialogState.canSubmit(state)}
              >
                {t('subject_area_dialog.save_action')}
              </Button>
            )}
            {onDelete && (
              <HSPRightButton
                title={t('subject_area_dialog.delete_action')}
                disableTouchRipple={true}
                disabled={false}
                onClick={onDelete}
                style={{
                  backgroundColor: 'white',
                }}
              >
                <DeleteWhiteIcon />
              </HSPRightButton>
            )}
          </DialogActions>
        )}
      </Dialog>
    )
  }
)
