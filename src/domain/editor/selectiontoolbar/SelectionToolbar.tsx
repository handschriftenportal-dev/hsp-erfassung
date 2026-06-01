import type { PopperProps } from '@mui/material'
import { Popper } from '@mui/material'
import type { FC } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import type { Editor } from 'slate'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'

import { HSPHoveringToolbar } from './HSPHoveringToolbar'
import { SelectionToolbarActions } from './SelectionToolbarActions'

interface Props {
  editor: Editor
}

export const SelectionToolbar: FC<Props> = ({ editor }) => {
  const { hideModal } = useGlobalModalContext()
  const previousAnchorElPosition = useRef<DOMRect | undefined>(undefined)
  const anchorEl = useMemo<PopperProps['anchorEl']>(() => {
    const selection = window.getSelection()
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      hideModal()
      return
    }
    const getBoundingClientRect = () => {
      if (selection.rangeCount === 0 && previousAnchorElPosition.current) {
        hideModal()
        return previousAnchorElPosition.current
      }
      return selection.getRangeAt(0).getBoundingClientRect()
    }
    return { getBoundingClientRect }
  }, [hideModal])

  useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'object') {
        previousAnchorElPosition.current = anchorEl.getBoundingClientRect()
      } else {
        previousAnchorElPosition.current = anchorEl().getBoundingClientRect()
      }
    }
  }, [anchorEl])

  return (
    <Popper open placement="top" anchorEl={anchorEl}>
      <HSPHoveringToolbar>
        <SelectionToolbarActions editor={editor} />
      </HSPHoveringToolbar>
    </Popper>
  )
}
