import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { AuswahlAnsichtItem } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/AuswahlAnsichtItem'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Themenbereich Auswahl Ansicht Item', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const id = 'NORM-15d0ffbf-2df1-38b9-9a3a-ad51304eef6c'
  const item = { id }
  const begriff = api.begriff({ id })!
  const dispatch = jest.fn()

  it('renders with accessible role', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.getByRole('listitem')).toBeVisible()
  })

  it('renders translated label', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.getByText(begriff.label)).toBeVisible()
  })

  it('does not contain checkbox in readOnly mode', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={item}
          readOnly
        />
      </TestContext>
    )
    expect(screen.queryByRole('checkbox')).toBeNull()
  })

  it('does contain checkbox when not in readOnly mode', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={item}
          readOnly={false}
        />
      </TestContext>
    )
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('clicking checkbox triggers dispatch with removeBegriff', async () => {
    const dispatch = jest.fn()
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={item}
          readOnly={false}
        />
      </TestContext>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'removeBegriff',
      payload: id,
    })
  })

  it('items are checked by default', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('items can be unchecked', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          item={item}
          dispatch={dispatch}
          checked={false}
        />
      </TestContext>
    )
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders notwendige items in extra list', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={AuswahlItem.newFachbegriffItem(id, {
            notwendig: ['1', '2', '3'],
          })}
        />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
    expect(
      screen.getByText(de.subject_area_dialog.necessary_concepts)
    ).toBeVisible()
  })

  it('renders optionale items in extra list', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={AuswahlItem.newFachbegriffItem(id, {
            optional: ['1', '2', '3'],
          })}
        />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
    expect(
      screen.getByText(de.subject_area_dialog.optional_concepts)
    ).toBeVisible()
  })

  it('renders Einzelauswahlmengen in radiogroups', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={AuswahlItem.newFachbegriffItem(id, {
            einzelAuswahlMengen: [
              {
                id: 'menge1',
                elemente: [
                  'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
                  'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
                  'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
                ],
              },
              {
                id: 'menge2',
                elemente: [
                  'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
                  'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
                  'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
                ],
              },
            ],
          })}
        />
      </TestContext>
    )
    const groups = screen.queryAllByRole('radiogroup')
    expect(groups).toHaveLength(2)
    groups.forEach((group) => {
      expect(group).toBeVisible()
    })
  })

  it('renders Mehrfachauswahlmengen in role form', () => {
    render(
      <TestContext>
        <AuswahlAnsichtItem
          api={api}
          dispatch={dispatch}
          item={AuswahlItem.newFachbegriffItem(id, {
            mehrfachAuswahlMengen: [
              {
                id: 'menge1',
                elemente: [
                  'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
                  'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
                  'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
                ],
              },
              {
                id: 'menge2',
                elemente: [
                  'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
                  'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
                  'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
                ],
              },
            ],
          })}
        />
      </TestContext>
    )
    const groups = screen.getAllByRole('form')
    expect(groups).toHaveLength(2)
    groups.forEach((group) => {
      expect(group).toBeVisible()
    })
  })
})
