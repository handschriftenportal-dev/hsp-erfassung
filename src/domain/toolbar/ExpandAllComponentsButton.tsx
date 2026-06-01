import type { MouseEvent } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectExpandAllComponents,
  updateExpandAllComponents,
} from 'src/domain/erfassung/ErfassungsState'

import { UnfoldLessBlack24dp } from './icons/UnfoldLessBlack24dp'
import { UnfoldMoreBlack24dp } from './icons/UnfoldMoreBlack24dp'
import { HSPToolbarButton } from './styles/HSPToolbarButton'

export const ExpandAllComponentsButton = memo(() => {
  const dispatch = useDispatch()
  const isExpanded = useSelector(selectExpandAllComponents)
  const { t } = useTranslation()

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    dispatch(updateExpandAllComponents(!isExpanded))
  }
  return (
    <HSPToolbarButton
      title={
        isExpanded
          ? t('toolbar.close_all_components')
          : t('toolbar.collapse_all_components')
      }
      onMouseDown={handleMouseDown}
    >
      {isExpanded ? <UnfoldLessBlack24dp /> : <UnfoldMoreBlack24dp />}
    </HSPToolbarButton>
  )
})
