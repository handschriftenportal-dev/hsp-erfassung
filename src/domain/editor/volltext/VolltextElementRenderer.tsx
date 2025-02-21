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

import { FC, JSX } from 'react'
import { RenderElementProps } from 'slate-react'

import {
  VolltextElement,
  VolltextElementTyp,
} from '../../../infrastructure/slate/volltext/VolltextElement'
import { Block } from './elemente/Block'
import { Box } from './elemente/Box'
import { Formatierung } from './elemente/Formatierung'
import { Referenz } from './elemente/Referenz'

const map: Record<VolltextElementTyp, FC<any>> = {
  box: Box,
  block: Block,
  referenz: Referenz,
  formatierung: Formatierung,
}

export const renderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps): JSX.Element => {
  const typ = VolltextElement.typ(element)
  if (typ === undefined) {
    throw new Error('Unerwartetes Element für Volltext', { cause: element })
  }
  const Komponente = map[typ]
  return (
    <Komponente element={element as VolltextElement} attributes={attributes}>
      {children}
    </Komponente>
  )
}
