import { render, screen } from '@testing-library/react'
import { ConfirmUnknownLanguageBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/ConfirmUnknownLanguageBody'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('ConfirmUnknownLanguageBody', () => {
  const {
    back_action,
    cancel_action,
    confirm_action,
    confirm_unknown_language,
  } = de.initium_anlegen_dialog
  beforeEach(() => {
    const state = {
      type: 'confirming_unknown_language' as const,
      languages: [],
      text: 'lorem ipsum',
      unknownLanguage: {
        id: 'NORM-5108c216-2963-3009-9d28-956c37fe60d1',
        gndIdentifier: null,
        preferredName: 'unbekannt',
        typeName: 'Language',
        identifier: [],
        variantName: [],
      },
    }
    render(
      <TestContext>
        <ConfirmUnknownLanguageBody state={state} dispatch={jest.fn()} />
      </TestContext>
    )
  })

  it('renders back button', () => {
    expect(screen.getByRole('button', { name: back_action })).toBeVisible()
  })
  it('renders cancel button', () => {
    expect(screen.getByRole('button', { name: cancel_action })).toBeVisible()
  })
  it('renders confirm button', () => {
    expect(screen.getByRole('button', { name: confirm_action })).toBeVisible()
  })
  it('renders confirm text', () => {
    expect(screen.getByText(confirm_unknown_language)).toBeVisible()
  })
})
