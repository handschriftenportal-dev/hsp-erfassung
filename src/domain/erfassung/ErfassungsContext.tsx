import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Provider } from 'react-redux'
import { FavoritenAPI } from 'src/domain/sonderzeichen/FavoritenAPI'
import Store from 'src/infrastructure/ConfigureReduxStore'
import { GlobalModal } from 'src/infrastructure/modal/GlobalModal'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import { FavoritenService } from 'src/infrastructure/persistence/FavoritenService'
import { LocalStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'
import { NachweisStorageFavoritePersistenceAdapter } from 'src/infrastructure/persistence/NachweisStorageFavoritePersistenceAdapter'
import { GlobalerEinfuegeService } from 'src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'

import { AlertMessage } from './AlertMessage'
import type { Configuration } from './Configuration'
import { updateConfiguration, updateMode } from './ErfassungsState'
import ErrorBoundary from './ErrorBoundary'
import { FullscreenLogik } from './FullscreenLogik'
import { HSPErfassungContainer } from './HSPErfassungContainer'
import { NormdatenInitializer } from './NormdatenInitializer'
import { ThemenbereicheAPI } from './ThemenbereicheAPI'
import { ThemenbereichInitializer } from './ThemenbereichInitializer'

interface Props extends Configuration {}

export const ErfassungsContext: FC<Props> = memo((props) => {
  const {
    isEditable,
    startInReadOnly,
    authorizationToken,
    language,
    standalone,
  } = props
  const { i18n } = useTranslation()
  i18n.changeLanguage(language)

  const themenbereichAPI = useMemo(
    () => ThemenbereicheAPI.new(language),
    [language]
  )
  const favoritenAPI = useMemo(
    () =>
      FavoritenAPI.createFavoriteAPI(
        standalone
          ? LocalStorageFavoritePersistenceAdapter
          : NachweisStorageFavoritePersistenceAdapter.createAdapter(
              authorizationToken
            )
      ),
    [standalone, authorizationToken]
  )

  const startingMode =
    isEditable && !startInReadOnly ? 'editMode' : 'previewMode'
  Store.dispatch(updateConfiguration(props))
  Store.dispatch(updateMode(startingMode))

  return (
    <ErrorBoundary>
      <Provider store={Store}>
        <FullscreenLogik>
          <AlertMessage>
            <FavoritenService api={favoritenAPI}>
              <ThemenbereichService api={themenbereichAPI}>
                <GlobalModal>
                  <GlobalerEinfuegeService>
                    <ThemenbereichInitializer />
                    <NormdatenInitializer />
                    <HSPErfassungContainer />
                  </GlobalerEinfuegeService>
                </GlobalModal>
              </ThemenbereichService>
            </FavoritenService>
          </AlertMessage>
        </FullscreenLogik>
      </Provider>
    </ErrorBoundary>
  )
})
