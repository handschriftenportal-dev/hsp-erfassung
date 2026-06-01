import { FavoriteBorder, KeyboardArrowDown } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import type { Dispatch, FC, MouseEvent } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'

interface Props {
  state: SonderzeichenAuswahlState
  dispatch: Dispatch<SonderzeichenAuswahlAction>
}

export const SonderzeichenGruppenAuswahl: FC<Props> = memo(
  function SonderzeichenGruppenAuswahl({ state, dispatch }) {
    const { t } = useTranslation()

    const handleGruppenChange = useCallback(
      (event: SelectChangeEvent) => {
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
