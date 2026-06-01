import { SvgIcon } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

interface Props {
  style?: CSSProperties
}
export const FullscreenExitIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="-2 -2 24 24" style={style}>
    <path d="M20 1.41L14.71 6.7L18 10H10V2L13.29 5.29L18.59 0L20 1.41ZM1.41 20L6.7 14.71L10 18V10H2L5.29 13.29L0 18.59L1.41 20Z" />
  </SvgIcon>
)

export const ExitFullscreenIcon = memo(() => (
  <FullscreenExitIcon style={{ color: 'white' }} />
))
