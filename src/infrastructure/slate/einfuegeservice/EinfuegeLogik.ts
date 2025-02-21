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

import { Sonderzeichen } from '../../../domain/sonderzeichen/Sonderzeichen'
import { insertTextAtSelection, insertTextIntoElement } from '../SlateBoundary'
import { extractText } from '../SlateNormdataBoundary'
import {
  EditorTarget,
  ElementTarget,
  GlobalerEinfuegeServiceAPI,
} from './GlobalerEinfuegeServiceAPI'

function insertString(into: string, at: number, char: string): string {
  return into.slice(0, at) + char + into.slice(at)
}

const intoElement =
  (target: ElementTarget) =>
  (sonderzeichen: Sonderzeichen): void => {
    const char = Sonderzeichen.toString(sonderzeichen)
    const { editor, element, input, selection } = target
    const value = extractText(element)
    const newSelection = selection + char.length
    const newValue = insertString(value, selection, char)
    insertTextIntoElement(editor, element, newValue)
    setTimeout(() => {
      input.focus()
      input.setSelectionRange(newSelection, newSelection, 'forward')
    }, 0)
  }

const intoEditor =
  (target: EditorTarget) =>
  (sonderzeichen: Sonderzeichen): void => {
    const char = Sonderzeichen.toString(sonderzeichen)
    const { editor, selection } = target
    insertTextAtSelection(editor, selection, char)
  }

const noop = (_: Sonderzeichen): void => undefined

function forTarget(
  target: GlobalerEinfuegeServiceAPI['target']
): (sonderzeichen: Sonderzeichen) => void {
  switch (target?.type) {
    case undefined:
      return noop
    case 'editor':
      return intoEditor(target)
    case 'element':
      return intoElement(target)
  }
}

export const EinfuegeLogik = Object.freeze({
  forTarget,
})
