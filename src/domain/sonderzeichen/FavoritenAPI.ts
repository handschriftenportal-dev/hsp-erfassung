import { SonderzeichenMap } from './data/SonderzeichenMap'
import type { FavoritePersistencePort } from './FavoritePersistencePort'

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
