import { Paper } from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoriten } from 'src/infrastructure/persistence/FavoritenService'

import type { Sonderzeichen } from './Sonderzeichen'
import { SonderzeichenActionDialog } from './SonderzeichenActionDialog'
import { SonderzeichenAPI } from './SonderzeichenAPI'
import { SonderzeichenAuswahlReducer } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'
import { SonderzeichenGrid } from './SonderzeichenGrid'
import { SonderzeichenTopBar } from './SonderzeichenTopBar'

interface Props {
  onClose?: () => void
  onSubmit?: (sonderzeichen: Sonderzeichen) => void
}

const noop = () => undefined

export const SonderzeichenAuswahl: FC<Props> = memo(
  function SonderzeichenAuswahl({ onSubmit = noop, onClose = noop }) {
    const { t } = useTranslation()
    const favoritenAPI = useFavoriten()
    const [state, dispatch] = useReducer(
      SonderzeichenAuswahlReducer,
      SonderzeichenAuswahlState.empty(favoritenAPI)
    )

    const submitHandler = useCallback(
      (key: string) => {
        onSubmit(SonderzeichenAPI.getSonderzeichen(key))
      },
      [onSubmit]
    )

    return (
      <Paper
        role="dialog"
        aria-modal="false"
        aria-label={t('special_character.aria_label')}
        square
        variant="elevation"
        className="sonderzeichen-auswahl-container"
        elevation={12}
      >
        <SonderzeichenTopBar
          state={state}
          dispatch={dispatch}
          onClose={onClose}
        />
        <SonderzeichenGrid
          state={state}
          dispatch={dispatch}
          onSubmit={submitHandler}
        />
        <SonderzeichenActionDialog
          state={state}
          dispatch={dispatch}
          onSubmit={submitHandler}
        />
      </Paper>
    )
  }
)
