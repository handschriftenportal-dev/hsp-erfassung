import type { FavoritePersistencePort } from 'src/domain/sonderzeichen/FavoritePersistencePort'
import {
  fetchBearbeiterConfig,
  saveBearbeiterConfig,
} from 'src/infrastructure/nachweis/NachweisServiceAdapter'

export const NachweisStorageFavoritePersistenceAdapter = Object.freeze({
  createAdapter(authorizationToken: string): FavoritePersistencePort {
    return {
      load() {
        return fetchBearbeiterConfig(authorizationToken).then(
          (preferences) => preferences.sonderzeichen
        )
      },
      save(sonderzeichen: string[]) {
        return saveBearbeiterConfig({ sonderzeichen }, authorizationToken).then(
          () => true
        )
      },
    }
  },
})
