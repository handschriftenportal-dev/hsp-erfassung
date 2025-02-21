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

import { Link, Subscript, Superscript } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor } from 'slate'

import { useDialog } from '../normdaten/useDialog'

interface Props {
  editor: Editor
}

type AndereAuszeichnungen = 'externerLink' | 'superskript' | 'subskript'

type MenuEntry = {
  disabled: boolean
  type: AndereAuszeichnungen
  Icon: FC
}

const menuEntries: readonly MenuEntry[] = [
  {
    disabled: false,
    type: 'externerLink',
    Icon: Link,
  },
  {
    disabled: true,
    type: 'superskript',
    Icon: Superscript,
  },
  {
    disabled: true,
    type: 'subskript',
    Icon: Subscript,
  },
]

export const AndereAuszeichnungActions: FC<Props> = ({ editor }) => {
  const { t } = useTranslation()
  const { openCreateDialogHandler } = useDialog(editor)

  return (
    <List>
      {menuEntries.map(({ disabled, type, Icon }) => {
        return (
          <ListItemButton
            key={type}
            dense
            disabled={disabled}
            onClick={openCreateDialogHandler(type)}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={t(`text_tagging.andere.type.${type}`)} />
          </ListItemButton>
        )
      })}
    </List>
  )
}
