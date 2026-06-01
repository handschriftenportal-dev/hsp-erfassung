export type FavoritePersistencePort = {
  load: () => Promise<string[]>
  save: (list: string[]) => Promise<boolean>
}

export const FavoritePersistencePort: FavoritePersistencePort = {
  load() {
    return Promise.resolve([])
  },
  save() {
    return Promise.resolve(false)
  },
}
