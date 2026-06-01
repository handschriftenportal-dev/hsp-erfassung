import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BegriffAuswahl } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/BegriffAuswahl'
import { ThemenbereichDialogState } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogState'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Themenbereich Begriff Auswahl', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const initialState = ThemenbereichDialogState.new(
    'Zeitgenössischer Einband',
    'BNDG'
  )

  it('renders search textbox', () => {
    render(
      <TestContext>
        <BegriffAuswahl
          state={{ ...initialState, suche: 'xxx' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.getByRole('textbox')).toBeVisible()
  })

  it('renders list if suche has hits', () => {
    render(
      <TestContext>
        <BegriffAuswahl
          state={{ ...initialState, suche: 'BNDG' }}
          dispatch={jest.fn()}
          api={api}
        />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('renders list if suche is empty', () => {
    render(
      <TestContext>
        <BegriffAuswahl state={initialState} dispatch={jest.fn()} api={api} />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('input in triggers setSuche event', async () => {
    const dispatch = jest.fn()
    render(
      <TestContext>
        <BegriffAuswahl state={initialState} dispatch={dispatch} api={api} />
      </TestContext>
    )
    await userEvent.type(screen.getByRole('textbox'), 'x')
    expect(dispatch).toHaveBeenCalled()
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'setSuche',
      payload: 'x',
    })
  })
})
