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

import { IconButton, styled } from '@mui/material'
import { memo } from 'react'

import { colors } from '../../../theme'

const commonStyle = {
  width: '40px',
  height: '40px',
  boxShadow: '0 1px 2.5px 0 rgb(0 0 0 / 26%), 0 1px 5px 0 rgb(0 0 0 / 16%)',
}

const defaultStyle = {
  ...commonStyle,
  color: colors.greyscale.white,
  backgroundColor: colors.greyscale.liver,
  '&:hover': { backgroundColor: colors.greyscale.black },
  '&.Mui-disabled': { backgroundColor: colors.greyscale.neutral },
  '&:active': { backgroundColor: colors.greyscale.stone },
  '&.Mui-focusVisible': { backgroundColor: colors.greyscale.black },
}

const secondaryStyle = {
  ...commonStyle,
  color: colors.greyscale.black,
  backgroundColor: colors.greyscale.white,
  '&:hover': { backgroundColor: colors.greyscale.lightGrey },
  '&.Mui-disabled': { backgroundColor: colors.greyscale.platinum },
  '&:active': { backgroundColor: colors.greyscale.platinum },
  '&.Mui-focusVisible': { backgroundColor: colors.greyscale.black },
}

export const HSPToolbarButton = memo(
  styled(IconButton)(({ color }) =>
    color === 'secondary' ? secondaryStyle : defaultStyle
  )
)
