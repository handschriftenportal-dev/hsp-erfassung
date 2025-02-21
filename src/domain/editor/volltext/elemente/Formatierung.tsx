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

import { Tooltip } from '@mui/material'
import { CSSProperties, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { RenderElementProps } from 'slate-react'

import { VolltextFormatierung } from '../../../../infrastructure/slate/volltext/VolltextElement'

interface Props extends RenderElementProps {
  element: VolltextFormatierung
}

const styles: Partial<
  Record<VolltextFormatierung['data_origin'], CSSProperties>
> = {
  incipit: {
    fontStyle: 'italic',
  },
  explicit: {
    fontStyle: 'italic',
  },
  zitat: {
    fontStyle: 'italic',
  },
  autor: {
    fontVariant: 'small-caps',
  },
  werktitel: {
    fontVariant: 'small-caps',
  },
}

export const Formatierung: FC<Props> = ({ attributes, children, element }) => {
  const { data_origin: type } = element
  const { t } = useTranslation()
  const style = styles[type] ?? {}
  return (
    <Tooltip title={t(`text_tagging.formatierung.type.${type}`)}>
      <span {...attributes} style={style}>
        {children}
      </span>
    </Tooltip>
  )
}
