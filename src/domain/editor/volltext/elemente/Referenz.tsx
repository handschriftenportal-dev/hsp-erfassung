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

import { FC, memo } from 'react'
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react'

import { VolltextReferenz } from '../../../../infrastructure/slate/volltext/VolltextElement'
import { colors } from '../../../../theme'
import { useDialog } from '../../normdaten/useDialog'

interface Props extends RenderElementProps {
  element: VolltextReferenz
}

const colorLookup: Partial<Record<VolltextReferenz['data_origin'], string>> = {
  person: colors.special.sunnyYellow,
  ort: colors.special.sunnyYellow,
  koerperschaft: colors.special.sunnyYellow,
  externerLink: colors.secondary.turquoise,
  einband: colors.special.earth,
}

export const Referenz: FC<Props> = memo(({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const { content } = element
  const editor = useSlateStatic()
  const { openEditDialogHandler } = useDialog(editor)
  const style = {
    padding: '1px 4px',
    borderRadius: 1,
    outline: selected && focused ? '1px solid black' : 'none',
    backgroundColor: colorLookup[element.data_origin] ?? 'inherit',
  }

  return (
    <span
      {...attributes}
      style={style}
      contentEditable={false}
      onClick={openEditDialogHandler(element)}
    >
      {children}
      {content}
    </span>
  )
})
