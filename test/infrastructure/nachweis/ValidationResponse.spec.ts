import { ValidationResponse } from 'src/infrastructure/nachweis/ValidationResponse'

describe('ValidationResponse', () => {
  it('diagnostics to diagnostic message', () => {
    expect(
      ValidationResponse.diagnosticsToDiagnosticMessage([
        { languageCode: 'de', message: 'Deutsch' },
        { languageCode: 'de', message: 'Duplikat' },
        { languageCode: 'en', message: 'English' },
      ])
    ).toMatchObject({
      de: 'Duplikat',
      en: 'English',
    })
  })
})
