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

import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

import { HSP_ERFASSUNGS_EDITOR_ID } from '../editor/HSPEditor'

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
