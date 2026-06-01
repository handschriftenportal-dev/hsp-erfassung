import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { FC, PropsWithChildren } from 'react'
import { ThesaurusAuswahl } from 'src/domain/editor/normdaten/ThesaurusAuswahl'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import { ThemenbereichService } from 'src/infrastructure/normdaten/ThemenbereichService'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('ThesaurusAuswahl', () => {
  const thesaurus = 'BNDG-A'
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)

  const TestSetup: FC<PropsWithChildren> = ({ children }) => {
    return (
      <TestContext>
        <ThemenbereichService api={api}>{children}</ThemenbereichService>
      </TestContext>
    )
  }

  describe('einfach Auswahl', () => {
    const auswahl = 'NORM-1727e64f-d87c-34a8-a07c-ae1d6d569d71'

    it('renders combobox', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      expect(screen.getByRole('combobox')).toBeVisible()
    })

    it('can be disabled', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl disabled auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders empty auswahl', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl thesaurus={thesaurus} />
        </TestSetup>
      )
      expect(screen.getByRole('combobox')).toBeVisible()
    })

    it('renders label', () => {
      render(
        <TestSetup>
          <label id={'hello_world'}>Marker</label>
          <ThesaurusAuswahl
            auswahl={auswahl}
            thesaurus={thesaurus}
            aria-labelledby={'hello_world'}
          />
        </TestSetup>
      )
      expect(screen.getByLabelText('Marker')).toBeVisible()
    })

    it('renders label of selected Begriff', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriff = api.begriff({ id: auswahl })!
      expect(screen.getByRole('combobox')).toHaveValue(begriff.label)
    })

    it('can handle array of input, filters first valid key', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl
            auswahl={['other_id', auswahl]}
            thesaurus={thesaurus}
          />
        </TestSetup>
      )
      const begriff = api.begriff({ id: auswahl })!
      expect(screen.getByRole('combobox')).toHaveValue(begriff.label)
    })

    it('shows all begriffe of thesaurus in list', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      await userEvent.click(
        screen.getByRole('button', { name: de.autocomplete.open_text })
      )

      const ids = api.thesaurus({ notation: thesaurus })!.begriffe
      ids.forEach((id) => {
        const begriff = api.begriff({ id })!
        expect(
          screen.getByRole('option', {
            name: `${begriff.label} ${begriff.identifier.notation}`,
          })
        ).toBeVisible()
      })
    })

    it('selecting a begriff will trigger onChange with whole selection', async () => {
      const changeHandler = jest.fn()
      render(
        <TestSetup>
          <ThesaurusAuswahl
            auswahl={auswahl}
            onChange={changeHandler}
            thesaurus={thesaurus}
          />
        </TestSetup>
      )
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.click(
        screen.getByRole('button', { name: de.autocomplete.open_text })
      )
      await userEvent.click(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      )

      expect(changeHandler).toHaveBeenCalledWith(begriff)
    })

    it('searching with label will filter options', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.type(
        screen.getByRole('combobox'),
        begriff.label.substring(0, 10)
      )

      expect(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      ).toBeVisible()
    })

    it('searching with notation will filter options', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.type(screen.getByRole('combobox'), 'BNDG-A239')

      expect(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      ).toBeVisible()
    })
  })

  describe('mehrfach Auswahl', () => {
    const auswahl = [
      'NORM-1727e64f-d87c-34a8-a07c-ae1d6d569d71',
      'NORM-821ba04d-895d-3e45-970b-3a93d5a7ab7f',
    ]

    it('renders combobox', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl multiple auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      expect(screen.getByRole('combobox')).toBeVisible()
    })

    it('can be disabled', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl
            disabled
            multiple
            auswahl={auswahl}
            thesaurus={thesaurus}
          />
        </TestSetup>
      )
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders label', () => {
      render(
        <TestSetup>
          <label id={'hello_world'}>Marker</label>
          <ThesaurusAuswahl
            multiple
            auswahl={auswahl}
            thesaurus={thesaurus}
            aria-labelledby={'hello_world'}
          />
        </TestSetup>
      )
      expect(screen.getByLabelText('Marker')).toBeVisible()
    })

    it('shows label of selection', () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl multiple auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriffe = auswahl.map((id) => api.begriff({ id })!)
      begriffe.forEach((begriff) => {
        expect(
          screen.getByRole('button', { name: begriff.label })
        ).toBeVisible()
      })
    })

    it('can remove selection by click', async () => {
      const changeHandler = jest.fn()
      render(
        <TestSetup>
          <ThesaurusAuswahl
            multiple
            auswahl={auswahl}
            onChange={changeHandler}
            thesaurus={thesaurus}
          />
        </TestSetup>
      )
      const [begriff1, begriff2] = auswahl.map((id) => api.begriff({ id })!)
      const cancelIcon = within(
        screen.getByRole('button', { name: begriff1.label })
      ).getByTestId('CancelIcon')

      await userEvent.click(cancelIcon)
      expect(changeHandler).toHaveBeenCalledWith([begriff2])
    })

    it('shows all begriffe of thesaurus in list', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl multiple auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      await userEvent.click(
        screen.getByRole('button', { name: de.autocomplete.open_text })
      )

      const ids = api.thesaurus({ notation: thesaurus })!.begriffe
      ids.forEach((id) => {
        const begriff = api.begriff({ id })!
        expect(
          screen.getByRole('option', {
            name: `${begriff.label} ${begriff.identifier.notation}`,
          })
        ).toBeVisible()
      })
    })

    it('selecting a begriff will trigger onChange with whole selection', async () => {
      const changeHandler = jest.fn()
      render(
        <TestSetup>
          <ThesaurusAuswahl
            multiple
            auswahl={auswahl}
            onChange={changeHandler}
            thesaurus={thesaurus}
          />
        </TestSetup>
      )
      const ausgewaehlteBegriffe = auswahl.map((id) => api.begriff({ id })!)
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.click(
        screen.getByRole('button', { name: de.autocomplete.open_text })
      )
      await userEvent.click(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      )

      expect(changeHandler).toHaveBeenCalledWith([
        ...ausgewaehlteBegriffe,
        begriff,
      ])
    })

    it('searching with label will filter options', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl multiple auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.type(
        screen.getByRole('combobox'),
        begriff.label.substring(0, 10)
      )

      expect(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      ).toBeVisible()
    })

    it('searching with notation will filter options', async () => {
      render(
        <TestSetup>
          <ThesaurusAuswahl multiple auswahl={auswahl} thesaurus={thesaurus} />
        </TestSetup>
      )
      const begriff = api.begriff({ notation: 'BNDG-A239' })!

      await userEvent.type(screen.getByRole('combobox'), 'BNDG-A239')

      expect(
        screen.getByRole('option', {
          name: `${begriff.label} ${begriff.identifier.notation}`,
        })
      ).toBeVisible()
    })
  })
})
