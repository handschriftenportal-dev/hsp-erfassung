import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type {
  ThemenbereicheAPI,
  Thesaurus,
} from 'src/domain/erfassung/ThemenbereicheAPI'

import { BaumAuswahlItem } from './BaumAuswahlItem'

interface Props {
  thesaurus: Thesaurus
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const ThesaurusBaumItem: FC<Props> = memo(
  ({ thesaurus, state, dispatch, api }) => {
    const { t } = useTranslation()
    const id = thesaurus.identifier.id
    const collapsed = !state.collapsed.has(id)
    return (
      <>
        <ListItem>
          <ListItemIcon>
            <IconButton
              onClick={() =>
                dispatch({
                  type: 'toggleCollapseIdentifier',
                  payload: id,
                })
              }
            >
              {collapsed ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </ListItemIcon>
          <ListItemText>{thesaurus.label}</ListItemText>
        </ListItem>
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {thesaurus.unterBegriffe.map((id) => {
              const begriff = api.begriff({ id })
              return begriff ? (
                <BaumAuswahlItem
                  key={id}
                  begriff={begriff}
                  state={state}
                  dispatch={dispatch}
                  api={api}
                />
              ) : (
                <ListItem key={id}>
                  <ListItemText>
                    {t('subject_area_dialog.unknown_concept', { id })}
                  </ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }
)
