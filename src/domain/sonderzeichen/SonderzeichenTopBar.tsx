import { Close, Search } from '@mui/icons-material'
import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIconButtonStyled } from 'src/domain/editor/normdaten/styles/NormdatenStyle'

import type { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import type { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'
import { SonderzeichenGruppenAuswahl } from './SonderzeichenGruppenAuswahl'

interface Props {
  dispatch: Dispatch<SonderzeichenAuswahlAction>
  state: SonderzeichenAuswahlState
  onClose: () => void
}

export const SonderzeichenTopBar: FC<Props> = memo(
  function SonderzeichenTopBar({ dispatch, state, onClose }) {
    const { t } = useTranslation()

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: 1,
            padding: '8px',
          }}
        >
          <Typography
            variant={'h6'}
            display={'inline'}
            sx={{ fontSize: '18px', weight: 300 }}
          >
            {t('special_character.title')}
          </Typography>
          <Paper
            component={'form'}
            sx={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}
            variant={'outlined'}
            square
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={state.suche}
              onChange={(event) =>
                dispatch({ type: 'setSuche', payload: event.target.value })
              }
              placeholder={t('special_character.filter_input_placeholder')}
            />
            <IconButton
              disabled={state.suche === ''}
              onClick={() => dispatch({ type: 'setSuche', payload: '' })}
            >
              {state.suche === '' ? (
                <Search fontSize="small" />
              ) : (
                <Close fontSize="small" />
              )}
            </IconButton>
          </Paper>
          <CloseIconButtonStyled
            title={t('special_character.close_action')}
            onClick={onClose}
          >
            <Close fontSize={'small'} />
          </CloseIconButtonStyled>
        </Box>
        <SonderzeichenGruppenAuswahl state={state} dispatch={dispatch} />
      </>
    )
  }
)
