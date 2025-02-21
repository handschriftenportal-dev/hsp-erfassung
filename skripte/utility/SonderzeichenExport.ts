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

import { Sonderzeichen } from '../../src/domain/sonderzeichen/Sonderzeichen'
import { SonderzeichenAPI } from '../../src/domain/sonderzeichen/SonderzeichenAPI'

function sonderzeichenToFields(
  sonderzeichen: Sonderzeichen
): Record<string, string> {
  const { codepoint, sign, description } = sonderzeichen
  return {
    codepoint: `U+${codepoint.toString(16).toUpperCase().padStart(4, '0')}`,
    vorschau: sign,
    zeichen: Sonderzeichen.toString(sonderzeichen),
    beschreibung: description,
    codepoint_dez: codepoint.toString(10),
  }
}

function keyContainedInLists(
  key: string,
  gruppen: readonly string[]
): Record<string, string> {
  return Object.fromEntries(
    gruppen.map((gruppe) => [
      gruppe,
      SonderzeichenAPI.getList({ gruppe }).includes(key) ? 'x' : '',
    ])
  )
}

type IteratorCallback = (row: Record<string, string>) => void

function createSonderzeichenExport() {
  const gruppen = SonderzeichenAPI.gruppen()
  const fields: string[] = [
    'codepoint',
    'vorschau',
    'zeichen',
    'beschreibung',
    'codepoint_dez',
    ...gruppen,
  ]
  const header: Record<string, string> = {
    codepoint: 'Codepoint',
    vorschau: 'Vorschau',
    zeichen: 'Zeichen',
    beschreibung: 'Beschreibung',
    codepoint_dez: 'Codepoint (dezimal)',
    ...Object.fromEntries(gruppen.map((gruppe) => [gruppe, gruppe])),
  }

  function keyToRow(key: string): Record<string, string> {
    return {
      ...sonderzeichenToFields(SonderzeichenAPI.getSonderzeichen(key)),
      ...keyContainedInLists(key, gruppen),
    }
  }

  return {
    fields() {
      return fields
    },
    header() {
      return header
    },
    keyToRow,
    iterateSonderzeichen(callback: IteratorCallback): void {
      SonderzeichenAPI.getList().forEach((key) => callback(keyToRow(key)))
    },
  }
}

export const SonderzeichenExport = Object.freeze(createSonderzeichenExport())
