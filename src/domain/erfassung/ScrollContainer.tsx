import { Box } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { HSP_ERFASSUNGS_EDITOR_ID } from 'src/domain/editor/HSPEditor'

const TopbarSize = 64
const editorOffset =
  TopbarSize +
  (document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)?.getBoundingClientRect()
    ?.top || 0)

interface Props {
  children: ReactNode
  containerId?: string
}

export const ScrollContainer: FC<Props> = ({ children, containerId }) => {
  return (
    <Box
      id={containerId}
      data-testid="scroll-container"
      className="scrollbar"
      sx={{
        maxHeight: `calc(100vh - ${editorOffset}px)`,
        '@media all and (display-mode: fullscreen)': {
          maxHeight: '95vh',
        },
      }}
    >
      {children}
    </Box>
  )
}
