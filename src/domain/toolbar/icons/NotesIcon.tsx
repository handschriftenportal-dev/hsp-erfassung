import { SvgIcon } from '@mui/material'
import { memo } from 'react'

export const NotesIcon = memo(() => {
  return (
    <SvgIcon fill={'white'}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />
    </SvgIcon>
  )
})
