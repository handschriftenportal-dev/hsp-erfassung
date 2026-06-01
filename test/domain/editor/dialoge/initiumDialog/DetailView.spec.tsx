import { render, screen } from '@testing-library/react'
import { DetailView } from 'src/domain/editor/dialoge/initiumDialog/DetailView'
import type { InitiumDialogState } from 'src/domain/editor/dialoge/initiumDialog/InitiumDialogState'
import type { Initium } from 'src/domain/erfassung/Initium'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('DetailView', () => {
  const mockInitium: Initium = {
    id: 'NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
    text: 'In principio erat Verbum',
    uri: 'https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-d8a86aaf-f80f-4d5c-85f8-e6d39eeddba2',
    alternativeText: ['Alternative 1', 'Alternative 2'],
    languages: [
      {
        id: 'lang-1',
        variantName: [
          { isoCode: 'de', text: 'Latein' },
          { isoCode: 'en', text: 'Latin' },
        ],
      },
    ],
  }

  const {
    initium_dialog: {
      detail_view: {
        loading_error,
        loading_initium,
        initium_text,
        initium_alternative_text_other,
        initium_language_one,
        no_initium_selected,
        how_to_search,
      },
    },
  } = de

  describe('withInitium state', () => {
    it('renders WithInitiumDetail component', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: false,
        text: 'some text',
        initium: mockInitium,
      }

      render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(screen.getByText(initium_text)).toBeVisible()
      expect(screen.getByText(mockInitium.text)).toBeVisible()
      expect(screen.getByRole('button', { name: mockInitium.id })).toBeVisible()
    })

    it('displays initium details including alternatives and languages', () => {
      const state: InitiumDialogState = {
        status: 'withInitium',
        readOnly: false,
        text: 'some text',
        initium: mockInitium,
      }

      render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(screen.getByText(initium_alternative_text_other)).toBeVisible()
      expect(screen.getByText(initium_language_one)).toBeVisible()
      expect(screen.getByText(mockInitium.alternativeText[0])).toBeVisible()
      expect(screen.getByText(mockInitium.alternativeText[1])).toBeVisible()
      expect(screen.getByText(/Latein/)).toBeVisible()
    })
  })

  describe('withoutInitium state', () => {
    it('renders WithoutInitiumDetail component', () => {
      const state: InitiumDialogState = {
        status: 'withoutInitium',
        readOnly: false,
        text: 'some text',
      }

      render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(screen.getByText(no_initium_selected)).toBeVisible()
      expect(screen.getByText(how_to_search)).toBeVisible()
    })
  })

  describe('loadingError state', () => {
    it('renders LoadingErrorDetail component', () => {
      const state: InitiumDialogState = {
        status: 'loadingError',
        readOnly: false,
        text: 'some text',
        reason: 'Network timeout',
      }

      render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(screen.getByText(loading_error)).toBeVisible()
      expect(screen.getByText(state.reason)).toBeVisible()
    })
  })

  describe('loadingFromUri state', () => {
    it('renders LoadingFromUriDetail component', () => {
      const state: InitiumDialogState = {
        status: 'loadingFromTei',
        readOnly: false,
        text: 'some text',
        uri: 'https://example.com/initium/123',
        id: '123',
      }

      render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(screen.getByText(loading_initium)).toBeVisible()
      expect(screen.getByRole('button', { name: state.id })).toBeVisible()
    })

    it('displays loading spinner', () => {
      const state: InitiumDialogState = {
        status: 'loadingFromTei',
        readOnly: false,
        text: 'some text',
        uri: 'https://example.com/initium/123',
        id: '123',
      }

      const { container } = render(
        <TestContext>
          <DetailView state={state} />
        </TestContext>
      )

      expect(container.querySelector('.MuiCircularProgress-root')).toBeVisible()
    })
  })
})
