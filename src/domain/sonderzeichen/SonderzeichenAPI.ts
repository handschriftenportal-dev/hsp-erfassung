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

import { SonderzeichenListen } from './data/SonderzeichenListen'
import { SonderzeichenMap } from './data/SonderzeichenMap'
import { Sonderzeichen } from './Sonderzeichen'

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
