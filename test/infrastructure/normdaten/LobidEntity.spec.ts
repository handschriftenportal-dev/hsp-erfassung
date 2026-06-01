import { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'

import koerperschaften from './fixtures/koerperschaften.json'
import orte from './fixtures/orte.json'
import personen from './fixtures/personen.json'

describe.each([
  ['Körperschaft', koerperschaften.member],
  ['Person', personen.member],
  ['Orte', orte.member],
])('LobidEntity', (type, member) => {
  const entities = member.map(LobidEntity.fromLobidService)
  const objectSerialization = /\[object Object]/

  describe(`for items of type ${type}`, () => {
    it(`subtitle is well formed`, () => {
      entities.forEach((entity) => {
        expect(entity.subtitle.split(',')).not.toHaveLength(1)
        expect(entity.subtitle).not.toMatch(objectSerialization)
      })
    })

    it(`transforms item from lobid to gnd entity fact`, () => {
      entities.forEach((entity) => {
        expect(LobidEntity.toGNDEntityFact(entity)).toMatchObject({
          preferredName: entity.preferredName,
          gndIdentifier: entity.gndIdentifier,
        })
      })
    })

    it(`variant names are well formed`, () => {
      entities.forEach((entity) => {
        const variant = entity.variant
        expect(Array.isArray(variant)).toBe(true)
        variant.forEach(({ name }) => {
          expect(name).not.toMatch(objectSerialization)
        })
      })
    })

    it(`have identifier`, () => {
      entities.forEach((entity) => {
        const { identifier } = entity
        expect(identifier).not.toHaveLength(0)
        identifier.forEach(({ text, type }) => {
          expect(text).toBeTruthy()
          expect(type).toBeTruthy()
          expect(text).not.toMatch(objectSerialization)
          expect(type).not.toMatch(objectSerialization)
        })
      })
    })
  })
})
