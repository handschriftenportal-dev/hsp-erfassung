import { render, screen } from '@testing-library/react'
import { AuswahlAnsicht } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/AuswahlAnsicht'
import { ThemenbereichDialogReducer } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Themenbereich Auswahl Ansicht', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogReducer(
    ThemenbereichDialogState.new('Zeitgenössischer Einband', 'BNDG'),
    {
      type: 'addBegriffe',
      payload: [
        { id: 'BNDG-M760' },
        { id: 'BNDG-M383' },
        { id: 'BNDG-C506' },
        { id: 'BNDG-B118' },
      ],
    }
  )

  it('renders selection in accessible role list', () => {
    render(
      <TestContext>
        <AuswahlAnsicht state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('renders begriffe in api in accessible role listitem', () => {
    render(
      <TestContext>
        <AuswahlAnsicht state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })
})
