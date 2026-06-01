import { SvgIcon } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

interface Props {
  style?: CSSProperties
}

export const UnfoldMoreIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="0 0 24 24" style={style}>
    <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41 7.59L8.83 9L12 5.83ZM12 18.17L8.83 15L7.42 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
  </SvgIcon>
)

export const UnfoldMoreBlack24dp = memo(() => (
  <UnfoldMoreIcon style={{ color: 'white' }} />
))
