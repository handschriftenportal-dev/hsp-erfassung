import { ListItem, ListItemText } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

import { ThesaurusBaumItem } from './ThesaurusBaumItem'

interface Props {
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const BaumAuswahl: FC<Props> = memo(({ state, api, dispatch }) => {
  const { t } = useTranslation()
  const themenbereich = api.themenbereich({ notation: state.notation })!
  return (
    <>
      {themenbereich.thesauri.map((id) => {
        const thesaurus = api.thesaurus({ id })
        return thesaurus ? (
          <ThesaurusBaumItem
            key={id}
            thesaurus={thesaurus}
            state={state}
            dispatch={dispatch}
            api={api}
          />
        ) : (
          <ListItem key={id}>
            <ListItemText>
              {t('subject_area_dialog.unknown_thesaurus', { id })}
            </ListItemText>
          </ListItem>
        )
      })}
    </>
  )
})
