import { SvgIcon } from '@mui/material'
import { memo } from 'react'

export const RemoveBlackIcon = memo(() => {
  return (
    <SvgIcon className={'svg-expand-icon'} viewBox="0 0 17 17" fill={'white'}>
      <path
        d="M3.54169 7.79166V9.20832H13.4584V7.79166H3.54169Z"
        fill="black"
      />
      <path
        d="M0 0V-1H-1V0H0ZM17 0H18V-1H17V0ZM17 17V18H18V17H17ZM0 17H-1V18H0V17ZM0 1H17V-1H0V1ZM16 0V17H18V0H16ZM17 16H0V18H17V16ZM1 17V0H-1V17H1Z"
        fill="#DEDAD5"
      />
    </SvgIcon>
  )
})
