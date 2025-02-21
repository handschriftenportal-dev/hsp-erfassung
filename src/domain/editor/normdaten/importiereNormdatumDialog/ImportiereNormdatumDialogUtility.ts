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

import { APICall } from '../../../../infrastructure/normdaten/APICall'
import { LobidEntity } from '../../../../infrastructure/normdaten/LobidEntity'
import { LobidService } from '../../../../infrastructure/normdaten/LobidService'
import { SBBNormdatenServiceAdapter } from '../../../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { ImportiereNormdatumDialogState } from './ImportiereNormdatumDialogState'

const MIN_SEARCH_TERM_LENGTH = 3

export const ImportiereNormdatumDialogUtility = Object.freeze({
  search(
    state: ImportiereNormdatumDialogState,
    normdatumTyp: 'person' | 'ort' | 'koerperschaft'
  ) {
    if (
      state.status === ImportiereNormdatumDialogState.status.loading &&
      state.searchTerm.length > MIN_SEARCH_TERM_LENGTH
    ) {
      LobidService.updateConfiguration({
        type: normdatumTyp,
        from: state.rowsPerPage * state.page,
        size: state.rowsPerPage,
      })
      return LobidService.search(state.searchTerm)
    } else {
      return Promise.reject(state.searchTerm)
    }
  },
  canSubmit(state: ImportiereNormdatumDialogState) {
    return (
      state.selected < state.items.length &&
      state.status === ImportiereNormdatumDialogState.status.success
    )
  },
  submit(item: LobidEntity) {
    return new Promise(
      (
        resolve: (fact: GNDEntityFact) => void,
        reject: (error: unknown) => void
      ): void => {
        SBBNormdatenServiceAdapter.fetchEntityById(item.gndIdentifier)
          .then((result) => {
            if (APICall.isSuccess(result)) {
              resolve(result.value)
              return
            } else if (!APICall.isNotFound(result)) {
              reject(result)
              return
            }
            const entityFact = LobidEntity.toGNDEntityFact(item)
            SBBNormdatenServiceAdapter.putGNDEntity(entityFact)
              .then((result) => {
                if (APICall.isSuccess(result)) {
                  resolve(result.value)
                } else {
                  reject(result)
                }
              })
              .catch(reject)
          })
          .catch(reject)
      }
    )
  },
})
