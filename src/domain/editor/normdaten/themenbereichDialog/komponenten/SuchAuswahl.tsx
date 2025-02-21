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

import { ListItem, ListItemText, ListSubheader } from '@mui/material'
import { Dispatch, FC, Fragment, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  SearchResult,
  ThemenbereicheAPI,
} from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../ThemenbereichDialogState'
import { BegriffItem } from './BegriffItem'

interface Props {
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

const DEBOUNCE_TIME_MS = 350

export const SuchAuswahl: FC<Props> = memo(({ state, dispatch, api }) => {
  const { t } = useTranslation()
  const { notation, suche } = state
  const [results, setResults] = useState<SearchResult[]>(() =>
    api.search(notation, suche)
  )

  useEffect(() => {
    const searchApi = setTimeout(() => {
      setResults(api.search(notation, suche))
    }, DEBOUNCE_TIME_MS)
    return () => clearTimeout(searchApi)
  }, [api, notation, suche])

  return results.length === 0 ? (
    <ListItem>
      <ListItemText secondary={t('subject_area_dialog.no_search_results')} />
    </ListItem>
  ) : (
    <>
      {results.map(({ thesaurus, begriffe }) => (
        <Fragment key={thesaurus.identifier.id}>
          <ListSubheader key={thesaurus.identifier.id + '-subheader'}>
            {thesaurus.label}
          </ListSubheader>
          {begriffe.map((begriff) => {
            const {
              identifier: { id },
            } = begriff
            const checked = state.auswahl.includes(id)
            return (
              <BegriffItem
                key={id}
                checked={checked}
                begriff={begriff}
                onChange={dispatch}
              />
            )
          })}
        </Fragment>
      ))}
    </>
  )
})
