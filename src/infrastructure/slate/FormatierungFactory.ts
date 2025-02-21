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

import { cloneDeep } from 'lodash'
import { Element } from 'slate'

import { VolltextFormatierung } from './volltext/VolltextElement'

const explicit: VolltextFormatierung = {
  data_origin: 'explicit',
  box: {
    data_origin: 'quote',
    data_type: 'explicit',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const incipit: VolltextFormatierung = {
  data_origin: 'incipit',
  box: {
    data_origin: 'quote',
    data_type: 'incipit',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const zitat: VolltextFormatierung = {
  data_origin: 'zitat',
  box: {
    data_origin: 'quote',
    children: [{ text: '' }],
  },
  children: [{ text: '' }],
}
const werktitel: VolltextFormatierung = {
  data_origin: 'werktitel',
  box: {
    data_origin: 'title',
    children: [{ text: '' }],
  },
  children: [{ text: '' }],
}
const autor: VolltextFormatierung = {
  data_origin: 'autor',
  box: {
    data_origin: 'persName',
    data_role: 'author',
    children: [{ text: '' }],
  } as Element,
  children: [{ text: '' }],
}
const emptyElements: Partial<
  Record<VolltextFormatierung['data_origin'], VolltextFormatierung>
> = {
  explicit,
  incipit,
  zitat,
  werktitel,
  autor,
}

export const FormatierungFactory = Object.freeze({
  from(auszeichnung: VolltextFormatierung['data_origin']): Element {
    const element = emptyElements[auszeichnung]
    if (element) {
      return cloneDeep(element)
    } else {
      throw new Error(
        `Elemente zu semantischer Auszeichnung "${auszeichnung}" nicht definiert`
      )
    }
  },
})
