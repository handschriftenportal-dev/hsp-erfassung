import type { FC, PropsWithChildren } from 'react'
import { createContext, memo, useContext } from 'react'
import { FavoritenAPI } from 'src/domain/sonderzeichen/FavoritenAPI'
import { FavoritePersistencePort } from 'src/domain/sonderzeichen/FavoritePersistencePort'

const initialValue = FavoritenAPI.createFavoriteAPI(FavoritePersistencePort)
const FavoritenContext = createContext(initialValue)
export const useFavoriten = () => useContext(FavoritenContext)

interface Props {
  api: FavoritenAPI
}

export const FavoritenService: FC<PropsWithChildren<Props>> = memo(
  function FavoritenService({ children, api }) {
    return (
      <FavoritenContext.Provider value={api}>
        {children}
      </FavoritenContext.Provider>
    )
  }
)
