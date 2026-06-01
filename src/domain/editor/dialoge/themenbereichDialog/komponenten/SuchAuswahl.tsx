import { ListItem, ListItemText, ListSubheader } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { Fragment, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type {
  SearchResult,
  ThemenbereicheAPI,
} from 'src/domain/erfassung/ThemenbereicheAPI'

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
            const checked = state.auswahl.some((item) => item.id === id)
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
