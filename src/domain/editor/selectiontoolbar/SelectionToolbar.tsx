/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Popper, PopperProps } from '@mui/material'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Editor } from 'slate'

import { useGlobalModalContext } from '../../../infrastructure/modal/GlobalModal'
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
  }, [])

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
    <Popper open={true} placement="top" anchorEl={anchorEl}>
      <HSPHoveringToolbar>
        <SelectionToolbarActions editor={editor} />
      </HSPHoveringToolbar>
    </Popper>
  )
}
