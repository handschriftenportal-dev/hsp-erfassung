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

import { ListItemText, MenuItem, MenuList } from '@mui/material'
import { FC } from 'react'

import { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'

interface Props {
  state: ImportiereNormdatumDialogState
  setSelected: (index: number) => void
}

export const ImportiereNormdatumDialogItemsList: FC<Props> = ({
  state,
  setSelected,
}) => {
  return (
    <MenuList sx={{ margin: 0, padding: 0 }}>
      {state.items.map((value, index) => (
        <MenuItem
          key={`${index}-${value.gndIdentifier}`}
          onClick={() => setSelected(index)}
          selected={state.selected === index}
          style={{ overflow: 'hidden' }}
        >
          <ListItemText
            primary={value.preferredName}
            secondary={value.subtitle}
          />
        </MenuItem>
      ))}
    </MenuList>
  )
}
