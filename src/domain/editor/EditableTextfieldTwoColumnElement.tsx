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
import { FC, memo, useEffect, useId, useRef, useState } from 'react'
import { useSlateStatic } from 'slate-react'

import { useGlobalerEinfuegeContext } from '../../infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import {
  createInsertTextChangeEventHandler,
  extractFirstText,
} from '../../infrastructure/slate/SlateBoundary'
import { DeleteSlateNodeButton } from './DeleteSlateNodeButton'

interface Props {
  element: any
  label: string
  marginBottom?: string
  marginTop?: string
  paddingLeft?: string
  helpertext?: string
  error?: boolean
  deletable?: boolean
}

export const EditableTextfieldTwoColumnElement: FC<Props> = memo(
  ({
    element,
    label,
    marginBottom,
    marginTop,
    helpertext,
    error,
    deletable,
    paddingLeft,
  }) => {
    const id = useId()
    const ref = useRef<any>()
    const [cursor, setCursor] = useState<number | null>(null)
    const editor = useSlateStatic()
    const textContent = extractFirstText(element)
    const { setTargetToElement } = useGlobalerEinfuegeContext()

    useEffect(() => {
      if (ref.current) {
        ref.current.setSelectionRange(cursor, cursor)
      }
    }, [ref, cursor, textContent])

    return (
      <Grid
        style={{
          marginBottom: marginBottom ?? 0,
          marginTop: marginTop ?? 0,
        }}
        container
      >
        <Grid
          item
          xs={3}
          style={{
            display: 'table',
            paddingLeft: paddingLeft ?? 0,
          }}
        >
          <span className={'align-display-table-cell-vertical-align'}>
            <label id={id}>{label}</label>:
          </span>
        </Grid>
        <Grid item xs={8}>
          <TextField
            size={'small'}
            aria-labelledby={id}
            multiline={true}
            maxRows="4"
            helperText={error ? helpertext : ''}
            error={error}
            role={'input'}
            onChange={(e) => {
              setCursor(e.target.selectionStart)
              createInsertTextChangeEventHandler(editor, element)(e)
            }}
            inputRef={ref}
            value={textContent}
            fullWidth={true}
            variant="filled"
            slotProps={{
              input: {
                className: `text-field-input-style`,
                onBlur: (event) =>
                  setTargetToElement(
                    editor,
                    element,
                    event.target as HTMLInputElement
                  ),
              },

              inputLabel: {
                className: 'label-styles-text-field-input-label',
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          {deletable && <DeleteSlateNodeButton element={element} />}
        </Grid>
      </Grid>
    )
  }
)
