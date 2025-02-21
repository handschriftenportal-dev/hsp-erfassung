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

import { List } from '@mui/material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Editor } from 'slate'

import { selectSidebarState } from '../erfassung/ErfassungsState'
import { SidebarEintrag } from './SidebarEintrag'
import { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  editor: Editor
}

export const StrukturAnsicht: FC<Props> = memo(({ editor }) => {
  const sidebarValue = useSelector(selectSidebarState)
  const { t } = useTranslation()

  return (
    <List
      sx={{
        backgroundColor: 'white',
      }}
    >
      {sidebarValue.length > 0
        ? sidebarValue.map(
            (beschreibung: SidebarEintragModel, index: number) => (
              <SidebarEintrag
                key={beschreibung.id}
                index={index}
                beschreibung={beschreibung}
                editor={editor}
              />
            )
          )
        : t('sidebar.components_not_found')}
    </List>
  )
})
