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

export const UnfoldLessIcon: FC<Props> = ({ style }) => (
  <SvgIcon viewBox="0 0 24 24" style={style}>
    <path d="M7.41 18.59L8.83 20L12 16.83L15.17 20L16.58 18.59L12 14L7.41 18.59ZM16.59 5.41L15.17 4L12 7.17L8.83 4L7.41 5.41L12 10L16.59 5.41Z" />
  </SvgIcon>
)

export const UnfoldLessBlack24dp = memo(() => (
  <UnfoldLessIcon style={{ color: 'white' }} />
))
