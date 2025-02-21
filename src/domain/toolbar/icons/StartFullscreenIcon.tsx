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

export const EnterFullscreenIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="-3 -3 24 24" style={style}>
    <path d="M12 0L14.3 2.3L11.41 5.17L12.83 6.59L15.7 3.7L18 6V0H12ZM0 6L2.3 3.7L5.17 6.59L6.59 5.17L3.7 2.3L6 0H0V6ZM6 18L3.7 15.7L6.59 12.83L5.17 11.41L2.3 14.3L0 12V18H6ZM18 12L15.7 14.3L12.83 11.41L11.41 12.83L14.3 15.7L12 18H18V12Z" />
  </SvgIcon>
)

export const StartFullscreenIcon: FC = memo(() => (
  <EnterFullscreenIcon style={{ color: 'white' }} />
))
