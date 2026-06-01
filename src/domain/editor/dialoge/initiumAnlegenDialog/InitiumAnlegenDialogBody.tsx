import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmUnknownLanguageBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/ConfirmUnknownLanguageBody'
import { EnterInitiumBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/EnterInitiumBody'
import type { Props } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody.types'
import { ResolveDuplicateInitiumBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/ResolveDuplicateInitiumBody'

const ErrorBody: FC<Props> = ({ dispatch, state }) => {
  const { t } = useTranslation()
  return (
    <>
      <DialogContent>
        {`Could not create the initium (${state.type})`}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'cancel' })}>
          {t('initium_anlegen_dialog.cancel_action')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'enter_initium' })}
        >
          {t('initium_anlegen_dialog.back_action')}
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'submit' })}
        >
          {t('initium_anlegen_dialog.close_action')}
        </Button>
      </DialogActions>
    </>
  )
}

const NoUserInteractionBody: FC<Props> = ({ dispatch, state }) => {
  const { t } = useTranslation()
  return (
    <>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={48} />
          <Typography variant="body1" color="text.secondary" align="center">
            {t(`initium_anlegen_dialog.no_user_interaction.${state.type}`)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'cancel' })}>
          {t('initium_anlegen_dialog.cancel_action')}
        </Button>
        <Button disabled variant="contained">
          {t('initium_anlegen_dialog.create_action')}
        </Button>
      </DialogActions>
    </>
  )
}

export const InitiumAnlegenDialogBody: FC<Props> = ({ dispatch, state }) => {
  switch (state.type) {
    case 'entering_initium':
      return <EnterInitiumBody dispatch={dispatch} state={state} />
    case 'confirming_unknown_language':
      return <ConfirmUnknownLanguageBody dispatch={dispatch} state={state} />
    case 'resolving_duplicates':
      return <ResolveDuplicateInitiumBody dispatch={dispatch} state={state} />
    case 'error':
      return <ErrorBody dispatch={dispatch} state={state} />
    case 'cancel':
      return undefined
    default:
      return <NoUserInteractionBody dispatch={dispatch} state={state} />
  }
}
