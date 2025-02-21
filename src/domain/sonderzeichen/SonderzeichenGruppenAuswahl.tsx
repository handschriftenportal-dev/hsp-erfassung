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

import { FavoriteBorder, KeyboardArrowDown } from '@mui/icons-material'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { Dispatch, FC, memo, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

interface Props {
  state: SonderzeichenAuswahlState
  dispatch: Dispatch<SonderzeichenAuswahlAction>
}

export const SonderzeichenGruppenAuswahl: FC<Props> = memo(
  function SonderzeichenGruppenAuswahl({ state, dispatch }) {
    const { t } = useTranslation()

    const handleGruppenChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        dispatch({ type: 'setGruppe', payload: event.target.value })
      },
      [dispatch]
    )
    const handleAnsichtChange = useCallback(
      (_event: MouseEvent, ansicht: string) => {
        if (ansicht !== null) {
          dispatch({ type: 'setAnsicht', payload: ansicht })
        } else {
          dispatch({ type: 'setGruppe', payload: 'gesamt' })
          dispatch({ type: 'setSuche', payload: '' })
        }
      },
      [dispatch]
    )
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: 1,
          padding: '0 8px 8px 8px',
        }}
      >
        <ToggleButtonGroup
          aria-label={t('special_character.set_group_label')}
          color="primary"
          size="small"
          exclusive
          value={state.ansicht}
          onChange={handleAnsichtChange}
        >
          <ToggleButton
            value={SonderzeichenAuswahlState.ansicht.favoriten}
            aria-label={t('special_character.favorite_set_button')}
          >
            <FavoriteBorder fontSize="small" />
            {t('special_character.favorite_set_button')}
          </ToggleButton>
          <ToggleButton
            value={SonderzeichenAuswahlState.ansicht.zeichensaetze}
            aria-label={t('special_character.character_set_button')}
          >
            {t('special_character.character_set_button')}
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControl
          size="small"
          variant="standard"
          className={'sonderzeichen-gruppen-select'}
        >
          <InputLabel id="id-gruppen-select">
            {t('special_character.group_select_label')}
          </InputLabel>
          <Select
            labelId="id-gruppen-select"
            value={state.gruppe}
            onChange={handleGruppenChange}
            IconComponent={KeyboardArrowDown}
            disabled={SonderzeichenAuswahlState.zeigeFavoriten(state)}
            MenuProps={{
              PaperProps: {
                elevation: 1,
                square: true,
                className: 'sonderzeichen-gruppen-menu',
              },
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
          >
            {state.gruppen.map((gruppe) => {
              return (
                <MenuItem key={gruppe} value={gruppe}>
                  {t(`special_character.groups.${gruppe}`)}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
    )
  }
)
