import { SonderzeichenListen } from './data/SonderzeichenListen'
import { SonderzeichenMap } from './data/SonderzeichenMap'
import type { Sonderzeichen } from './Sonderzeichen'

type FilterOptionen = {
  descriptionFilter?: string
  gruppe?: string
}

type SonderzeichenAPI = {
  isFavorite: (key: string) => boolean
  isKnown: (key: string) => boolean
  gruppen: () => readonly string[]
  getList: (options?: FilterOptionen) => readonly string[]
  getSonderzeichen: (key: string) => Sonderzeichen
}

export const REPLACEMENT_CHARACTER_KEY = 'U+FFFD'

function createSonderzeichenAPI(): SonderzeichenAPI {
  const fallback = SonderzeichenMap[REPLACEMENT_CHARACTER_KEY]
  if (fallback === undefined) {
    throw new Error(
      'Cannot initialize SonderzeichenAPI fallback: Sonderzeichen "U+FFFD" missing in Lookup'
    )
  }
  function gruppen() {
    return SonderzeichenListen.gruppen
  }
  function getList(options?: FilterOptionen) {
    const { gruppe, descriptionFilter } = options ?? {}
    const result =
      gruppe && gruppe in SonderzeichenListen.gruppenMap
        ? SonderzeichenListen.gruppenMap[gruppe]
        : SonderzeichenListen.gesamt
    return descriptionFilter
      ? result.filter((key) => {
          const suche = descriptionFilter?.toUpperCase() ?? ''
          return (
            key.includes(suche) ||
            SonderzeichenMap[key].description.includes(suche)
          )
        })
      : result
  }
  function getSonderzeichen(key: string) {
    const result = SonderzeichenMap[key]
    if (result) {
      return result
    }
    console.warn(
      `Cannot find Sonderzeichen for key ${key}. Returning fallback`,
      fallback
    )
    return fallback
  }
  function isKnown(key: string) {
    return key in SonderzeichenMap
  }
  function isFavorite(key: string) {
    return key === 'U+2022'
  }

  return Object.freeze({
    isFavorite,
    isKnown,
    gruppen,
    getList,
    getSonderzeichen,
  })
}

export const SonderzeichenAPI = createSonderzeichenAPI()
