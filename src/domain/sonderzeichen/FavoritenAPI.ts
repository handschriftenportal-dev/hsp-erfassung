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

import { SonderzeichenMap } from './data/SonderzeichenMap'
import { FavoritePersistencePort } from './FavoritePersistencePort'

export type FavoritenAPI = {
  isFavorit: (key: string) => boolean
  getList: (filter?: string) => readonly string[]
  add: (key: string) => void
  remove: (key: string) => void
}

export const FavoritenAPI = Object.freeze({
  createFavoriteAPI(persist: FavoritePersistencePort): FavoritenAPI {
    let storage: string[] = []
    let fastLookup: Set<string> = new Set()
    persist.load().then((items) => {
      storage = items
      fastLookup = new Set(items)
    })

    function add(key: string) {
      if (fastLookup.has(key)) {
        return
      }
      storage.push(key)
      fastLookup.add(key)
      void persist.save(storage)
    }

    function remove(key: string) {
      if (!fastLookup.has(key)) {
        return
      }
      storage = storage.filter((x) => x !== key)
      fastLookup.delete(key)
      void persist.save(storage)
    }

    function isFavorit(key: string) {
      return fastLookup.has(key)
    }

    function getList(filter: string = '') {
      if (filter === '') {
        return storage
      } else {
        return storage.filter((key) => {
          const suche = filter?.toUpperCase() ?? ''
          return (
            key.includes(suche) ||
            SonderzeichenMap[key]?.description.includes(suche)
          )
        })
      }
    }

    return Object.freeze({
      isFavorit,
      getList,
      add,
      remove,
    })
  },
})
