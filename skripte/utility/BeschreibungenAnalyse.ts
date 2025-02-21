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

import { SonderzeichenAPI } from '../../src/domain/sonderzeichen/SonderzeichenAPI'
import { AnalyserReport } from './AnalyserReport'

function codepointToIdentifier(n: number): string {
  return `U+${n.toString(16).toUpperCase().padStart(4, '0')}`
}

function orderByCount(
  [_cp1, compare]: [string, number],
  [_cp2, comparator]: [string, number]
) {
  return compare - comparator
}

function toRow([key, count]: [string, number]):
  | Record<string, string>
  | undefined {
  const codepoint = Number.parseInt(key, 10)
  if (Number.isNaN(codepoint)) {
    return undefined
  }
  const identifier = codepointToIdentifier(codepoint)
  return {
    codepoint: identifier,
    codepoint_dez: codepoint.toString(10),
    zeichen: String.fromCodePoint(codepoint),
    im_editor: SonderzeichenAPI.isKnown(identifier) ? 'Ja' : 'Nein',
    anzahl: count.toString(10),
  }
}

function createBeschreibungenAnalyse() {
  return {
    fields(): string[] {
      return ['codepoint', 'codepoint_dez', 'zeichen', 'im_editor', 'anzahl']
    },
    header(): Record<string, string> {
      return {
        codepoint: 'Codepoint',
        codepoint_dez: 'Codepoint (Dez)',
        zeichen: 'Zeichen',
        im_editor: 'Sonderzeichen im Editor',
        anzahl: 'Anzahl',
      }
    },
    iterateCodepointRows(
      report: AnalyserReport,
      callback: (row: Record<string, string>) => void
    ) {
      return Object.entries(report.codepoints)
        .sort(orderByCount)
        .forEach((pair) => {
          const row = toRow(pair)
          if (row) {
            callback(row)
          }
        })
    },
  }
}

export const BeschreibungenAnalyse = Object.freeze(
  createBeschreibungenAnalyse()
)
