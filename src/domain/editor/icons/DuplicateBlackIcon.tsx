import { SvgIcon } from '@mui/material'
import { memo } from 'react'

export const DuplicateBlackIcon = memo(() => {
  return (
    <SvgIcon fill="white">
      <path
        d="M8.5 6.75H18.5V5.25H8.5V6.75ZM18.75 7V15H20.25V7H18.75ZM18.5 6.75C18.6381 6.75 18.75 6.86193 18.75 7H20.25C20.25 6.0335 19.4665 5.25 18.5 5.25V6.75Z"
        fill="black"
      />
      <rect x="5" y="10" width="11" height="8" stroke="black" strokeWidth="2" />
    </SvgIcon>
  )
})
