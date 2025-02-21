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

import { Grid, Link } from '@mui/material'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { colors } from '../../../../theme'
import {
  selectConfiguration,
  selectReadOnly,
} from '../../../erfassung/ErfassungsState'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'

interface Props {
  props: RenderElementProps
  title: string
  link: string
}

export const IdnoSimpleWithLink: FC<Props> = memo(({ props, title, link }) => {
  const readOnly = useSelector(selectReadOnly)
  const { standalone } = useSelector(selectConfiguration)
  const { element } = props
  const text = extractFirstText(element)
  const hspId = standalone ? (
    text
  ) : (
    <Link
      style={{ color: colors.special.linkBlue }}
      href={link}
      target={'blank'}
      underline="hover"
    >
      {text}
    </Link>
  )

  return (
    <Grid container>
      {readOnly || standalone ? (
        <NoneEditableTwoColumnElementJSX label={title}>
          {hspId}
        </NoneEditableTwoColumnElementJSX>
      ) : (
        <Grid className={'small-bottom-gab'} container>
          <Grid item xs={3} style={{ display: 'table' }}>
            <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
              {title}:
            </span>
          </Grid>
          <Grid item xs={8}>
            <Link
              style={{
                color: colors.special.linkBlue,
                display: 'flex',
                width: 'inherit',
                padding: '27px 12px 10px',
                backgroundColor: 'rgba(79, 77, 75, 0.04)',
              }}
              href={link}
              target={'blank'}
              underline="hover"
            >
              {text}
            </Link>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
})
