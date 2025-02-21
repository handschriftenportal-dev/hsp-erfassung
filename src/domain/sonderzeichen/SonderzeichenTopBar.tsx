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

import { Close, Search } from '@mui/icons-material'
import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { Dispatch, FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { CloseIconButtonStyled } from '../editor/normdaten/styles/NormdatenStyle'
import { SonderzeichenAuswahlAction } from './SonderzeichenAuswahlReducer'
import { SonderzeichenAuswahlState } from './SonderzeichenAuswahlState'
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
