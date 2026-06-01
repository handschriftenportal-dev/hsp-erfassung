import { isEmpty, negate, uniq } from 'lodash'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import {
  selectNormdaten,
  updateNormdatum,
} from 'src/domain/erfassung/ErfassungsState'
import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { NodeLabel } from 'src/domain/erfassung/NormdatenService'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import type { VolltextNormdatum } from 'src/infrastructure/slate/volltext/VolltextElement'

export function findIDOrName(element: VolltextNormdatum): string {
  const { data_key, data_ref } = element.box
  return (
    data_key ||
    (data_ref ? NormdatenUtilities.urlToId(data_ref) : element.content)
  )
}

export function useFetchNormdaten(id: string): APICall<GNDEntityFact> {
  const normdaten = useSelector(selectNormdaten)
  const dispatch = useDispatch()

  const datum = normdaten?.[id]
  if (datum) {
    return datum
  }

  dispatch(updateNormdatum([id, APICall.loading()]))
  SBBNormdatenServiceAdapter.fetchEntityById(id)
    .catch(APICall.failed)
    .then((value) => dispatch(updateNormdatum([id, value])))
  return APICall.loading()
}

export function prefetchNormdata(ids: string[]): Promise<GNDEntityFact[]> {
  const uniqueIds = uniq(ids).filter(negate(isEmpty))
  return SBBNormdatenServiceAdapter.fetchEntitiesByIds(uniqueIds).then(
    (response) => {
      return APICall.isSuccess(response) ? response.value : []
    }
  )
}

export function useNormdatenFindById(
  id: string,
  setAutoCompleteGndEntity: Dispatch<SetStateAction<GNDEntityFact>>
): void {
  useEffect(() => {
    SBBNormdatenServiceAdapter.fetchEntityById(id).then((response) => {
      if (APICall.isSuccess(response)) {
        setAutoCompleteGndEntity(response.value)
      }
    })
  }, [id, setAutoCompleteGndEntity])
}

export function fetchGNDEntitiesByNode(options: {
  nodeLabel: NodeLabel
  nameOrId?: string
}): Promise<GNDEntityFact[]> {
  const { nodeLabel, nameOrId = '' } = options
  return SBBNormdatenServiceAdapter.findGNDEntity(nodeLabel, nameOrId)
    .then((response) => (APICall.isSuccess(response) ? response.value : []))
    .catch((error) => {
      console.error(
        nodeLabel + ' -> Error during find GND Entities by Node',
        error
      )
      return []
    })
}
