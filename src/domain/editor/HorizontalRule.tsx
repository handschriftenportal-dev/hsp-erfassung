import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'

interface Props {
  style?: CSSProperties
}

export const HorizontalRule: FC<Props> = memo(({ style }) => {
  const readOnly = useSelector(selectReadOnly)
  return (
    <hr
      className={
        readOnly ? 'horizontal-rule-read-mode' : 'horizontal-rule-edit-mode'
      }
      style={style}
    />
  )
})

export const HorizontalRuleLight: FC<Props> = memo(({ style }) => {
  const readOnly = useSelector(selectReadOnly)
  return (
    <hr
      className={
        readOnly
          ? 'horizontal-rule-read-mode-light'
          : 'horizontal-rule-edit-mode-light'
      }
      style={style}
    />
  )
})
