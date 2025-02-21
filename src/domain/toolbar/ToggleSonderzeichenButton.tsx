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

import { Segment } from '@mui/icons-material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSidebarComponentType,
  updateSidebarComponentType,
} from '../erfassung/ErfassungsState'
import { SidebarComponentType } from '../sidebar/SidebarComponentType'
import { SonderzeichenIcon } from './icons/SonderzeichenIcon'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

interface Props {}

const States = {
  sonderzeichen: {
    titleKey: 'toolbar.show_structural_view',
    Icon: Segment,
    onClickValue: SidebarComponentType.struktur,
  },
  struktur: {
    titleKey: 'toolbar.show_special_character',
    Icon: SonderzeichenIcon,
    onClickValue: SidebarComponentType.sonderzeichen,
  },
}

export const ToggleSonderzeichenButton: FC<Props> = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const state = States[useSelector(selectSidebarComponentType)]
  const { Icon } = state

  return (
    <HSPToolbarButton
      title={t(state.titleKey)}
      onClick={() => dispatch(updateSidebarComponentType(state.onClickValue))}
    >
      <Icon />
    </HSPToolbarButton>
  )
})
