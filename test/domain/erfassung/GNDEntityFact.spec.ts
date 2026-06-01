import { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { GRUNDSPRACHE_NORMDATUM } from 'src/domain/erfassung/TEIConstants'
import type { TermElement } from 'src/infrastructure/slate/HSPElement'

describe('GNDEntityFact', () => {
  it.each([
    {},
    { id: 'id' },
    { preferredName: 'preferredName' },
    { typeName: 'language' },
  ])('can create empty entity fact from partial %p', (partial) => {
    expect(GNDEntityFact.new(partial)).toMatchObject(partial)
  })

  it('creates empty fact from term element', () => {
    const term: TermElement = {
      data_origin: 'term',
      data_type: GRUNDSPRACHE_NORMDATUM,
      data_key: 'id',
      data_ref: 'http://gnd/gndIdentifier',
      children: [{ text: 'preferredName' }],
    }
    expect(GNDEntityFact.fromTermElement(term)).toMatchObject({
      id: 'id',
      gndIdentifier: 'gndIdentifier',
      preferredName: 'preferredName',
    })
  })
})
