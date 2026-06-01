import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button, DialogActions, ToggleButton } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoriten } from 'src/infrastructure/persistence/FavoritenService'
import { colors } from 'src/theme'

import type { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import type { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

interface Props {
  onSubmit: (key: string) => void
  state: SonderzeichenAuswahlState
  dispatch: Dispatch<SonderzeichenAuswahlAction>
}

export const SonderzeichenActionDialog: FC<Props> = memo(
  function SonderzeichenActionDialog({ dispatch, onSubmit, state }) {
    const { t } = useTranslation()
    const sonderzeichen = state.sonderzeichenKeys[state.auswahlIndex]
    const favoriten = useFavoriten()
    const isFavorite = favoriten.isFavorit(sonderzeichen)

    return (
      <DialogActions style={{ justifyContent: 'space-between' }}>
        <Button
          onClick={() => onSubmit(sonderzeichen)}
          variant={'submit'}
          size="small"
        >
          {t('special_character.submit_action')}
        </Button>
        <ToggleButton
          size="small"
          value="favorite"
          selected={isFavorite}
          onChange={() =>
            dispatch({ type: 'toggleFavorite', payload: sonderzeichen })
          }
          aria-label={t(
            isFavorite
              ? 'special_character.remove_favorite_action_label'
              : 'special_character.add_favorite_action_label'
          )}
        >
          {isFavorite ? (
            <Favorite sx={{ color: colors.primary.darkTerraCotta }} />
          ) : (
            <FavoriteBorder />
          )}
        </ToggleButton>
      </DialogActions>
    )
  }
)
