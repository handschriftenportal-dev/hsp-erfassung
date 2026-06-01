import { Segment } from '@mui/icons-material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSidebarComponentType,
  updateSidebarComponentType,
} from 'src/domain/erfassung/ErfassungsState'
import { SidebarComponentType } from 'src/domain/sidebar/SidebarComponentType'

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
