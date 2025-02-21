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

import { isEmpty, negate, uniq } from 'lodash'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { APICall } from '../../../infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from '../../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { VolltextNormdatum } from '../../../infrastructure/slate/volltext/VolltextElement'
import {
  selectNormdaten,
  updateNormdatum,
} from '../../erfassung/ErfassungsState'
import { GNDEntityFact } from '../../erfassung/GNDEntityFact'
import { NodeLabel } from '../../erfassung/NormdatenService'
import { getGndIdFromUrl } from './dialog/NormdatenDialogUtilities'

export function findIDOrName(element: VolltextNormdatum): string {
  const { data_key, data_ref } = element.box as any
  return data_key || (data_ref ? getGndIdFromUrl(data_ref) : element.content)
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

const nodeLookup: Record<string, NodeLabel> = {
  orgName: 'koerperschaft',
  placeName: 'ort',
  persName: 'person',
  language: 'sprache',
}

export function fetchGNDEntitiesByNode(
  origin: string,
  setGndEntities: Dispatch<SetStateAction<GNDEntityFact[]>>,
  nameOrID: string
): void {
  const nodeName = nodeLookup[origin] || ''
  SBBNormdatenServiceAdapter.findGNDEntity(nodeName, nameOrID)
    .then((response) => {
      setGndEntities(APICall.isSuccess(response) ? response.value : [])
    })
    .catch((error) => {
      console.error(
        nodeName + ' -> Error during find GND Entities by Node',
        error
      )
      setGndEntities([])
    })
}
