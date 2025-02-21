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

import { Search } from '@mui/icons-material'
import { InputAdornment, List, ListSubheader, TextField } from '@mui/material'
import { Dispatch, FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ThemenbereicheAPI } from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../ThemenbereichDialogState'
import { BaumAuswahl } from './BaumAuswahl'
import { SuchAuswahl } from './SuchAuswahl'

interface Props {
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const BegriffAuswahl: FC<Props> = memo(({ state, dispatch, api }) => {
  const { t } = useTranslation()
  return (
    <List
      dense
      className="themenbereich-dialog-auswahl"
      subheader={
        <ListSubheader>
          {t('subject_area_dialog.selection_header')}
          <TextField
            fullWidth
            hiddenLabel
            placeholder={t('subject_area_dialog.search_field_placeholder')}
            size="small"
            variant="outlined"
            className="importiere-normdatum-dialog-suche"
            value={state.suche}
            onChange={(event) =>
              dispatch({
                type: 'setSuche',
                payload: event.target.value,
              })
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </ListSubheader>
      }
    >
      {state.suche.length > 0 ? (
        <SuchAuswahl state={state} dispatch={dispatch} api={api} />
      ) : (
        <BaumAuswahl state={state} dispatch={dispatch} api={api} />
      )}
    </List>
  )
})
