import { DialogActions, DialogContent, TextField } from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { NormdatumDialog } from 'src/domain/editor/dialoge/NormdatumDialog'
import { BeziehungsMehrfachAuswahl } from 'src/domain/editor/dialoge/normdatumDialog/BeziehungsMehrfachAuswahl'
import { DeleteWhiteIcon } from 'src/domain/editor/icons/DeleteWhiteIcon'
import {
  ActionCancelButton,
  ActionDetermineButton,
} from 'src/domain/editor/normdaten/styles/NormdatenStyle'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'

import { NormdatumAutocompleteSearch } from './NormdatumAutocompleteSearch'
import type { NormdatumDialogAction } from './NormdatumDialogAction'
import { NormdatumDialogReducer } from './NormdatumDialogReducer'
import { NormdatumDialogState } from './NormdatumDialogState'

interface Props {
  initialState: NormdatumDialogState
  onAction: (action: NormdatumDialogAction, state: NormdatumDialogState) => void
}

function translationKeysForState(state: NormdatumDialogState) {
  if (NormdatumDialogState.is.createView(state)) {
    return {
      textLabel: 'text_tagging.referenz.dialog.normdata_text_create',
      linkLabel: 'text_tagging.referenz.dialog.normdata_link_create',
    }
  }

  return {
    textLabel: 'text_tagging.referenz.dialog.normdata_text',
    linkLabel: 'text_tagging.referenz.dialog.normdata_link',
  }
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
                  gndIdentifier:
                    response.value.gndIdentifier ?? response.value.id,
                },
              })
            } else {
              dispatch({ type: 'set_search', search: state.text })
            }
          }
        )
      }
    }, [state, dispatch])

    const translationKeys = translationKeysForState(state)

    const afterImport = useCallback(
      (fact: GNDEntityFact | undefined) => {
        const newState =
          fact === undefined
            ? state
            : NormdatumDialogReducer(state, {
                type: 'set_normdatum',
                normdatum: {
                  identifier: fact.id,
                  gndIdentifier: fact.gndIdentifier ?? fact.id,
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
            autoFocus
            fullWidth
            label={t(translationKeys.textLabel)}
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
            label={t(translationKeys.linkLabel)}
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
            disableTouchRipple
            disabled={!NormdatumDialogState.is.submittable(state)}
            onClick={() => onAction('submit', state)}
          >
            {t('editor.determine')}
          </ActionDetermineButton>
          <ActionCancelButton
            className={'grey-add-button-style'}
            disableTouchRipple
            disabled={false}
            onClick={() => onAction('cancel', state)}
          >
            {t('editor.cancellation')}
          </ActionCancelButton>
          {NormdatumDialogState.is.deletable(state) && (
            <HSPRightButton
              title={t('editor.remove_normdata_reference')}
              disableTouchRipple
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
