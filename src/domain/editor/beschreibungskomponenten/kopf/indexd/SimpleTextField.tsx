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

import { TextField } from '@mui/material'
import { FC, memo } from 'react'
import { Element as ScrollAnchor } from 'react-scroll'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import {
  createInsertTextChangeEventHandler,
  extractFirstText,
} from '../../../../../infrastructure/slate/SlateBoundary'

interface Props {
  termElement: Element
  label: string
}

export const SimpleTextField: FC<Props> = memo(({ termElement, label }) => {
  const editor = useSlateStatic()
  const { error, id } = termElement as any
  const getTextContent = extractFirstText(termElement)

  return (
    <ScrollAnchor name={id}>
      <TextField
        fullWidth
        label={label}
        onChange={createInsertTextChangeEventHandler(editor, termElement)}
        defaultValue={getTextContent}
        size="small"
        variant="filled"
        helperText={error && 'Error'}
        error={!!error}
        slotProps={{
          input: { className: 'text-field-input-style' },

          inputLabel: {
            className: 'label-styles-text-field-input-label',
          },
        }}
      />
    </ScrollAnchor>
  )
})
