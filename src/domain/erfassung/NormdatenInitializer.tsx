import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchGNDEntitiesByNode } from 'src/domain/editor/normdaten/useNormdaten'

import { updateEntstehungsorte, updateGrundsprachen } from './ErfassungsState'
import type { GNDEntityFact } from './GNDEntityFact'
import { NormdatenService } from './NormdatenService'

function sortByPreferredName(
  fact: GNDEntityFact,
  toCompare: GNDEntityFact
): number {
  return fact.preferredName.localeCompare(toCompare.preferredName)
}

export const NormdatenInitializer: FC = memo(function NormdatenInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchGNDEntitiesByNode({
      nodeLabel: NormdatenService.nodeLabel.sprache,
    }).then((grundsprachen) =>
      dispatch(updateGrundsprachen(grundsprachen.sort(sortByPreferredName)))
    )

    fetchGNDEntitiesByNode({
      nodeLabel: NormdatenService.nodeLabel.ort,
    }).then((entstehungsorte) =>
      dispatch(updateEntstehungsorte(entstehungsorte.sort(sortByPreferredName)))
    )
  })

  return null
})
