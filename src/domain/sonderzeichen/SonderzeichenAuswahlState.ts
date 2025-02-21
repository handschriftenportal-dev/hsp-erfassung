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

import { FavoritenAPI } from './FavoritenAPI'
import { FavoritePersistencePort } from './FavoritePersistencePort'
import { SonderzeichenAPI } from './SonderzeichenAPI'

export type SonderzeichenAuswahlState = {
  api: FavoritenAPI
  suche: string
  ansicht: 'favoriten' | 'zeichensaetze'
  gruppen: readonly string[]
  gruppe: string
  sonderzeichenKeys: readonly string[]
  auswahlIndex: number
  spalten: number
}

export const SonderzeichenAuswahlState = Object.freeze({
  ansicht: {
    favoriten: 'favoriten',
    zeichensaetze: 'zeichensaetze',
  },
  empty(api?: FavoritenAPI): SonderzeichenAuswahlState {
    return {
      api: api ?? FavoritenAPI.createFavoriteAPI(FavoritePersistencePort),
      suche: '',
      ansicht: 'zeichensaetze',
      gruppen: SonderzeichenAPI.gruppen(),
      gruppe: 'gesamt',
      spalten: 4,
      sonderzeichenKeys: SonderzeichenAPI.getList(),
      auswahlIndex: 0,
    }
  },
  zeigeFavoriten(state: SonderzeichenAuswahlState): boolean {
    return state.ansicht === 'favoriten'
  },
  zeigeZeichensaetze(state: SonderzeichenAuswahlState): boolean {
    return state.ansicht === 'zeichensaetze'
  },
})
