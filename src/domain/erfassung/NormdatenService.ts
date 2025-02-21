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

import { APICall } from '../../infrastructure/normdaten/APICall'
import { GNDEntityFact } from './GNDEntityFact'
import { SubjectArea } from './SubjectArea'

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

  findGNDEntity: (
    nodeLabel: NodeLabel,
    searchTerm?: string
  ) => Promise<APICall<GNDEntityFact[]>>

  putGNDEntity: (
    entity: Partial<GNDEntityFact>
  ) => Promise<APICall<GNDEntityFact>>
}
