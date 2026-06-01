import { List, ListSubheader, Paper } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { FachbegriffItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

import { AuswahlAnsichtItem } from './AuswahlAnsichtItem'

interface Props {
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
  item: FachbegriffItem
}

export const NotwendigeBegriffe: FC<Props> = ({ api, dispatch, item }) => {
  const { t } = useTranslation()
  if (item.beziehungen.notwendig.length === 0) {
    return undefined
  }
  const {
    beziehungen: { auswahl, notwendig },
  } = item
  return (
    <Paper variant={'outlined'} sx={{ marginLeft: 8 }}>
      <List
        dense
        subheader={
          <ListSubheader>
            {t('subject_area_dialog.necessary_concepts')}
          </ListSubheader>
        }
      >
        {notwendig.map((id) => (
          <AuswahlAnsichtItem
            api={api}
            dispatch={dispatch}
            item={{ id }}
            key={id}
            disabled
            checked={auswahl.has(id)}
          />
        ))}
      </List>
    </Paper>
  )
}
