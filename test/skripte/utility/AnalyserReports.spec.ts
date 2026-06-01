import { AnalyserReport } from 'skripte/utility/AnalyserReport'

describe('AnalyserReport', () => {
  it('can create empty report', () => {
    expect(AnalyserReport.empty()).toMatchObject({
      codepoints: {},
      unknown_entities: {},
      parsing_errors: {},
    })
  })

  it('can add codepoint by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addCodepoint(report, 1)
    AnalyserReport.addCodepoint(report, 2)
    AnalyserReport.addCodepoint(report, 1)
    expect(report).toMatchObject({
      codepoints: {
        1: 2,
        2: 1,
      },
    })
  })

  it('can add unknown entities by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addUnknownEntity(report, 'x', 'a')
    AnalyserReport.addUnknownEntity(report, 'y', 'a')
    AnalyserReport.addUnknownEntity(report, 'x', 'a')
    AnalyserReport.addUnknownEntity(report, 'x', 'b')
    expect(report).toMatchObject({
      unknown_entities: {
        x: {
          a: 2,
          b: 1,
        },
        y: {
          a: 1,
        },
      },
    })
  })

  it('can add errors by mutating report', () => {
    const report = AnalyserReport.empty()
    AnalyserReport.addParsingError(report, 'x', 'a')
    AnalyserReport.addParsingError(report, 'y', 'a')
    AnalyserReport.addParsingError(report, 'x', 'a')
    AnalyserReport.addParsingError(report, 'x', 'b')
    expect(report).toMatchObject({
      parsing_errors: {
        x: {
          a: 2,
          b: 1,
        },
        y: {
          a: 1,
        },
      },
    })
  })
})
