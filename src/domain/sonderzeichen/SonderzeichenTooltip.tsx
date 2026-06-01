import { Tooltip, Typography } from '@mui/material'
import type { FC, ReactElement } from 'react'
import { memo } from 'react'

import { SonderzeichenAPI } from './SonderzeichenAPI'

interface Props {
  sonderzeichen: string
  children: ReactElement
  // We can't use react's PropsWithChildren here since
  // mui/Tooltip does not handle undefined children
}

interface TitleProps {
  sonderzeichen: string
}

const TooltipTitle: FC<TitleProps> = memo(({ sonderzeichen }) => {
  return SonderzeichenAPI.isKnown(sonderzeichen) ? (
    <>
      <Typography variant="subtitle1">{sonderzeichen}</Typography>
      <Typography variant="caption" gutterBottom>
        {SonderzeichenAPI.getSonderzeichen(sonderzeichen).description}
      </Typography>
    </>
  ) : (
    <Typography variant="subtitle1">{sonderzeichen}</Typography>
  )
})

export const SonderzeichenTooltip: FC<Props> = memo(
  function SonderzeichenTooltip({ children, sonderzeichen }) {
    return (
      <Tooltip
        title={<TooltipTitle sonderzeichen={sonderzeichen} />}
        placement="right-start"
      >
        {children}
      </Tooltip>
    )
  }
)
