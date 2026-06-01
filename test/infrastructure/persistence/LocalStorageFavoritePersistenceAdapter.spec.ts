import { LocalStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'

describe('LocalStorageFavoritePersistenceAdapter', () => {
  afterEach(() => {
    LocalStorageFavoritePersistenceAdapter.save([])
  })
  it('can load', async () => {
    const items = await LocalStorageFavoritePersistenceAdapter.load()
    expect(items).toMatchObject([])
  })
  it('can save', async () => {
    const items = ['a', 'b', 'c']
    const success = await LocalStorageFavoritePersistenceAdapter.save(items)
    expect(success).toBe(true)
    const stored = await LocalStorageFavoritePersistenceAdapter.load()
    expect(stored).toMatchObject(items)
  })
})
