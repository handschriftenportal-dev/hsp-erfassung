import { XMLFileAnalyser } from 'skripte/utility/XMLFileAnalyser'

describe('XMLFileAnalyser', () => {
  it('parses test-file', () => {
    const report = XMLFileAnalyser('./test/skripte/utility/fixture')
    expect(report).toMatchObject({
      codepoints: {
        101: 1,
        108: 3,
        111: 1,
        116: 1,
        72: 1,
        87: 1,
        97: 1,
        13: 1,
      },
      unknown_entities: {
        '&unknownTwo;': {
          'test.xml': 1,
        },
        '&unknown;': {
          'test.xml': 2,
        },
      },
      parsing_errors: {
        '& ': {
          'test.xml': 1,
        },
        '&invalid': {
          'test.xml': 1,
        },
      },
    })
  })
})
