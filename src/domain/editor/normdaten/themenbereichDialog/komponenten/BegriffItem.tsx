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

import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dispatch, FC, memo, ReactNode } from 'react'

import { Begriff } from '../../../../erfassung/ThemenbereicheAPI'
import { ThemenbereichDialogAction } from '../ThemenbereichDialogReducer'
import { NotationChip } from './NotationChip'

interface Props {
  begriff: Begriff
  indent?: number
  checked?: boolean
  onChange?: Dispatch<ThemenbereichDialogAction>
  icon?: ReactNode
}

export const BegriffItem: FC<Props> = memo(
  ({ begriff, checked, indent = 0, onChange = undefined, icon }) => {
    const { notation, uri, id } = begriff.identifier
    const pl = indent * 5

    return (
      <ListItem>
        {icon && <ListItemIcon sx={{ pl }}>{icon}</ListItemIcon>}
        <ListItemIcon>
          {(checked !== undefined || onChange !== undefined) && (
            <Checkbox
              edge="end"
              disabled={onChange === undefined}
              checked={checked}
              onChange={() => {
                if (onChange) {
                  onChange({
                    type: checked ? 'removeBegriff' : 'addBegriffe',
                    payload: id,
                  })
                }
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <NotationChip notation={notation} uri={uri} />
              {begriff.label}
            </>
          }
        />
      </ListItem>
    )
  }
)
