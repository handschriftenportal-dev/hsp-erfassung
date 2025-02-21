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

import { LobidEntity } from '../../../src/infrastructure/normdaten/LobidEntity'
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
        const variant: any = entity.variant
        expect(Array.isArray(variant)).toBe(true)
        variant.forEach(({ name }: any) => {
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
