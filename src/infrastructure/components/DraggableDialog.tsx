import type { DialogProps, PaperProps } from '@mui/material'
import { Dialog, Paper } from '@mui/material'
import type {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from 'react'
import { memo, useRef } from 'react'
import Draggable from 'react-draggable'
import { ClosableDialogTitle } from 'src/infrastructure/components/ClosableDialogTitle'

interface Props {
  maxWidth?: DialogProps['maxWidth']
  title: ReactNode
  onClose?: MouseEventHandler<HTMLButtonElement>
  fullWidth?: boolean
}

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  return (
    <Draggable
      nodeRef={nodeRef as RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="muiDialogContent-root]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  )
}

export const DraggableDialog: FC<PropsWithChildren<Props>> = memo(
  function DraggableDialog({
    children,
    maxWidth = 'lg',
    title,
    onClose,
    fullWidth = true,
  }) {
    return (
      <Dialog
        open
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <ClosableDialogTitle id="draggable-dialog-title" onClose={onClose}>
          {title}
        </ClosableDialogTitle>
        {children}
      </Dialog>
    )
  }
)
