import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo } from 'react'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import type {
  Begriff,
  ThemenbereicheAPI,
} from 'src/domain/erfassung/ThemenbereicheAPI'

import { BaumAuswahlBlattBox } from './BaumAuswahlLeafBox'
import { BegriffItem } from './BegriffItem'

interface Props {
  level?: number
  begriff: Begriff
  state: ThemenbereichDialogState
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
}

export const BaumAuswahlItem: FC<Props> = memo(
  ({ begriff, state, dispatch, api, level = 1 }) => {
    const { id } = begriff.identifier
    const collapsed = state.collapsed.has(id)
    const checked = state.auswahl.some((item) => item.id === id)
    return begriff.unterBegriffe.length === 0 ? (
      <BegriffItem
        begriff={begriff}
        indent={level}
        checked={checked}
        onChange={dispatch}
        icon={<BaumAuswahlBlattBox />}
      />
    ) : (
      <>
        <BegriffItem
          begriff={begriff}
          indent={level}
          checked={checked}
          onChange={dispatch}
          icon={
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
          }
        />
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {begriff.unterBegriffe.map((id) => {
              const begriff = api.begriff({ id })
              return begriff ? (
                <BaumAuswahlItem
                  key={id}
                  begriff={begriff}
                  state={state}
                  dispatch={dispatch}
                  api={api}
                  level={level + 1}
                />
              ) : (
                <ListItem key={id}>
                  <ListItemText>Unbekannter Begriff {id}</ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }
)
