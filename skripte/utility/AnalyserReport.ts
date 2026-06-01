export type AnalyserReport = {
  codepoints: Record<string, number>
  unknown_entities: Record<string, Record<string, number>>
  parsing_errors: Record<string, Record<string, number>>
}

export const AnalyserReport = {
  empty(): AnalyserReport {
    return {
      codepoints: {},
      unknown_entities: {},
      parsing_errors: {},
    }
  },
  addCodepoint(report: AnalyserReport, codepoint: number): void {
    if (codepoint in report.codepoints) {
      report.codepoints[codepoint] += 1
    } else {
      report.codepoints[codepoint] = 1
    }
  },
  addUnknownEntity(report: AnalyserReport, entity: string, identifier: string) {
    if (entity in report.unknown_entities) {
      if (identifier in report.unknown_entities[entity]) {
        report.unknown_entities[entity][identifier] += 1
      } else {
        report.unknown_entities[entity][identifier] = 1
      }
    } else {
      report.unknown_entities[entity] = { [identifier]: 1 }
    }
  },
  addParsingError(report: AnalyserReport, error: string, identifier: string) {
    if (error in report.parsing_errors) {
      if (identifier in report.parsing_errors[error]) {
        report.parsing_errors[error][identifier] += 1
      } else {
        report.parsing_errors[error][identifier] = 1
      }
    } else {
      report.parsing_errors[error] = { [identifier]: 1 }
    }
  },
}
