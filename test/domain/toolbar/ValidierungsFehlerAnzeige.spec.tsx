import { render, screen } from '@testing-library/react'
import { updateValidationState } from 'src/domain/erfassung/ErfassungsState'
import { ValidierungsFehlerAnzeige } from 'src/domain/toolbar/ValidierungsFehlerAnzeige'
import de from 'src/infrastructure/i18n/translation_de.json'
import { configureTestStore, TestContext } from 'test/TestContext'

describe('Validierungs Fehler Anzeige', () => {
  test('renders list', () => {
    render(
      <TestContext>
        <ValidierungsFehlerAnzeige />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  test('shows validations errors as button', () => {
    const store = configureTestStore()
    const validationState = [
      {
        id: '1',
        error: 'error 1',
        path: [0],
        diagnostics: {
          de: 'Fehler 1',
        },
      },
    ]
    store.dispatch(updateValidationState(validationState))
    render(
      <TestContext store={store}>
        <ValidierungsFehlerAnzeige />
      </TestContext>
    )
    expect(screen.getByRole('button', { name: 'Fehler 1' })).toBeVisible()
  })

  test('translates the error with fallbacks', () => {
    const store = configureTestStore()
    const validationState = [
      {
        id: '1',
        error: 'error 1',
        path: [0],
        diagnostics: {
          de: 'Fehler 1',
          en: 'Error 1',
        },
      },
      {
        id: '2',
        error: 'error 2',
        path: [1],
        diagnostics: {
          de: 'Fehler 2',
        },
      },
      {
        id: '3',
        error: 'error 3',
        path: [2],
        diagnostics: {
          en: 'Error 3',
        },
      },
      {
        id: '4',
        error: 'error 4',
        path: [3],
        diagnostics: {},
      },
      {
        id: '5',
        error: '',
        path: [4],
        diagnostics: {},
      },
    ]
    store.dispatch(updateValidationState(validationState))
    render(
      <TestContext store={store}>
        <ValidierungsFehlerAnzeige />
      </TestContext>
    )
    expect(screen.getByRole('button', { name: 'Fehler 1' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Fehler 2' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Error 3' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'error 4' })).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: de.toolbar.validation_error_view.missing_diagnostic_text,
      })
    ).toBeVisible()
  })
})
