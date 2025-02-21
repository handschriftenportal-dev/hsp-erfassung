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

export const ValidateIcon: FC<Props> = ({ style }) => (
  <SvgIcon style={style}>
    <path d="M14 10H3V12H14V10Z" />
    <path d="M14 6H3V8H14V6Z" />
    <path d="M10 14H3V16H10V14Z" />
    <path d="M20.59 11.9302L16.34 16.1702L14.22 14.0502L12.81 15.4602L16.34 19.0002L22 13.3402L20.59 11.9302Z" />
  </SvgIcon>
)

export const ValidateWhiteIcon = memo(() => (
  <ValidateIcon style={{ color: 'white' }} />
))
