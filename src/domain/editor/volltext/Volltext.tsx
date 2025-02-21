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

import { FC, useCallback } from 'react'
import { Transforms } from 'slate'
import { RenderElementProps, useSlateStatic } from 'slate-react'

import { findPath } from '../../../infrastructure/slate/SlateBoundary'
import { VolltextEditor } from './VolltextEditor'

interface Props extends RenderElementProps {}

export const Volltext: FC<Props> = ({ element, children, attributes }) => {
  const { content } = element as any
  const editor = useSlateStatic()

  const handleChange = useCallback(
    (content: any) => {
      const at = findPath(editor, element)
      if (at) {
        Transforms.setNodes(editor, { content } as any, { at })
      }
    },
    [editor, element]
  )

  return (
    <>
      <span {...attributes}>{children}</span>
      <VolltextEditor onChange={handleChange} initialValue={content} />
    </>
  )
}
