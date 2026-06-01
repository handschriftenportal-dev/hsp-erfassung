import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import type { FC } from 'react'
import { memo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteWhiteIcon } from 'src/domain/editor/icons/DeleteWhiteIcon'
import { HSPRightButton } from 'src/domain/editor/styles/HSPRightButton'
import type {
  Begriff,
  Identifier,
} from 'src/domain/erfassung/ThemenbereicheAPI'
import { DraggableDialog } from 'src/infrastructure/components/DraggableDialog'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { useThemenbereich } from 'src/infrastructure/normdaten/ThemenbereichService'
import type { VolltextThemenbereich } from 'src/infrastructure/slate/volltext/VolltextElement'

import { AuswahlAnsicht } from './themenbereichDialog/komponenten/AuswahlAnsicht'
import { BegriffAuswahl } from './themenbereichDialog/komponenten/BegriffAuswahl'
import { ErrorDialog } from './themenbereichDialog/komponenten/ErrorDialog'
import { ThemenbereichDialogReducer } from './themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from './themenbereichDialog/ThemenbereichDialogState'

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
      <DraggableDialog
        title={t('subject_area_dialog.title', {
          label: themenbereich.label,
        })}
        maxWidth={'lg'}
        onClose={hideModal}
      >
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
            autoFocus
            value={state.linkedText}
            onChange={(event) =>
              dispatch({
                type: 'setLinkedText',
                payload: event.target.value,
              })
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
                    ThemenbereichDialogState.uniqueSelection(state)
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
                disableTouchRipple
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
      </DraggableDialog>
    )
  }
)
