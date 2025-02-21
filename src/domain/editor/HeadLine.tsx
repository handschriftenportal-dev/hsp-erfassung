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

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import { FC, memo, MouseEvent, ReactNode, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectReadOnly } from '../erfassung/ErfassungsState'
import { HilfeButton, HilfeText } from './beschreibungskomponenten/hilfetexte'

interface Props {
  children?: ReactNode
  label: string
  labelSize: 'h3' | 'h4'
  helpText?: string
}

export const HeadLine: FC<Props> = memo(
  ({ children, label, labelSize, helpText }) => {
    const readOnly = useSelector(selectReadOnly)
    const [showHelpText, setShowHelpText] = useState(false)

    const handleClickCallback = useCallback(
      (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setShowHelpText(!showHelpText)
      },
      [showHelpText]
    )

    const ReadOnlyStyle = styled(labelSize)({
      fontSize: labelSize === 'h3' ? '20px' : '16px',
      marginBlockEnd: '16px',
      margin: '0px',
      lineHeight: '24px',
    })

    const EditModeStyle = styled(labelSize)({
      fontSize: labelSize === 'h3' ? '20px' : '16px',
    })

    return readOnly ? (
      <Grid container>
        <Grid item xs={11}>
          <ReadOnlyStyle>{label}</ReadOnlyStyle>
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item xs={11}>
          <EditModeStyle>
            {label}
            {helpText && (
              <HilfeButton
                onClick={handleClickCallback}
                activated={showHelpText}
              />
            )}
          </EditModeStyle>
        </Grid>
        <Grid item xs={1} css={css({ paddingLeft: 0 })}>
          {children}
        </Grid>

        <Grid item xs={3} />
        <Grid item xs={8} className={'small-bottom-gab'}>
          {showHelpText && <HilfeText helpText={helpText} />}
        </Grid>
      </Grid>
    )
  }
)
