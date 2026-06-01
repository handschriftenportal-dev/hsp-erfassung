import { SvgIcon } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

interface Props {
  style?: CSSProperties
}

export const UnfoldLessIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="0 0 24 24" style={style}>
    <path d="M7.41 18.59L8.83 20L12 16.83L15.17 20L16.58 18.59L12 14L7.41 18.59ZM16.59 5.41L15.17 4L12 7.17L8.83 4L7.41 5.41L12 10L16.59 5.41Z" />
  </SvgIcon>
)

export const UnfoldLessBlack24dp = memo(() => (
  <UnfoldLessIcon style={{ color: 'white' }} />
))
