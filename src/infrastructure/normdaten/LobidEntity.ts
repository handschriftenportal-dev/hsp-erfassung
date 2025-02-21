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

import {
  GNDEntityFact,
  Identifier,
  VariantName,
} from '../../domain/erfassung/GNDEntityFact'

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

type Label = { id: string; label: string }

function concatLabel(data: string | Label | (Label | string)[]): string {
  if (Array.isArray(data)) {
    return data
      .map((x: any) => (typeof x === 'string' ? x : x.label))
      .join(', ')
  } else if (typeof data === 'string') {
    return data
  } else if (data.label !== undefined) {
    return data.label
  }
  throw new Error('Type-Error: Expected string | Label | (Label | string)[]', {
    cause: data,
  })
}

function subtitle(data: any) {
  const {
    professionOrOccupation: a,
    biographicalOrHistoricalInformation: b,
    gndSubjectCategory: c,
    succeedingPlaceOrGeographicName: d,
    hierarchicalSuperiorOfTheCorporateBody: e,
    describedBy: { descriptionLevel: f },
    geographicAreaCode: g,
    gndIdentifier,
  } = data
  const source = a ?? b ?? c ?? d ?? e ?? f ?? g
  return `${gndIdentifier}, ${concatLabel(source)}`
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
  const { label, personalName, nameAddition, forename, surname } = entity as any
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

function variantName(data: any): VariantName[] {
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

function variant(data: any): VariantName[] {
  const { variantName: a, variantNameEntityForThePerson: b } = data
  return variantName(a ?? b)
}

type SameAsEntry = {
  id: string
  collection: {
    id: string
    abbr?: string
  }
}

function identifier(data: any): Identifier[] {
  if (!Array.isArray(data.sameAs)) {
    return []
  }
  return data.sameAs.map((entry: SameAsEntry): Identifier => {
    return {
      type: entry.collection.abbr ?? entry.collection.id,
      text: entry.id,
    }
  })
}

function depiction(data: any): { depiction?: string } {
  const result: any = {}
  const { depiction } = data

  if (Array.isArray(depiction) && depiction[0]) {
    result.depiction = depiction[0].thumbail ?? depiction[0].id
  }
  return result
}

function extractLabels(data: any, keys: string[]): [string, string[]][] {
  return keys.reduce((collection: any, key) => {
    const item = data[key]
    if (Array.isArray(item)) {
      collection.push([key, item.map(entityToString)] as [string, string[]])
    } else if (item) {
      collection.push([key, [entityToString(item)]])
    }
    return collection
  }, [])
}

function details(data: any): [string, string[]][] {
  return extractLabels(data, [
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

const fromLobidService = (item: unknown): LobidEntity => {
  const { preferredName, gndIdentifier, type } = item as any
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
