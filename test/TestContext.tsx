import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material'
import type { Store } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { AlertMessage } from 'src/domain/erfassung/AlertMessage'
import erfassungsReducer from 'src/domain/erfassung/ErfassungsState'
import { FavoritenAPI } from 'src/domain/sonderzeichen/FavoritenAPI'
import defaultStore from 'src/infrastructure/ConfigureReduxStore'
import i18n from 'src/infrastructure/i18n/i18n'
import { GlobalModal } from 'src/infrastructure/modal/GlobalModal'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { FavoritenService } from 'src/infrastructure/persistence/FavoritenService'
import { LocalStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'
import { theme } from 'src/theme'

export const configureTestStore = () =>
  configureStore({
    reducer: {
      erfassung: erfassungsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        immutableCheck: false,
        serializableCheck: false,
      }),
  })

export function TestContext({
  children,
  store: customStore,
}: PropsWithChildren<{ store?: Store }>) {
  const store = customStore ?? defaultStore
  SBBNormdatenServiceAdapter.updateConfiguration({
    normdatenUrl: store.getState().erfassung.configuration.normdatenUrl,
  })
  const favoriteAPI = FavoritenAPI.createFavoriteAPI(
    LocalStorageFavoritePersistenceAdapter
  )
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <FavoritenService api={favoriteAPI}>
            <GlobalModal>
              <AlertMessage>
                <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
              </AlertMessage>
            </GlobalModal>
          </FavoritenService>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
