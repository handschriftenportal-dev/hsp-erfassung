import { SvgIcon } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

interface Props {
  style?: CSSProperties
}

export const EnterFullscreenIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="-3 -3 24 24" style={style}>
    <path d="M12 0L14.3 2.3L11.41 5.17L12.83 6.59L15.7 3.7L18 6V0H12ZM0 6L2.3 3.7L5.17 6.59L6.59 5.17L3.7 2.3L6 0H0V6ZM6 18L3.7 15.7L6.59 12.83L5.17 11.41L2.3 14.3L0 12V18H6ZM18 12L15.7 14.3L12.83 11.41L11.41 12.83L14.3 15.7L12 18H18V12Z" />
  </SvgIcon>
)

export const StartFullscreenIcon: FC = memo(() => (
  <EnterFullscreenIcon style={{ color: 'white' }} />
))
