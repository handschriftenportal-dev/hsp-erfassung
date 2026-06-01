import { SvgIcon } from '@mui/material'
import { memo } from 'react'

export const NormalansichtIcon = memo(() => {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="8" y="6" width="1" height="2" fill="black" />
      <rect x="8" y="10" width="1" height="2" fill="black" />
      <rect x="11" y="6" width="5" height="2" fill="black" />
      <rect x="11" y="10" width="5" height="2" fill="black" />
      <rect x="8" y="14" width="8" height="4" fill="black" />
    </SvgIcon>
  )
})
