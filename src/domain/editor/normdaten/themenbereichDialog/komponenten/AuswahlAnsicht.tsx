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

import { List, ListItemText, ListSubheader } from '@mui/material'
import { Dispatch, FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ThemenbereicheAPI } from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../ThemenbereichDialogState'
import { AuswahlAnsichtItem } from './AuswahlAnsichtItem'
import { UnbekannteAusgewaehlteNotationItem } from './UnbekannteAusgewaehlteNotationItem'

interface Props {
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const AuswahlAnsicht: FC<Props> = memo(({ api, dispatch, state }) => {
  const { t } = useTranslation()
  const { auswahl } = state
  const removeItem = useCallback(
    (id: string) => {
      dispatch({ type: 'removeBegriff', payload: id })
    },
    [dispatch]
  )

  return (
    <List
      dense
      className="themenbereich-dialog-ansicht"
      subheader={
        <ListSubheader>
          {t('subject_area_dialog.selected_concepts_header')}
        </ListSubheader>
      }
    >
      {auswahl.length === 0 ? (
        <ListItemText
          secondary={t('subject_area_dialog.no_concepts_selected')}
        />
      ) : (
        auswahl.map((id) => {
          const begriff = api.begriff({ id })
          return begriff ? (
            <AuswahlAnsichtItem
              key={id}
              begriff={begriff}
              readOnly={state.readOnly}
              onRemove={removeItem}
            />
          ) : (
            <UnbekannteAusgewaehlteNotationItem
              readOnly={state.readOnly}
              notation={id}
              key={id}
              onRemove={removeItem}
            />
          )
        })
      )}
    </List>
  )
})
