import { GraphQLQueries } from 'src/infrastructure/normdaten/GraphQLQueries'

describe('GraphQLQueries', () => {
  it('has query to findGNDEntitiyFacts', () => {
    expect(GraphQLQueries).toHaveProperty('findGNDEntityFacts')
  })
  it('has query to findGNDEntitiesByIds', () => {
    expect(GraphQLQueries).toHaveProperty('findGNDEntitiesByIds')
  })
  it('has query to findGNDEntitiesByNode', () => {
    expect(GraphQLQueries).toHaveProperty('findGNDEntitiesByNode')
  })
  it('has query to findGNDEntitiesByNodeWithVariantName', () => {
    expect(GraphQLQueries).toHaveProperty(
      'findGNDEntitiesByNodeWithVariantName'
    )
  })
  it('has query to findLanguageByIDQuery', () => {
    expect(GraphQLQueries).toHaveProperty('findLanguageByIDQuery')
  })
  it('has query to findSubjectArea', () => {
    expect(GraphQLQueries).toHaveProperty('findSubjectArea')
  })
  it('has query to createGNDEntity', () => {
    expect(GraphQLQueries).toHaveProperty('createGNDEntity')
  })
  it('has query to createInitium', () => {
    expect(GraphQLQueries).toHaveProperty('createInitium')
  })
})
