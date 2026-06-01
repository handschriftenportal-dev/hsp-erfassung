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

const ansicht = {
  favoriten: 'favoriten',
  zeichensaetze: 'zeichensaetze',
} as const

export const SonderzeichenAuswahlState = Object.freeze({
  ansicht,
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
