import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'
import { LobidService } from 'src/infrastructure/normdaten/LobidService'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'

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
