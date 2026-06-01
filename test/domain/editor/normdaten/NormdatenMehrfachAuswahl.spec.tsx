import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NormdatenMehrfachAuswahl } from 'src/domain/editor/normdaten/NormdatenMehrfachAuswahl'
import de from 'src/infrastructure/i18n/translation_de.json'
import { TestContext } from 'test/TestContext'

describe('NormdatenMehrfachAuswahl', () => {
  const normdaten = [
    {
      id: '0',
      preferredName: 'Null',
      gndIdentifier: '00-0000001',
    },
    {
      id: '1',
      preferredName: 'Eins',
      gndIdentifier: '00-0000001',
    },
    {
      id: '2',
      preferredName: 'Zwei',
      gndIdentifier: '00-0000002',
    },
    {
      id: '3',
      preferredName: 'Drei',
      gndIdentifier: '00-0000003',
    },
    {
      id: '4',
      preferredName: 'Vier',
      gndIdentifier: '00-0000004',
    },
    {
      id: '5',
      preferredName: 'Fünf',
      gndIdentifier: '00-0000005',
    },
  ]
  const [nulll, eins, zwei, drei, vier, fuenf] = normdaten

  const errorLog = jest.fn()
  jest.spyOn(console, 'error').mockImplementation(errorLog)

  it('renders combobox', () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl
          normdaten={normdaten}
          auswahl={[nulll, drei]}
        />
      </TestContext>
    )
    expect(screen.getByRole('combobox')).toBeVisible()
  })

  it('shows auswahl as buttons with preferredName as content', () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl
          normdaten={normdaten}
          auswahl={[eins, zwei]}
        />
      </TestContext>
    )
    expect(screen.getByRole('button', { name: 'Eins' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Zwei' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Drei' })).toBeNull()
  })

  it('does not log errors', () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl
          normdaten={normdaten}
          auswahl={[nulll, drei]}
        />
      </TestContext>
    )
    expect(errorLog).not.toHaveBeenCalled()
  })

  it('renders label', () => {
    render(
      <TestContext>
        <label id={'hello_world'}>Marker</label>
        <NormdatenMehrfachAuswahl
          normdaten={normdaten}
          auswahl={[vier, fuenf]}
          aria-labelledby={'hello_world'}
        />
      </TestContext>
    )
    expect(screen.getByLabelText('Marker')).toBeVisible()
  })

  it('can label open button', () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl normdaten={normdaten} auswahl={[]} />
      </TestContext>
    )
    expect(
      screen.getByRole('button', { name: de.autocomplete.open_text })
    ).toBeVisible()
  })

  it('options render preferredName and gnd', async () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl normdaten={normdaten} auswahl={[]} />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.autocomplete.open_text })
    )
    normdaten.forEach(({ preferredName, gndIdentifier }) => {
      expect(
        screen.getByRole('option', {
          name: `${preferredName} ${gndIdentifier}`,
        })
      ).toBeVisible()
    })
  })

  it('can be limited', async () => {
    render(
      <TestContext>
        <NormdatenMehrfachAuswahl
          normdaten={normdaten}
          auswahl={[]}
          limit={2}
        />
      </TestContext>
    )
    await userEvent.click(
      screen.getByRole('button', { name: de.autocomplete.open_text })
    )
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })
})
