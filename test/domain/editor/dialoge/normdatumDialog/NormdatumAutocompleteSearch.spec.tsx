import { render, screen } from '@testing-library/react'
import { NormdatumAutocompleteSearch } from 'src/domain/editor/dialoge/normdatumDialog/NormdatumAutocompleteSearch'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

const noop = jest.fn()

describe('NormdatumAutocompleteSearch', () => {
  const baseState = {
    type: 'person',
    view: 'edit',
    status: 'search',
    search: '1234',
    text: 'xxx',
    normdatum: {
      preferredName: 'name',
      gndIdentifier: 'gndIdentifier',
    },
  } as const

  it('shows preferredName and gndIdentifier', () => {
    render(
      <TestContext>
        <NormdatumAutocompleteSearch
          afterImport={noop}
          onSearchChange={noop}
          onChange={noop}
          state={{ ...baseState, rollen: [] }}
        />
      </TestContext>
    )
    expect(screen.getByRole('combobox')).toHaveValue(
      baseState.normdatum.preferredName
    )
    expect(screen.getByText(baseState.normdatum.gndIdentifier)).toBeVisible()
  })

  it('has default label', () => {
    render(
      <TestContext>
        <NormdatumAutocompleteSearch
          afterImport={noop}
          onSearchChange={noop}
          onChange={noop}
          state={{ ...baseState, rollen: [] }}
        />
      </TestContext>
    )
    expect(
      screen.getByLabelText(de.text_tagging.referenz.dialog.normdata_link)
    ).toBeVisible()
  })

  it('accepts own label', () => {
    render(
      <TestContext>
        <NormdatumAutocompleteSearch
          afterImport={noop}
          onSearchChange={noop}
          onChange={noop}
          state={{ ...baseState, rollen: [] }}
          label="Marker"
        />
      </TestContext>
    )
    expect(screen.getByLabelText('Marker')).toBeVisible()
  })
})
