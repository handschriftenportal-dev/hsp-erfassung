import { render, screen } from '@testing-library/react'
import { ResolveDuplicateInitiumBody } from 'src/domain/editor/dialoge/initiumAnlegenDialog/ResolveDuplicateInitiumBody'
import de from 'src/infrastructure/i18n/translation_de.json'
import initien from 'test/infrastructure/normdaten/fixtures/initien.json'
import { TestContext } from 'test/TestContext'

describe('ResolveDuplicateInitiumBody', () => {
  const {
    cancel_action,
    back_action,
    create_action,
    resolve_duplicates_create_new_initium_text,
    resolve_duplicates_text_other,
    resolve_duplicates_use_existing_initium_text,
  } = de.initium_anlegen_dialog
  const duplicates = initien.data.findInitia.items.slice(0, 3)
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
      type: 'resolving_duplicates' as const,
      unknownLanguage,
      text: 'Alea iacta est',
      languages: [unknownLanguage],
      duplicates,
    }
    render(
      <TestContext>
        <ResolveDuplicateInitiumBody state={state} dispatch={jest.fn()} />
      </TestContext>
    )
  })

  it('renders cancel button', () => {
    expect(screen.getByRole('button', { name: cancel_action })).toBeVisible()
  })

  it('renders back button', () => {
    expect(screen.getByRole('button', { name: back_action })).toBeVisible()
  })

  it('renders create button', () => {
    expect(screen.getByRole('button', { name: create_action })).toBeVisible()
  })

  it('renders radio buttons for duplicated and new initium', () => {
    expect(screen.getAllByRole('radio')).toHaveLength(duplicates.length + 1)
  })

  it('renders explanation texts', () => {
    expect(screen.getByText(resolve_duplicates_text_other)).toBeVisible()
    expect(
      screen.getByText(resolve_duplicates_use_existing_initium_text)
    ).toBeVisible()
    expect(
      screen.getByText(resolve_duplicates_create_new_initium_text)
    ).toBeVisible()
  })
})
