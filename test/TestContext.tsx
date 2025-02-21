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

import { ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material'
import { configureStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BaseEditor, BaseElement } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

import { AlertMessage } from '../src/domain/erfassung/AlertMessage'
import {
  ErfassungsEditor,
  ErfassungsElement,
} from '../src/domain/erfassung/ErfassungsEditor'
import erfassungsReducer from '../src/domain/erfassung/ErfassungsState'
import { FavoritenAPI } from '../src/domain/sonderzeichen/FavoritenAPI'
import defaultStore from '../src/infrastructure/ConfigureReduxStore'
import i18n from '../src/infrastructure/i18n/i18n'
import { GlobalModal } from '../src/infrastructure/modal/GlobalModal'
import { SBBNormdatenServiceAdapter } from '../src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { FavoritenService } from '../src/infrastructure/persistence/FavoritenService'
import { LocalStorageFavoritePersistenceAdapter } from '../src/infrastructure/persistence/LocalStorageFavoritePersistenceAdapter'
import { theme } from '../src/theme'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & ErfassungsEditor
    Element: BaseElement & ErfassungsElement
  }
}

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

export function TestContext({ children, store: customStore }: any) {
  const store = customStore || defaultStore
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
