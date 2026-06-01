import { Search } from '@mui/icons-material'
import { InputAdornment, List, ListSubheader, TextField } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

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
