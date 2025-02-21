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

import { GNDEntityFact } from '../../../src/domain/erfassung/GNDEntityFact'
import { NodeLabel } from '../../../src/domain/erfassung/NormdatenService'
import { createSBBNormdatenServiceAdapter } from '../../../src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { MockNormdatenService } from './MockNormdatenService'

describe('SBBNormdatenServiceAdapter', () => {
  describe('configuration', () => {
    const normdatenService = createSBBNormdatenServiceAdapter()
    it('can be updated with empty object', () => {
      expect(() => normdatenService.updateConfiguration({})).not.toThrow()
    })

    it('can set new url', () => {
      expect(() =>
        normdatenService.updateConfiguration({ normdatenUrl: 'normdatenUrl' })
      ).not.toThrow()
    })
  })

  describe('queries', () => {
    /* To test against the normdatenservice directly
     * to ensure that it conforms to the editors expectations,
     * comment out the next 4 lines
     */
    const service = MockNormdatenService()
    beforeAll(() => service.listen())
    afterEach(() => service.resetHandlers())
    afterAll(() => service.close())

    const normdatenService = createSBBNormdatenServiceAdapter()
    normdatenService.updateConfiguration({
      normdatenUrl:
        'http://normdaten.staatsbibliothek-berlin.de:9299/rest/graphql',
    })

    it('fetchEntityById with unknown id resolves to not found', async () => {
      const result = await normdatenService.fetchEntityById(
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      )
      expect(result.status).toEqual('not_found')
    })

    it('fetchEntityById with valid id of resolves to valid entity fact', async () => {
      const result: any = await normdatenService.fetchEntityById('118575449')
      expect(result.status).toEqual('success')
      expect(result.value).toMatchObject({
        gndIdentifier: '118575449',
        preferredName: 'Luther, Martin',
      })
    })

    it('fetchEntitiesByIds with unknown id resolves to empty array', async () => {
      const result: any = await normdatenService.fetchEntitiesByIds([
        'YYYYYYYYYYYYYYYYYYYYYYYYYY',
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ])
      expect(result.status).toEqual('success')
      expect(result.value).toEqual([])
    })

    it('fetchEntitiesByIds with valid ids resolves to multiple results containing the ids', async () => {
      const ids = ['118575449', '1228671265']
      const result: any = await normdatenService.fetchEntitiesByIds(ids)
      expect(result.status).toEqual('success')
      expect(result.value).toHaveLength(2)
      ids.forEach((id) => {
        expect(
          result.value.find(({ gndIdentifier }: any) => gndIdentifier === id)
        ).toMatchObject({
          gndIdentifier: id,
          typeName: 'Person',
        })
      })
    })

    it('fetchLanguageById with valid id', async () => {
      const result: any = await normdatenService.fetchLanguageById('de')
      expect(result.status).toEqual('success')
      expect(result.value).toMatchObject({
        preferredName: 'deutsch',
        gndIdentifier: '4113292-0',
        typeName: 'Language',
      })
    })

    it('fetchLanguageById with invalid id', async () => {
      const result: any = await normdatenService.fetchLanguageById(
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      )
      expect(result.status).toEqual('not_found')
    })

    it.each(['person', 'ort', 'koerperschaft', 'sprache'] as const)(
      'findGNDEntity nodeLabel "%s" and without searchTerm finds results',
      async (nodeLabel) => {
        const result: any = await normdatenService.findGNDEntity(nodeLabel)
        expect(result.status).toEqual('success')
        expect(result.value).not.toHaveLength(0)
      }
    )

    const testCases: [NodeLabel, string, string][] = [
      ['person', 'Giel, Robert', 'Person'],
      ['person', '1228671265', 'Person'],
      ['ort', 'Berlin', 'Place'],
      ['ort', '4005728-8', 'Place'],
      ['koerperschaft', 'Staatsbibliothek zu Berlin', 'CorporateBody'],
      ['koerperschaft', '5036103-X', 'CorporateBody'],
      ['sprache', 'Deutsch', 'Language'],
      ['sprache', '4113292-0', 'Language'],
    ]
    it.each(testCases)(
      'findGNDEntity with nodeLabel "%s" and searchTerm "%s" finds results',
      async (nodeLabel, searchTerm, typeName) => {
        const result: any = await normdatenService.findGNDEntity(
          nodeLabel,
          searchTerm
        )
        expect(result.status).toEqual('success')
        expect(result.value).not.toHaveLength(0)
        result.value.forEach((entityFact: GNDEntityFact) =>
          expect(entityFact).toMatchObject({ typeName })
        )
      }
    )

    it('findSubjectArea returns non-null subjectArea for "BNDG"', async () => {
      const result = await normdatenService.findSubjectArea('BNDG')
      const { status, value } = result as any
      expect(status).toEqual('success')
      expect(value).not.toBeNull()
    })

    it('findSubjectArea returns failure for subjectArea "INVALID"', async () => {
      const result = await normdatenService.findSubjectArea('INVALID')
      expect(result.status).toEqual('not_found')
    })
  })

  describe('mutations', () => {
    /* Don't comment out these four lines, as you don't want to test mutation
     * against the production server
     */
    const service = MockNormdatenService()

    const normdatenService = createSBBNormdatenServiceAdapter()
    beforeEach(() =>
      normdatenService.updateConfiguration({
        normdatenUrl:
          'http://normdaten.staatsbibliothek-berlin.de:9299/rest/graphql',
        authorizationToken: '123',
      })
    )
    beforeAll(() => service.listen())
    afterEach(() => {
      service.resetHandlers()
    })
    afterAll(() => service.close())

    const entity: GNDEntityFact = {
      id: 'NORM-00000000-0000-0000-0000-000000000000',
      gndIdentifier: '000000000',
      preferredName: 'Max Mustermann',
      variantName: null,
      identifier: null,
      typeName: 'Person',
    }

    it("new service doesn't include entity", async () => {
      const result = await normdatenService.fetchEntityById(
        entity.gndIdentifier
      )
      expect(result.status).toEqual('not_found')
    })

    it('creating entity returns entity', async () => {
      const result = await normdatenService.putGNDEntity(entity)
      expect(result).toMatchObject({
        status: 'success',
        value: entity,
      })
    })

    it('find entity after mutation', async () => {
      const result = await normdatenService.fetchEntityById(
        entity.gndIdentifier
      )
      expect(result).toMatchObject({
        status: 'success',
        value: entity,
      })
    })

    it('mutation failes without authorization token', async () => {
      normdatenService.updateConfiguration({ authorizationToken: '' })
      const result = await normdatenService.putGNDEntity(entity)
      expect(result).toMatchObject({
        status: 'failed',
        reason: 'No authorization token supplied',
      })
    })
  })
})
