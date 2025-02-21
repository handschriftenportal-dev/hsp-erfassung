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

import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Provider } from 'react-redux'

import Store from '../../infrastructure/ConfigureReduxStore'
import { GlobalModal } from '../../infrastructure/modal/GlobalModal'
import { ThemenbereichService } from '../../infrastructure/normdaten/ThemenbereichService'
import { FavoritenService } from '../../infrastructure/persistence/FavoritenService'
import { LocalStorageFavoritePersistenceAdapter } from '../../infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'
import { NachweisStorageFavoritePersistenceAdapter } from '../../infrastructure/persistence/NachweisStorageFavoritePersistenceAdapter'
import { GlobalerEinfuegeService } from '../../infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { FavoritenAPI } from '../sonderzeichen/FavoritenAPI'
import { AlertMessage } from './AlertMessage'
import { Configuration } from './Configuration'
import { updateConfiguration, updateMode } from './ErfassungsState'
import ErrorBoundary from './ErrorBoundary'
import { FullscreenLogik } from './FullscreenLogik'
import { HSPErfassungContainer } from './HSPErfassungContainer'
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
