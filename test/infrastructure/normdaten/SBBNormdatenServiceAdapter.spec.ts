import type { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import type { NodeLabel } from 'src/domain/erfassung/NormdatenService'
import { createSBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { regEx } from 'test/regEx'

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
      const result = await normdatenService.fetchEntityById('118575449')
      expect(result).toMatchObject({
        status: 'success',
        value: {
          gndIdentifier: '118575449',
          preferredName: 'Luther, Martin',
        },
      })
    })

    it('fetchEntitiesByIds with unknown id resolves to empty array', async () => {
      const result = await normdatenService.fetchEntitiesByIds([
        'YYYYYYYYYYYYYYYYYYYYYYYYYY',
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZ',
      ])
      expect(result).toMatchObject({
        status: 'success',
        value: [],
      })
    })

    it('fetchEntitiesByIds with valid ids resolves to multiple results containing the ids', async () => {
      const ids = ['118575449', '1228671265']
      const result = await normdatenService.fetchEntitiesByIds(ids)
      expect(result).toMatchObject({
        status: 'success',
        value: expect.arrayContaining([
          expect.objectContaining({
            gndIdentifier: '118575449',
            typeName: 'Person',
          }),
          expect.objectContaining({
            gndIdentifier: '1228671265',
            typeName: 'Person',
          }),
        ]),
      })
    })

    it('fetchLanguageById with valid id', async () => {
      const result = await normdatenService.fetchLanguageById('de')
      expect(result).toMatchObject({
        status: 'success',
        value: {
          preferredName: 'deutsch',
          gndIdentifier: '4113292-0',
          typeName: 'Language',
        },
      })
    })

    it('fetchLanguageById with invalid id', async () => {
      const result = await normdatenService.fetchLanguageById(
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      )
      expect(result.status).toEqual('not_found')
    })

    it.each(['person', 'ort', 'koerperschaft', 'sprache'] as const)(
      'findGNDEntity nodeLabel "%s" and without searchTerm finds results',
      async (nodeLabel) => {
        const result = await normdatenService.findGNDEntity(nodeLabel)
        expect(result).toMatchObject({
          status: 'success',
          value: expect.arrayContaining([expect.anything()]),
        })
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
        const result = await normdatenService.findGNDEntity(
          nodeLabel,
          searchTerm
        )
        expect(result).toMatchObject({
          status: 'success',
          value: expect.arrayContaining([
            expect.objectContaining({ typeName }),
          ]),
        })
      }
    )

    it('findSubjectArea returns non-null subjectArea for "BNDG"', async () => {
      const result = await normdatenService.findSubjectArea('BNDG')
      expect(result).toMatchObject({
        status: 'success',
        value: expect.anything(),
      })
    })

    it('findSubjectArea returns failure for subjectArea "INVALID"', async () => {
      const result = await normdatenService.findSubjectArea('INVALID')
      expect(result.status).toEqual('not_found')
    })

    it('findInitiumByText returns array', async () => {
      const result = await normdatenService.findInitiumByText('xxx')
      expect(result).toMatchObject({
        status: 'success',
        value: expect.arrayOf(expect.anything()),
      })
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

    describe('GNDEntityFact', () => {
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
          entity.gndIdentifier!
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
          entity.gndIdentifier!
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

    describe('Initium', () => {
      const initiumText = 'LoremIpsum'
      const expected = {
        id: expect.stringMatching(regEx.isUuid),
        uri: expect.stringMatching(regEx.isUrl),
        alternativeText: [],
        languages: [],
        text: expect.stringMatching(initiumText),
      }

      it('does not contain initium before insertion', async () => {
        const result = await normdatenService.findInitiumByText(initiumText)
        expect(result).toMatchObject({
          status: 'success',
          value: [],
        })
      })

      it('creating an initium results in success', async () => {
        const result = await normdatenService.putInitium(initiumText, [])
        expect(result).toMatchObject({
          status: 'success',
          value: expected,
        })
      })

      it('does contain initium after insertion', async () => {
        const result = await normdatenService.findInitiumByText(initiumText)
        expect(result).toMatchObject({
          status: 'success',
          value: [expected],
        })
      })
    })
  })
})
