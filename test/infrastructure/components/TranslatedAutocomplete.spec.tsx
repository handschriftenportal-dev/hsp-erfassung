import { TextField } from '@mui/material'
import { render, screen } from '@testing-library/react'
import { TranslatedAutocomplete } from 'src/infrastructure/components/TranslatedAutocomplete'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('TranslatedAutocomplete', () => {
  it('translates open button by default', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          renderInput={(params) => <TextField {...params} />}
          options={[]}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.autocomplete.open_text })
    ).toBeVisible()
  })

  it('can overwrite default open value', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          renderInput={(params) => <TextField {...params} />}
          options={[]}
          openText={'MARKER'}
        />
      </TestContext>
    )
    expect(screen.getByRole('button', { name: 'MARKER' })).toBeVisible()
  })

  it('translates close button by default', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          open
          renderInput={(params) => <TextField {...params} />}
          options={[]}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.autocomplete.close_text })
    ).toBeVisible()
  })

  it('can overwrite default close default', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          open
          renderInput={(params) => <TextField {...params} />}
          options={[]}
          closeText={'MARKER'}
        />
      </TestContext>
    )
    expect(screen.getByRole('button', { name: 'MARKER' })).toBeVisible()
  })

  it('translates no option text by default', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          open
          renderInput={(params) => <TextField {...params} />}
          options={[]}
        />
      </TestContext>
    )
    expect(screen.getByText(de.autocomplete.no_option)).toBeVisible()
  })

  it('can overwrite default no option value', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          open
          renderInput={(params) => <TextField {...params} />}
          options={[]}
          noOptionsText={'MARKER'}
        />
      </TestContext>
    )
    expect(screen.getByText('MARKER')).toBeVisible()
  })

  it('translates clear text by default', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          renderInput={(params) => <TextField {...params} />}
          options={['hallo', 'welt']}
          value={'hallo'}
        />
      </TestContext>
    )
    expect(screen.getByTitle(de.autocomplete.clear_text)).toBeTruthy()
  })

  it('can overwrite default clear text', () => {
    render(
      <TestContext>
        <TranslatedAutocomplete
          renderInput={(params) => <TextField {...params} />}
          options={['hallo', 'welt']}
          value={'hallo'}
          clearText={'MARKER'}
        />
      </TestContext>
    )
    expect(screen.getByTitle('MARKER')).toBeTruthy()
  })
})
