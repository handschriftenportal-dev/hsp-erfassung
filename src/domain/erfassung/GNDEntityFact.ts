import config from 'src/config.json'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import type { TermElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

export interface Identifier {
  text: string
  type: string
}
export interface VariantName {
  languageCode: string | null
  name: string
}

export interface GNDEntityFact {
  id: string
  gndIdentifier: string | null
  preferredName: string
  identifier?: Identifier[] | null
  variantName?: VariantName[] | null
  typeName?: string
}

export const GNDEntityFact = Object.freeze({
  new(prototyp: Partial<GNDEntityFact> = {}): GNDEntityFact {
    return {
      id: '',
      gndIdentifier: '',
      preferredName: '',
      typeName: '',
      ...prototyp,
    }
  },
  fromTermElement(term: TermElement): GNDEntityFact {
    const preferredName = HSPNode.extractText(term)
    const { data_key: id = '', data_ref: url } = term
    return {
      preferredName,
      id,
      gndIdentifier: url === undefined ? '' : NormdatenUtilities.urlToId(url),
    }
  },
  isUnknownLanguage(language: GNDEntityFact): boolean {
    return language.id === config.unknown_language_id
  },
})
