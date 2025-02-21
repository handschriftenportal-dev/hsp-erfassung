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

import { Grid, TextField } from '@mui/material'
import { FC, memo, PropsWithChildren, useId } from 'react'
import { useSelector } from 'react-redux'

import { selectReadOnly } from '../erfassung/ErfassungsState'

interface Props {
  label: string
}

export const NoneEditableTwoColumnElementJSX: FC<PropsWithChildren<Props>> =
  memo(({ label, children }) => {
    const id = useId()
    const readOnly = useSelector(selectReadOnly)

    return (
      <Grid container className="small-bottom-gab">
        {!readOnly ? (
          <>
            <Grid item xs={3} style={{ display: 'table' }}>
              <span
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                }}
              >
                <label id={id}>{label}</label>:
              </span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                aria-labelledby={id}
                defaultValue={children}
                fullWidth={true}
                size="small"
                variant="filled"
                slotProps={{
                  input: {
                    className: 'text-field-input-style',
                    readOnly: true,
                  },
                  inputLabel: {
                    className: 'label-styles-text-field-input-label',
                  },
                }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              xs={4}
              style={{ display: 'table' }}
              className={'label-styles-preview-mode'}
            >
              <span
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                }}
              >
                <label id={id}>{label}</label>:
              </span>
            </Grid>
            <Grid item xs={6} aria-labelledby={id}>
              {children}
            </Grid>
          </>
        )}
      </Grid>
    )
  })
