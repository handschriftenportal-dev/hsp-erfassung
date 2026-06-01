import type { FavoritePersistencePort } from 'src/domain/sonderzeichen/FavoritePersistencePort'

const LOCAL_STORAGE_KEY = 'favorite_api_key'

export const LocalStorageFavoritePersistenceAdapter: FavoritePersistencePort =
  Object.freeze({
    load() {
      const items = localStorage.getItem(LOCAL_STORAGE_KEY)
      return Promise.resolve(items !== null ? JSON.parse(items) : [])
    },
    save(items: string[]) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
      return Promise.resolve(true)
    },
  })
