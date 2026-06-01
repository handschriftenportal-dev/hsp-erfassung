import { render, screen } from '@testing-library/react'
import { BaumAuswahl } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/BaumAuswahl'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Themenbereich Baum Auswahl', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('renders thesauri as listitems', () => {
    render(
      <TestContext>
        <BaumAuswahl state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      einband.thesauri.length
    )
  })
})
