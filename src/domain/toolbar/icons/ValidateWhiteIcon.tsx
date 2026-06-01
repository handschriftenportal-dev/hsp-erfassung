import { SvgIcon } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

interface Props {
  style?: CSSProperties
}

export const ValidateIcon: FC<Props> = ({ style }) => (
  <SvgIcon style={style}>
    <path d="M14 10H3V12H14V10Z" />
    <path d="M14 6H3V8H14V6Z" />
    <path d="M10 14H3V16H10V14Z" />
    <path d="M20.59 11.9302L16.34 16.1702L14.22 14.0502L12.81 15.4602L16.34 19.0002L22 13.3402L20.59 11.9302Z" />
  </SvgIcon>
)

export const ValidateWhiteIcon = memo(() => (
  <ValidateIcon style={{ color: 'white' }} />
))
