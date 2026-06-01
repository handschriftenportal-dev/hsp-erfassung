import AddBoxIcon from '@mui/icons-material/AddBox'
import { Box, List, ListSubheader, Typography } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

import { AuswahlAnsichtItem } from './AuswahlAnsichtItem'

interface Props {
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const AuswahlAnsicht: FC<Props> = memo(({ api, dispatch, state }) => {
  const { t } = useTranslation()
  const { auswahl } = state

  return auswahl.length === 0 ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AddBoxIcon
        sx={{
          fontSize: 64,
          color: 'text.secondary',
          opacity: 0.3,
        }}
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {t('subject_area_dialog.no_concepts_selected')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('subject_area_dialog.no_concepts_selected_helper_text')}
      </Typography>
    </Box>
  ) : (
    <List
      dense
      className="themenbereich-dialog-ansicht"
      subheader={
        <ListSubheader>
          {t('subject_area_dialog.selected_concepts_header')}
        </ListSubheader>
      }
    >
      {auswahl.map((item) => (
        <AuswahlAnsichtItem
          dispatch={dispatch}
          key={item.id}
          api={api}
          item={item}
          readOnly={state.readOnly}
        />
      ))}
    </List>
  )
})
