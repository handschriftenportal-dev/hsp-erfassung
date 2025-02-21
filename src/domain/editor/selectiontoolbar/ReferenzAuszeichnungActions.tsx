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

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Editor } from 'slate'

import { selectTaggableNormdaten } from '../../erfassung/ErfassungsState'
import { Normdatum } from '../../erfassung/Normdatum'
import { NormdatenIconFactory } from '../icons/NormdatenIcons'
import { useDialog } from '../normdaten/useDialog'

interface Props {
  editor: Editor
}

const reihenfolge: Normdatum[] = [
  'person',
  'koerperschaft',
  'ort',
  'initium',
  'buchkunde',
  'buchschmuck',
  'schriftart',
  'musiknotation',
  'einband',
  'sprache',
  'textgattung',
]

export const ReferenzAuszeichnungActions: FC<Props> = ({ editor }) => {
  const taggableNormdaten = useSelector(selectTaggableNormdaten)
  const { t } = useTranslation()
  const { openCreateDialogHandler } = useDialog(editor)

  return (
    <List>
      {reihenfolge.map((normdatum) => {
        return (
          <ListItemButton
            key={normdatum}
            dense
            onClick={openCreateDialogHandler(normdatum)}
            disabled={!taggableNormdaten[normdatum]}
          >
            <ListItemIcon>
              <NormdatenIconFactory type={normdatum} />
            </ListItemIcon>
            <ListItemText
              primary={t(`text_tagging.referenz.type.${normdatum}`)}
            />
          </ListItemButton>
        )
      })}
    </List>
  )
}
