import type {
  GNDEntityFact,
  Identifier,
  VariantName,
} from 'src/domain/erfassung/GNDEntityFact'

type Label = { id: string; label: string }

type SameAsEntry = {
  id: string
  collection: {
    id: string
    abbr?: string
  }
}

interface LobidItem {
  preferredName: string
  gndIdentifier: string
  type: string[]

  professionOrOccupation?: Label[]
  biographicalOrHistoricalInformation?: string[]
  gndSubjectCategory?: Label[]
  succeedingPlaceOrGeographicName?: Label[]
  hierarchicalSuperiorOfTheCorporateBody?: Label[]
  describedBy: { descriptionLevel: Label }
  geographicAreaCode?: Label[]

  variantName?: unknown
  variantNameEntityForThePerson?: unknown

  sameAs?: SameAsEntry[]
  depiction?: { thumbnail: string; id: string; url: string }[]
}

interface LobidCommon {
  preferredName: string
  gndIdentifier: string
  subtitle: string
  variant: VariantName[]
  identifier: Identifier[]
  details: [string, string[]][]
  depiction?: string
}

interface LobidPerson extends LobidCommon {
  typeName: 'Person'
}

interface LobidCorporateBody extends LobidCommon {
  typeName: 'CorporateBody'
}

interface LobidPlace extends LobidCommon {
  typeName: 'Place'
}

export type LobidEntity = LobidPerson | LobidCorporateBody | LobidPlace

const typeNameLookup: Record<string, LobidEntity['typeName']> = {
  Person: 'Person',
  CorporateBody: 'CorporateBody',
  PlaceOrGeographicName: 'Place',
}

function findTypeName(types: string[]): LobidEntity['typeName'] {
  for (const type of types) {
    if (typeNameLookup[type]) {
      return typeNameLookup[type]
    }
  }
  throw new Error('No valid type found in Lobid result', { cause: types })
}

function concatLabel(data: string | Label | (Label | string)[]): string {
  if (Array.isArray(data)) {
    return data.map((x) => (typeof x === 'string' ? x : x.label)).join(', ')
  } else if (typeof data === 'string') {
    return data
  } else if (data.label !== undefined) {
    return data.label
  }
  throw new Error('Type-Error: Expected string | Label | (Label | string)[]', {
    cause: data,
  })
}

function subtitle(item: LobidItem) {
  const {
    professionOrOccupation: a,
    biographicalOrHistoricalInformation: b,
    gndSubjectCategory: c,
    succeedingPlaceOrGeographicName: d,
    hierarchicalSuperiorOfTheCorporateBody: e,
    describedBy: {
      descriptionLevel: { label: f },
    },
    geographicAreaCode: g,
    gndIdentifier,
  } = item
  const source = a ?? b ?? c ?? d ?? e ?? f ?? g ?? ''
  return `${gndIdentifier}, ${concatLabel(source)}`
}

interface EntityWithName {
  label?: string
  personalName?: string[]
  nameAddition?: string[]
  forename?: string[]
  surname?: string[]
}

function entityToString(entity: unknown): string {
  if (typeof entity === 'string') {
    return entity
  }
  if (Array.isArray(entity)) {
    return entity.map(entityToString).join(' ')
  }
  if (typeof entity !== 'object' || !entity) {
    throw new Error('Expected Object', { cause: entity })
  }
  const { label, personalName, nameAddition, forename, surname } =
    entity as EntityWithName
  if (typeof label === 'string') {
    return label
  } else if (Array.isArray(personalName) && Array.isArray(nameAddition)) {
    return entityToString([...nameAddition, ...personalName])
  } else if (Array.isArray(personalName)) {
    return entityToString(personalName)
  } else if (Array.isArray(surname)) {
    const name = (forename ?? []).concat(surname)
    return entityToString(name)
  }
  throw new Error('Unknown entity', { cause: entity })
}

function variantName(data: unknown): VariantName[] {
  if (data === undefined) {
    return []
  }
  if (!Array.isArray(data)) {
    throw new Error('Expected array', { cause: data })
  }
  return data.map((x: unknown) => {
    return {
      languageCode: null,
      name: entityToString(x),
    }
  })
}

function variant(item: LobidItem): VariantName[] {
  const { variantName: a, variantNameEntityForThePerson: b } = item
  return variantName(a ?? b)
}

function identifier(item: LobidItem): Identifier[] {
  if (!Array.isArray(item.sameAs)) {
    return []
  }
  return item.sameAs.map((entry) => {
    return {
      type: entry.collection.abbr ?? entry.collection.id,
      text: entry.id,
    }
  })
}

function depiction(item: LobidItem): { depiction?: string } {
  const result: { depiction?: string } = {}
  const { depiction } = item

  if (Array.isArray(depiction) && depiction[0]) {
    result.depiction = depiction[0].thumbnail ?? depiction[0].id
  }
  return result
}

function extractLabels(data: LobidItem, keys: string[]): [string, string[]][] {
  return keys.reduce((collection: [string, string[]][], key) => {
    const item = data[key as keyof LobidItem]
    if (Array.isArray(item)) {
      collection.push([key, item.map(entityToString)] as [string, string[]])
    } else if (item) {
      collection.push([key, [entityToString(item)]])
    }
    return collection
  }, [])
}

function details(item: LobidItem): [string, string[]][] {
  return extractLabels(item, [
    'type',
    'biographicalOrHistoricalInformation',
    'titleOfNobility',
    'dateOfBirth',
    'placeOfBirth',
    'dateOfDeath',
    'placeOfDeathAsLiteral',
    'professionOrOccupation',
    'gender',
    'familialRelationship',
    'geographicAreaCode',
    'gndSubjectCategory',
    'affiliation',
    'placeOfBusiness',
    'succeedingCorporateBody',
    'hierarchicalSuperiorOfTheCorporateBody',
    'precedingCorporateBody',
    'broaderTermInstantial',
    'spatialAreaOfActivity',
    'publication',
  ])
}

const fromLobidService = (item: LobidItem): LobidEntity => {
  const { preferredName, gndIdentifier, type } = item
  const typeName = findTypeName(type)
  const varianten = variant(item)
  return {
    ...depiction(item),
    typeName,
    preferredName,
    gndIdentifier,
    subtitle: subtitle(item),
    variant: varianten,
    identifier: identifier(item),
    details: [...details(item), ['variant', varianten.map((v) => v.name)]],
  }
}

const toGNDEntityFact = (entity: LobidEntity): Omit<GNDEntityFact, 'id'> => {
  const { preferredName, gndIdentifier, variant, identifier, typeName } = entity
  return {
    identifier,
    gndIdentifier,
    preferredName,
    variantName: variant,
    typeName,
  }
}

export const LobidEntity = Object.freeze({
  toGNDEntityFact,
  fromLobidService,
})
