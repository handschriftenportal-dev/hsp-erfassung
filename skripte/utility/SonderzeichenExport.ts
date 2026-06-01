import { Sonderzeichen } from 'src/domain/sonderzeichen/Sonderzeichen'
import { SonderzeichenAPI } from 'src/domain/sonderzeichen/SonderzeichenAPI'

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
