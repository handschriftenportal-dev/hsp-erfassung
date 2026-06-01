import { render, screen } from '@testing-library/react'
import { EnterInitiumBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/EnterInitiumBody'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('EnterInitiumBody', () => {
  const { initium_text, initium_language } = de.initium_anlegen_dialog
  beforeEach(() => {
    const unknownLanguage = {
      id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
      gndIdentifier: null,
      preferredName: 'unbekannt',
      typeName: 'Language',
      identifier: [],
      variantName: [],
    }
    const state = {
      type: 'entering_initium' as const,
      unknownLanguage,
      text: 'Alea iacta est',
      languages: [unknownLanguage],
    }
    render(
      <TestContext>
        <EnterInitiumBody state={state} dispatch={jest.fn()} />
      </TestContext>
    )
  })

  it('enterInitium state renders textbox for the text', () => {
    expect(
      screen.getByRole('textbox', {
        name: initium_text,
      })
    ).toBeVisible()
  })

  it('enterInitium state renders select field for languages', () => {
    expect(
      screen.getByRole('combobox', {
        name: initium_language,
      })
    ).toBeVisible()
  })
})
