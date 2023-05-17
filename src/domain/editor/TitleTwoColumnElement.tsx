/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Grid } from '@material-ui/core'
import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'
import React from 'react'
import { Node } from 'slate'

/**
 * Author: Christoph Marten on 06.01.2022 at 08:36
 */

interface TitleTwoColumnElementProps {
  element: Node
  title: string
  showDelete: boolean
  margin: boolean
  bold?:boolean
}

export const TitleTwoColumnElement = React.memo(({ element, title, showDelete, margin, bold }: TitleTwoColumnElementProps) => {

  const fontWeight = (bold) ? 'bold' : 'normal'

  return <Grid container contentEditable={false}>
    <Grid style={{
      display: 'table',
      marginBottom: margin ? '24px' : '0px',
    }} item xs={10}><span style={{ display: 'table-cell', verticalAlign: 'middle', fontWeight: fontWeight }}>{title}</span>
    </Grid>
    {showDelete
      ? <>
            <DeleteSlateNodeButton node={element}/>
        </>
      : <></>
    }
  </Grid>
})
