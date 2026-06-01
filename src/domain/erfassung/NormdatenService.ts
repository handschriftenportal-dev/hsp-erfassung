import type { Initium } from 'src/domain/erfassung/Initium'
import type { APICall } from 'src/infrastructure/normdaten/APICall'

import type { GNDEntityFact } from './GNDEntityFact'
import type { SubjectArea } from './SubjectArea'

export interface NormdatenServiceConfig {
  normdatenUrl: string
  authorizationToken: string
}

export type NodeLabel = 'person' | 'ort' | 'sprache' | 'koerperschaft'

export interface NormdatenService {
  updateConfiguration: (config: Partial<NormdatenServiceConfig>) => void

  fetchEntityById: (id: string) => Promise<APICall<GNDEntityFact>>
  fetchEntitiesByIds: (ids: string[]) => Promise<APICall<GNDEntityFact[]>>
  fetchLanguageById: (id: string) => Promise<APICall<GNDEntityFact>>

  findSubjectArea: (notation: string) => Promise<APICall<SubjectArea>>

  findInitiumByText: (
    text: string,
    signal?: AbortSignal
  ) => Promise<APICall<Initium[], { error: string; cause: unknown }>>
  findInitiumById: (
    id: string,
    signal?: AbortSignal
  ) => Promise<APICall<Initium, { error: string; cause: unknown }>>

  findGNDEntity: (
    nodeLabel: NodeLabel,
    searchTerm?: string
  ) => Promise<APICall<GNDEntityFact[]>>

  putGNDEntity: (
    entity: Partial<GNDEntityFact>
  ) => Promise<APICall<GNDEntityFact>>

  putInitium: (
    text: string,
    languages: string[],
    signal?: AbortSignal
  ) => Promise<APICall<Initium, { error: string; cause: unknown }>>
}

const nodeLabel = {
  person: 'person',
  ort: 'ort',
  sprache: 'sprache',
  koerperschaft: 'koerperschaft',
} as const

export const NormdatenService = Object.freeze({
  nodeLabel,
})
