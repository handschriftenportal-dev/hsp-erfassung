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

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Dispatch, FC, memo } from 'react'

import {
  Begriff,
  ThemenbereicheAPI,
} from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../ThemenbereichDialogState'
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
    const checked = state.auswahl.includes(id)
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
                dispatch({ type: 'toggleCollapseIdentifier', payload: id })
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
