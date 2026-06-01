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
