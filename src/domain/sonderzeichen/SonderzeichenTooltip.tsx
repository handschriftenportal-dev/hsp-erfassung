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

import { Tooltip, Typography } from '@mui/material'
import { FC, memo, ReactElement } from 'react'

import { SonderzeichenAPI } from './SonderzeichenAPI'

interface Props {
  sonderzeichen: string
  children: ReactElement<any, any>
  // We can't use react's PropsWithChildren here since
  // mui/Tooltip does not handle undefined children
}

interface TitleProps {
  sonderzeichen: string
}

const TooltipTitle: FC<TitleProps> = memo(({ sonderzeichen }) => {
  return SonderzeichenAPI.isKnown(sonderzeichen) ? (
    <>
      <Typography variant="subtitle1">{sonderzeichen}</Typography>
      <Typography variant="caption" gutterBottom>
        {SonderzeichenAPI.getSonderzeichen(sonderzeichen).description}
      </Typography>
    </>
  ) : (
    <Typography variant="subtitle1">{sonderzeichen}</Typography>
  )
})

export const SonderzeichenTooltip: FC<Props> = memo(
  function SonderzeichenTooltip({ children, sonderzeichen }) {
    return (
      <Tooltip
        title={<TooltipTitle sonderzeichen={sonderzeichen} />}
        placement="right-start"
      >
        {children}
      </Tooltip>
    )
  }
)
