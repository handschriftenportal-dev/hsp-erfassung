import type { VolltextSemantik } from 'src/domain/erfassung/VolltextSemantik'
import { APICall } from 'src/infrastructure/normdaten/APICall'
import { Notationen } from 'src/infrastructure/normdaten/Notationen'

import type { NormdatenService } from './NormdatenService'
import type { Normdatum } from './Normdatum'
import type {
  SubjectArea,
  SubjectAreaThesaurus,
  SubjectAreaThesaurusConcept,
} from './SubjectArea'
import { TranslatedText } from './TranslatedText'

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

type Menge = {
  id: string
  elemente: readonly string[]
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
  notwendigeBegriffe: readonly string[]
  optionaleBegriffe: readonly string[]
  einzelAuswahlBegriffMengen: readonly Menge[]
  mehrfachAuswahlBegriffMengen: readonly Menge[]
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

function bagToMenge(
  bag: SubjectAreaThesaurusConcept['hasOneKeyFeatureFrom'][number]
): Menge {
  const { id, members: elemente } = bag
  return { id, elemente }
}

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
        notwendigeBegriffe: concept.hasKeyFeature,
        optionaleBegriffe: concept.hasAdditionalFeature,
        einzelAuswahlBegriffMengen:
          concept.hasOneKeyFeatureFrom.map(bagToMenge),
        mehrfachAuswahlBegriffMengen:
          concept.hasSomeKeyFeaturesFrom.map(bagToMenge),
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

  function sortThesauri(a: Identifier, b: Identifier): number {
    return b.notation.localeCompare(a.notation)
  }

  function walkThesaurus(themenbereich: string, callback: Callback) {
    return (thesaurus: SubjectAreaThesaurus): Identifier => {
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
      return identifier
    }
  }

  const identifier = createIdentifier(subjectArea)
  const label = TranslatedText.forLanguage(subjectArea.labels, language)
  const thesauri = subjectArea.thesauri
    .map(walkThesaurus(identifier.id, callback))
    .sort(sortThesauri)
    .map(({ id }) => id)

  callback({
    identifier,
    thesauri,
    label,
  })
  return identifier
}

type Lookup = {
  id: Record<string, Themenbereich | Thesaurus | Begriff>
  uri: Record<string, Themenbereich | Thesaurus | Begriff>
  notation: Record<string, Themenbereich | Thesaurus | Begriff>
}

export const ThemenbereichNotationen: Partial<
  Readonly<Record<VolltextSemantik, string>>
> = Notationen.themenbereich

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

export type Leveled<T> = {
  level: number
  item: T
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

    function universalLookup<T>(identifier: PartialIdentifier): T {
      if ('id' in identifier) {
        return lookup.id[identifier.id] as T
      } else if ('uri' in identifier) {
        return lookup.uri[identifier.uri] as T
      } else if ('notation' in identifier) {
        return lookup.notation[identifier.notation] as T
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
      themenbereich: universalLookup<Themenbereich>,
      thesaurus: universalLookup<Thesaurus>,
      begriff: universalLookup<Begriff>,
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
  thesaurusToList(
    api: ThemenbereicheAPI,
    notation: string
  ): Leveled<Begriff>[] | undefined {
    const result: Leveled<Begriff>[] = []

    function walkUnterbegriffe(
      unterbegriffe: readonly string[],
      level: number
    ): void {
      unterbegriffe.forEach((id) => {
        const item = api.begriff({ id })
        if (!item) {
          return
        }
        result.push({
          level,
          item,
        })
        walkUnterbegriffe(item.unterBegriffe, level + 1)
      })
    }

    const thesaurus = api.thesaurus({ notation })
    if (!thesaurus) {
      return undefined
    }
    walkUnterbegriffe(thesaurus.unterBegriffe, 0)
    return result
  },
  guards: Object.freeze({
    isThemenbereich,
    isThesaurus,
    isBegriff,
  }),
})
