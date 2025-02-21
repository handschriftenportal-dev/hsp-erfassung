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

import { FavoritenAPI } from '../../../src/domain/sonderzeichen/FavoritenAPI'
import { FavoritePersistencePort } from '../../../src/domain/sonderzeichen/FavoritePersistencePort'

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
