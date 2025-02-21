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

import { DialogActions, DialogContent, TextField } from '@mui/material'
import { FC, memo, useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalModalContext } from '../../../../infrastructure/modal/GlobalModal'
import { APICall } from '../../../../infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from '../../../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { DeleteWhiteIcon } from '../../icons/DeleteWhiteIcon'
import { HSPRightButton } from '../../styles/HSPRightButton'
import { BeziehungsMehrfachAuswahl } from '../dialog/BeziehungsMehrfachAuswahl'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from '../styles/NormdatenStyle'
import { NormdatumAutocompleteSearch } from './NormdatumAutocompleteSearch'
import { NormdatumDialog } from './NormdatumDialog'
import { NormdatumDialogAction } from './NormdatumDialogAction'
import { NormdatumDialogReducer } from './NormdatumDialogReducer'
import { NormdatumDialogState } from './NormdatumDialogState'

interface Props {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

export const EditNormdatumDialogBody: FC<Props> = memo(
  ({ initialState, onAction }) => {
    const { t } = useTranslation()
    const { showModal } = useGlobalModalContext()
    const [state, dispatch] = useReducer(NormdatumDialogReducer, initialState)
    useEffect(() => {
      if (state.status === NormdatumDialogState.status.init) {
        SBBNormdatenServiceAdapter.fetchEntityById(state.identifier).then(
          (response) => {
            if (APICall.isSuccess(response)) {
              dispatch({
                type: 'set_normdatum',
                normdatum: {
                  preferredName: response.value.preferredName,
                  gndIdentifier: response.value.gndIdentifier,
                },
              })
            } else {
              dispatch({ type: 'set_search', search: state.text })
            }
          }
        )
      }
    }, [state, dispatch])

    const afterImport = useCallback(
      (fact: GNDEntityFact | undefined) => {
        const newState =
          fact === undefined
            ? state
            : NormdatumDialogReducer(state, {
                type: 'set_normdatum',
                normdatum: {
                  identifier: fact.id,
                  gndIdentifier: fact.gndIdentifier,
                  preferredName: fact.preferredName,
                },
              })
        showModal(
          <NormdatumDialog initialState={newState} onAction={onAction} />
        )
      },
      [onAction, showModal, state]
    )

    return (
      <>
        <DialogContent>
          <TextField
            variant="standard"
            autoFocus={true}
            fullWidth
            label={t('text_tagging.referenz.dialog.normdata_text')}
            onChange={(event) =>
              dispatch({ type: 'set_text', text: event.target.value })
            }
            defaultValue={state.text}
          />
          <NormdatumAutocompleteSearch
            afterImport={afterImport}
            state={state}
            onSearchChange={(search) =>
              dispatch({
                type: 'set_search',
                search,
              })
            }
            onChange={(normdatum) =>
              dispatch({
                type: 'set_normdatum',
                normdatum,
              })
            }
          />
          <BeziehungsMehrfachAuswahl
            normdatum={state.type}
            value={state.rollen}
            onChange={(rollen) => dispatch({ type: 'set_rollen', rollen })}
          />
        </DialogContent>
        <DialogActions>
          <ActionDetermineButton
            className={'black-add-button-style'}
            disableTouchRipple={true}
            disabled={!NormdatumDialogState.is.submittable(state)}
            onClick={() => onAction('submit', state)}
          >
            {t('editor.determine')}
          </ActionDetermineButton>
          <ActionCancelButton
            className={'grey-add-button-style'}
            disableTouchRipple={true}
            disabled={false}
            onClick={() => onAction('cancel', state)}
          >
            {t('editor.cancellation')}
          </ActionCancelButton>
          {NormdatumDialogState.is.deletable(state) && (
            <HSPRightButton
              title={t('editor.remove_normdata_reference')}
              disableTouchRipple={true}
              disabled={false}
              onClick={() => onAction('delete', state)}
              style={{
                backgroundColor: 'white',
              }}
            >
              <DeleteWhiteIcon />
            </HSPRightButton>
          )}
        </DialogActions>
      </>
    )
  }
)
