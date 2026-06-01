import { cloneDeep } from 'lodash'
import { Analyser } from 'skripte/utility/Analyser'
import { AnalyserReport } from 'skripte/utility/AnalyserReport'

// Somehow jestdom doesn't use structuredClone from node
global.structuredClone = cloneDeep

describe('Analyser', () => {
  it('without report and tree creates empty node', () => {
    expect(
      Analyser.createAnalyser(
        { text: '' },
        'identifier',
        AnalyserReport.empty()
      )
    ).toMatchObject({
      parsing_errors: {},
      codepoints: {},
      unknown_entities: {},
    })
  })
})
