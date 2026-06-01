import type { TranslatedText } from './TranslatedText'

type Identifier = {
  id: string
  notation: string
  uri: string
  labels: TranslatedText
}

type Bag = {
  id: string
  members: string[]
}

export interface SubjectAreaThesaurusConcept extends Identifier {
  definition: TranslatedText
  altLabels: TranslatedText
  topConcept: boolean
  narrower: string[]
  broader: string | null
  hasKeyFeature: string[]
  hasAdditionalFeature: string[]
  hasOneKeyFeatureFrom: Bag[]
  hasSomeKeyFeaturesFrom: Bag[]
}

export interface SubjectAreaThesaurus extends Identifier {
  concepts: SubjectAreaThesaurusConcept[]
}

export interface SubjectArea extends Identifier {
  thesauri: SubjectAreaThesaurus[]
}
