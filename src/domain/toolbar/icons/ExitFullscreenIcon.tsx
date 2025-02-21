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

import { SvgIcon } from '@mui/material'
import { CSSProperties, FC, memo } from 'react'

interface Props {
  style?: CSSProperties
}
export const FullscreenExitIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="-2 -2 24 24" style={style}>
    <path d="M20 1.41L14.71 6.7L18 10H10V2L13.29 5.29L18.59 0L20 1.41ZM1.41 20L6.7 14.71L10 18V10H2L5.29 13.29L0 18.59L1.41 20Z" />
  </SvgIcon>
)

export const ExitFullscreenIcon = memo(() => (
  <FullscreenExitIcon style={{ color: 'white' }} />
))
