/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import axios from 'axios'
import { findGNDEntitiesByNode, findGNDEntitiesByNodeWithVariantName, GraphQLQuery } from './GraphQLQuery'
import { GNDEntity } from './GNDEntity'
import i18next from 'i18next'

export const findGNDEntity: any = (url: string, query: GraphQLQuery, setState: any) => {

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  axios.post(url, JSON.stringify(query), axiosConfig).then(function (response) {
    const noResult = {
      preferredName: '',
      gndIdentifier: ''
    }

    const gndentity: GNDEntity = response.data && response.data.data && response.data.data.findGNDEntityFacts
      ? response.data.data.findGNDEntityFacts.length === 1
        ? response.data.data.findGNDEntityFacts[0]
        : response.data.data.findGNDEntityFacts.length > 1
          ? {
              preferredName: i18next.t('editor.tomanyhits') + ' (' + query.queryParamter + ')',
              gndIdentifier: i18next.t('editor.noresult') + ' (' + query.queryParamter + ')'
            }
          : noResult
      : noResult
    setState(gndentity)

  }).catch(function (error) {
    const errorResult = {
      error: i18next.t('editor.error'),
    }
    setState(errorResult)
    console.warn('Error during searching GND Entity', error)
  })
}

export const findGNDEntities: any = (url: string, nodeLable: string, nameOdID: string) => {
  const queryByNode: GraphQLQuery = {
    query: (nameOdID) ? findGNDEntitiesByNodeWithVariantName(nodeLable, nameOdID) : findGNDEntitiesByNode(nodeLable),
    variables: null,
    queryParamter: nodeLable
  }
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  return axios.post(url, JSON.stringify(queryByNode), axiosConfig)
    .then(function (response) {
      return response.data.data.findGNDEntityFacts
    })
    .catch(function (error) {
      console.error('Error during findGNDEntities', error)
      return [] as GNDEntity[]
    })
}
