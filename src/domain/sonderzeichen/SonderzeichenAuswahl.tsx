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

import { Paper } from '@mui/material'
import { FC, memo, useCallback, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { useFavoriten } from '../../infrastructure/persistence/FavoritenService'
import { Sonderzeichen } from './Sonderzeichen'
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
