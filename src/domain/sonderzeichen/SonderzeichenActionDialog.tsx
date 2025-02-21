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

import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button, DialogActions, ToggleButton } from '@mui/material'
import { Dispatch, FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { useFavoriten } from '../../infrastructure/persistence/FavoritenService'
import { colors } from '../../theme'
import { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

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
