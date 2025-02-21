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
import { NormdatenService } from './NormdatenService'
import { Normdatum } from './Normdatum'
import {
  SubjectArea,
  SubjectAreaThesaurus,
  SubjectAreaThesaurusConcept,
} from './SubjectArea'
import { TranslatedText } from './TranslatedText'
import { VolltextSemantik } from './VolltextSemantik'

export type Identifier = {
  id: string
  notation: string
  uri: string
}

function createIdentifier<T extends Identifier>(obj: T) {
  const { id, notation, uri } = obj
  return {
    id,
    notation,
    uri,
  }
}

type PartialIdentifier = { id: string } | { notation: string } | { uri: string }

export type Themenbereich = {
  identifier: Identifier
  label: string
  thesauri: readonly string[]
}

export type Thesaurus = {
  identifier: Identifier
  label: string
  themenbereich: string
  begriffe: readonly string[]
  unterBegriffe: readonly string[]
}

export type Begriff = {
  identifier: Identifier
  label: string
  altLabels: string[]
  definition?: string
  isRoot: boolean
  isLeaf: boolean
  themenbereich: string
  thesaurus: string
  unterBegriffe: readonly string[]
}

function isThemenbereich(x: unknown): x is Themenbereich {
  return !!x && typeof x === 'object' && 'thesauri' in x
}
function isThesaurus(x: unknown): x is Thesaurus {
  return !!x && typeof x === 'object' && 'begriffe' in x
}
function isBegriff(x: unknown): x is Begriff {
  return !!x && typeof x === 'object' && 'isRoot' in x
}

export type SearchResult = {
  thesaurus: Thesaurus
  begriffe: Begriff[]
}

export type ThemenbereicheAPI = {
  themenbereiche: () => readonly Identifier[]
  themenbereich: (identifier: PartialIdentifier) => Themenbereich | undefined
  thesaurus: (identifier: PartialIdentifier) => Thesaurus | undefined
  begriff: (identifier: PartialIdentifier) => Begriff | undefined

  addSubjectArea: (subjectArea: SubjectArea) => void
  search: (themenbereichId: string, searchTerm: string) => SearchResult[]
}

type Callback<T = Themenbereich | Thesaurus | Begriff> = (value: T) => void

function walkSubjectArea(
  subjectArea: SubjectArea,
  language: string,
  callback: Callback
): Identifier {
  function walkConcepts(
    themenbereich: string,
    thesaurus: string,
    callback: Callback<Begriff>
  ) {
    return (concept: SubjectAreaThesaurusConcept): string => {
      const identifier = createIdentifier(concept)
      const label = TranslatedText.forLanguage(concept.labels, language)
      const altLabels = TranslatedText.allForLanguage(
        concept.altLabels,
        language
      )
      const begriff: Begriff = {
        identifier,
        label,
        altLabels,
        isRoot: concept.topConcept,
        isLeaf: concept.narrower === null || concept.narrower.length === 0,
        unterBegriffe: concept.narrower ?? [],
        themenbereich,
        thesaurus,
      }
      if (concept.definition.length !== 0) {
        begriff.definition = TranslatedText.forLanguage(
          concept.definition,
          language
        )
      }
      callback(begriff)
      return identifier.id
    }
  }

  function walkThesaurus(themenbereich: string, callback: Callback) {
    return (thesaurus: SubjectAreaThesaurus): string => {
      const unterBegriffe: string[] = []
      const identifier = createIdentifier(thesaurus)
      const label = TranslatedText.forLanguage(thesaurus.labels, language)
      const begriffe = thesaurus.concepts.map(
        walkConcepts(themenbereich, identifier.id, (begriff: Begriff) => {
          if (begriff.isRoot) {
            unterBegriffe.push(begriff.identifier.id)
          }
          callback(begriff)
        })
      )
      callback({
        identifier,
        label,
        themenbereich,
        begriffe,
        unterBegriffe,
      })
      return identifier.id
    }
  }

  const identifier = createIdentifier(subjectArea)
  const label = TranslatedText.forLanguage(subjectArea.labels, language)
  const thesauri = subjectArea.thesauri.map(
    walkThesaurus(identifier.id, callback)
  )
  callback({
    identifier,
    thesauri,
    label,
  })
  return identifier
}

