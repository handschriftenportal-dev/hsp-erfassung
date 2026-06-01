import { render, screen } from '@testing-library/react'
import { BaumAuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/BaumAuswahlItem'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Themenbereich Baum-Auswahl Item', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const state = ThemenbereichDialogState.new('Zeitgenössischer Einband', 'BNDG')

  it('renders one list item for leaf', () => {
    const begriff = api.begriff({ notation: 'BNDG-G292' })!
    render(
      <TestContext>
        <BaumAuswahlItem
          begriff={begriff}
          state={state}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(1)
  })

  it('renders one list item plus list items for sublist for node', () => {
    const begriff = api.begriff({ notation: 'BNDG-G699' })!
    render(
      <TestContext>
        <BaumAuswahlItem
          begriff={begriff}
          state={state}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(6)
  })
})
