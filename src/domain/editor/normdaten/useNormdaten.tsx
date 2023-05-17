/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, { useEffect } from 'react'
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import { findGNDEntityFacts } from '../../../infrastructure/normdaten/GraphQLQuery'
import { findGNDEntities, findGNDEntity } from '../../../infrastructure/normdaten/NormdatenServiceAdapter'
import { serializeAsText } from '../../../infrastructure/XMLConverter'

export const GND_ID_PREFIX = 'http://d-nb.info/gnd/'

export function findIDOrName(element: any) {
  let id

  if (element && element.data_key) {
    id = element.data_key
  }

  if (!id && element && element.data_ref) {
    if (element.data_ref && element.data_ref.includes(
      GND_ID_PREFIX)) {
      id = element.data_ref.replaceAll(GND_ID_PREFIX, '')
    } else if (element.data_ref) {
      id = element.data_ref
    }
  }

  if (!id) {
    id = serializeAsText(element)
  }

  return id
}

export function useNormdaten(normdatenurl: string, element: any) {

  const [gndEntity, setGndEntity] = React.useState({ preferredName: '', gndIdentifier: '' } as GNDEntity)

  useEffect(() => {
    findGNDEntity(normdatenurl, {
      query: findGNDEntityFacts(findIDOrName(element)),
      variables: null,
      queryParamter: (element) ? element.id : 'id'
    }, setGndEntity)
  }, [])

  return gndEntity
}

export function useNormdatenFindById(normdatenurl: string, id: string, setAutoCompleteGndEntity: React.Dispatch<React.SetStateAction<GNDEntity>>) {

  useEffect(() => {
    findGNDEntity(normdatenurl, {
      query: findGNDEntityFacts(id),
      variables: null,
      queryParamter: id
    }, setAutoCompleteGndEntity)
  }, [])
}

export function useFindGNDEntitiesByNode(normdatenUrl: string, origin: string, setGndEntities: React.Dispatch<React.SetStateAction<GNDEntity[]>>, nameOdID: string) {
  let nodeName = ''

  if (origin === 'orgName') {
    nodeName = 'CorporateBody'
  } else if (origin === 'placeName') {
    nodeName = 'Place'
  } else if (origin === 'persName') {
    nodeName = 'Person'
  } else if (origin === 'language') {
    nodeName = 'Language'
  }

  findGNDEntities(normdatenUrl, nodeName, nameOdID)
    .then(function (gndEntitiesFromFulfilledPromise: GNDEntity[]) {
      setGndEntities(gndEntitiesFromFulfilledPromise)
    })
    .catch(function (error: any) {
      console.error(nodeName + ' -> Error during find GND Entities by Node', error)
      setGndEntities([] as GNDEntity[])
    })

}
