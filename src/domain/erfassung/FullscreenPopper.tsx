import type { PopperProps } from '@mui/material'
import { Popper } from '@mui/material'
import type { JSXElementConstructor } from 'react'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'

export const FullscreenPopper: JSXElementConstructor<PopperProps> = (props) => {
  return (
    <Popper
      {...props}
      container={() => document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}
    />
  )
}
