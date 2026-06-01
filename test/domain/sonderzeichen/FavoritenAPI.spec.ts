import { FavoritenAPI } from 'src/domain/sonderzeichen/FavoritenAPI'
import { FavoritePersistencePort } from 'src/domain/sonderzeichen/FavoritePersistencePort'

describe('FavoriteAPI', () => {
  it('getList starts empty', () => {
    const api = FavoritenAPI.createFavoriteAPI(FavoritePersistencePort)
    expect(api.getList()).toMatchObject([])
  })
  it('can add item', () => {
    const api = FavoritenAPI.createFavoriteAPI(FavoritePersistencePort)
    api.add('key')
    expect(api.getList()).toMatchObject(['key'])
  })
  it('can find item', () => {
    const api = FavoritenAPI.createFavoriteAPI(FavoritePersistencePort)
    api.add('key')
    expect(api.isFavorit('key')).toBe(true)
  })
  it('can remove item', () => {
    const api = FavoritenAPI.createFavoriteAPI(FavoritePersistencePort)
    api.add('key')
    expect(api.isFavorit('key')).toBe(true)
    api.remove('key')
    expect(api.getList()).toMatchObject([])
  })
})