type Lookup = {
  id: Record<string, any>
  uri: Record<string, any>
  notation: Record<string, any>
}
export const ThemenbereichNotationen: Partial<
  Record<VolltextSemantik, string>
> = {
  einband: 'BNDG',
}

const regExpControlCharacter = /[()[\]*+.|]/g
export function simplifySearch(searchTerm: string): string {
  return searchTerm
    .replaceAll('\\', '\\\\')
    .replaceAll(regExpControlCharacter, '')
}

function searchRegExp(searchTerm: string): RegExp {
  try {
    return new RegExp(searchTerm, 'i')
  } catch (_) {
    return new RegExp(simplifySearch(searchTerm), 'i')
  }
}

export const ThemenbereicheAPI = Object.freeze({
  new(language: string): ThemenbereicheAPI {
    const lookup: Lookup = { id: {}, uri: {}, notation: {} }
    const themenbereiche: Identifier[] = []
    function addSubjectArea(subjectArea: SubjectArea): void {
      themenbereiche.push(
        walkSubjectArea(subjectArea, language, (value) => {
          const { id, uri, notation } = value.identifier
          lookup.id[id] = value
          lookup.uri[uri] = value
          lookup.notation[notation] = value
        })
      )
    }

    function universalLookup(identifier: PartialIdentifier): any {
      if ('id' in identifier) {
        return lookup.id[identifier.id]
      } else if ('uri' in identifier) {
        return lookup.uri[identifier.uri]
      } else if ('notation' in identifier) {
        return lookup.notation[identifier.notation]
      }
      throw new Error('Invalid Partial Identifier', { cause: identifier })
    }

    function createBegriffSearch(searchTerm: string) {
      const regex = searchRegExp(searchTerm)
      return function begriffSearch(begriff: Begriff): boolean {
        const {
          identifier: { notation },
          label,
          altLabels,
        } = begriff
        return (
          regex.test(notation) ||
          regex.test(label) ||
          altLabels.some((altLabel) => regex.test(altLabel))
        )
      }
    }

    function search(notation: string, searchTerm: string): SearchResult[] {
      if (searchTerm === '') {
        return []
      }
      const themenbereich = universalLookup({ notation })
      if (!isThemenbereich(themenbereich)) {
        return []
      }
      const begriffSearch = createBegriffSearch(searchTerm)
      const result: SearchResult[] = []
      themenbereich.thesauri
        .map((id) => universalLookup({ id }))
        .filter(isThesaurus)
        .forEach((thesaurus) => {
          const begriffe = thesaurus.begriffe
            .map((id) => universalLookup({ id }))
            .filter(isBegriff)
            .filter(begriffSearch)
          if (begriffe.length > 0) {
            result.push({ thesaurus, begriffe })
          }
        })

      return result
    }

    return {
      themenbereiche() {
        return themenbereiche
      },
      themenbereich: universalLookup,
      thesaurus: universalLookup,
      begriff: universalLookup,
      addSubjectArea,
      search,
    }
  },
  async loadAllThemenbereich(
    api: ThemenbereicheAPI,
    normdatenService: NormdatenService
  ): Promise<Partial<Record<Normdatum, boolean>>> {
    const entries = await Promise.all(
      Object.entries(ThemenbereichNotationen).map(async ([key, notation]) => {
        const result = await normdatenService.findSubjectArea(notation)
        if (APICall.isSuccess(result)) {
          api.addSubjectArea(result.value)
          return [key, true]
        } else {
          return [key, false]
        }
      })
    )
    return Object.fromEntries(entries)
  },
})
