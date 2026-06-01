import { SonderzeichenAPI } from 'src/domain/sonderzeichen/SonderzeichenAPI'

import type { AnalyserReport } from './AnalyserReport'

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
