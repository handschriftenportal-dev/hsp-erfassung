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

import { pipe } from 'lodash/fp'
import { createEditor, Editor, Element } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

import { VolltextElement, VolltextElementTyp } from './VolltextElement'

type CreateErfassungsEditor = () => Editor
type Decorator<T = Editor> = (toBeDecorated: T) => T
type Predicate<T = Element> = (x: T) => boolean

const extendPredicate =
  (
    lookup: Record<VolltextElementTyp, boolean>,
    fallback: Predicate
  ): Predicate =>
  (element) => {
    const typ = VolltextElement.typ(element)
    return typ === undefined ? fallback(element) : lookup[typ]
  }

const withMarkableVoid: Decorator = (editor) => {
  const { isVoid, markableVoid } = editor
  const lookup = {
    box: true,
    block: false,
    referenz: true,
    formatierung: false,
  }
  editor.isVoid = extendPredicate(lookup, isVoid)
  editor.markableVoid = extendPredicate(lookup, markableVoid)
  return editor
}

const withInline: Decorator = (editor) => {
  const { isInline } = editor
  const lookup = {
    box: true,
    block: false,
    referenz: true,
    formatierung: true,
  }
  editor.isInline = extendPredicate(lookup, isInline)
  return editor
}

export const createVolltextEditor: CreateErfassungsEditor = () =>
  pipe(withMarkableVoid, withInline, withHistory, withReact)(createEditor())
