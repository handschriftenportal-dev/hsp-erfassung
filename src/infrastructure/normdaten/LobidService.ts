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

import axios from 'axios'

import { APICall } from './APICall'
import { LobidEntity } from './LobidEntity'

interface Configuration {
  from: number
  size: number
  type: 'ort' | 'person' | 'koerperschaft'
}

interface LobidResult {
  total: number
  items: LobidEntity[]
}

const filterLookup: Record<Configuration['type'], string> = {
  ort: 'type:PlaceOrGeographicName',
  person: 'type:Person',
  koerperschaft: 'type:CorporateBody',
}

function createService() {
  const configuration: Configuration = {
    from: 0,
    size: 10,
    type: 'person',
  }
  const url = new URL('https://lobid.org/gnd/search')
  const axiosConfig = { headers: { Accept: 'application/json' } }
  updateConfiguration(configuration)

  function updateConfiguration(config: Partial<Configuration>) {
    Object.assign(configuration, config)
    url.searchParams.delete('from')
    url.searchParams.delete('size')
    url.searchParams.append('from', `${configuration.from}`)
    url.searchParams.append('size', `${configuration.size}`)
    url.searchParams.delete('filter')
    url.searchParams.append('filter', filterLookup[configuration.type])
  }

  return {
    updateConfiguration,
    search(searchTerm: string): Promise<APICall<LobidResult>> {
      url.searchParams.delete('q')
      url.searchParams.append('q', searchTerm)
      return axios.get(url.href, axiosConfig).then((response) => {
        const { totalItems: total, member: items } = response.data
        if (!Number.isSafeInteger(total) || !Array.isArray(items)) {
          return APICall.failed({
            message: 'Malformed response from lobid.org',
            cause: response.data,
          })
        }
        return APICall.success({
          total,
          items: items.map(LobidEntity.fromLobidService),
        })
      })
    },
  }
}

export const LobidService = Object.freeze(createService())
