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
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Dispatch, FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ThemenbereicheAPI,
  Thesaurus,
} from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from '../ThemenbereichDialogState'
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
                dispatch({ type: 'toggleCollapseIdentifier', payload: id })
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
