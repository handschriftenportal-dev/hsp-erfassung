import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { PropsOf } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody.types'
import { InitiumAnlegenDialogState } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogState'
import { NormdatenMehrfachAuswahl } from 'src/domain/editor/normdaten/NormdatenMehrfachAuswahl'
import { selectGrundsprachen } from 'src/domain/erfassung/ErfassungsState'

export const EnterInitiumBody: FC<PropsOf<'entering_initium'>> = ({
  dispatch,
  state,
}) => {
  const grundsprachen = useSelector(selectGrundsprachen)
  const { t } = useTranslation()
  const disabled = !InitiumAnlegenDialogState.isSubmittable(state)
  return (
    <>
      <DialogContent>
        <TextField
          variant="standard"
          label={t('initium_anlegen_dialog.initium_text')}
          fullWidth
          autoFocus
          value={state.text}
          onChange={(event) =>
            dispatch({ type: 'set_text', text: event.target.value })
          }
        />
        <NormdatenMehrfachAuswahl
          variant="standard"
          label={t('initium_anlegen_dialog.initium_language')}
          auswahl={state.languages}
          normdaten={grundsprachen}
          onChange={(auswahl) => {
            dispatch({ type: 'set_languages', languages: auswahl })
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'cancel' })}>
          {t('initium_anlegen_dialog.cancel_action')}
        </Button>
        <Button
          variant="contained"
          disabled={disabled}
          onClick={() => dispatch({ type: 'submit' })}
        >
          {t('initium_anlegen_dialog.create_action')}
        </Button>
      </DialogActions>
    </>
  )
}
