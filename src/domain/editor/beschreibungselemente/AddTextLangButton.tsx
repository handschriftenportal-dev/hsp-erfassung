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

import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { FC, memo, MouseEvent, useCallback } from 'react'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import {
  findPath,
  insertTextLangNode,
} from '../../../infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
  text: string
}

export const AddTextLangButton: FC<Props> = memo(({ element, text }) => {
  const editor = useSlateStatic()

  const insertTextLangElement = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      const path = findPath(editor, element)
      if (path) {
        path.push(0)
        insertTextLangNode(path, editor)
      }
    },
    [editor, element]
  )

  return (
    <Button
      startIcon={<Add />}
      onClick={insertTextLangElement}
      className={'black-add-button-style'}
      variant="text"
    >
      {text}
    </Button>
  )
})
