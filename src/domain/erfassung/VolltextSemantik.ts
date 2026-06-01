const referenzen = [
  'person',
  'koerperschaft',
  'ort',
  'buchkunde',
  'buchschmuck',
  'ueberlieferungsform',
  'einband',
  'initium',
  'musiknotation',
  'schriftart',
  'schreibsprache',
  'textgattung',
  'externerLink',
  'literatur',
] as const
const formatierungen = [
  'autor',
  'werktitel',
  'incipit',
  'explicit',
  'zitat',
] as const
const boxen = ['box'] as const
const bloecke = ['paragraph'] as const
const text = ['superskript'] as const

export type VolltextSemantik =
  | (typeof referenzen)[number]
  | (typeof formatierungen)[number]
  | (typeof boxen)[number]
  | (typeof bloecke)[number]
  | (typeof text)[number]

export const VolltextSemantik = Object.freeze({
  boxen,
  bloecke,
  referenzen,
  formatierungen,
  text,
})
