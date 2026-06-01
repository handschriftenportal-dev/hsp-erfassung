import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { MehrfachAuswahl } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/MehrfachAuswahlMenge'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('MehrfachAuswahl', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const menge = {
    id: 'yyy',
    elemente: [
      'NORM-54b7d37c-ad43-3e69-8094-efa754004f57',
      'NORM-b2fefc2d-d79c-3221-b46c-8faebe8bb6eb',
      'NORM-2ce4fc63-ba6e-3026-a440-62a4b8e9642f',
    ],
  }
  const item = AuswahlItem.newFachbegriffItem('xxx', {
    mehrfachAuswahlMengen: [menge],
  })
  const dispatch = jest.fn()

  it('empty menge does not render', () => {
    render(
      <TestContext>
        <MehrfachAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={{ id: 'empty', elemente: [] }}
        />
      </TestContext>
    )
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('renders with beziehungen renders headline in form', () => {
    render(
      <TestContext>
        <MehrfachAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('form', {
        name: de.subject_area_dialog.multi_concept_select,
      })
    ).toBeVisible()
  })

  it('renders error message when not selected', () => {
    render(
      <TestContext>
        <MehrfachAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      de.subject_area_dialog.multi_concept_select_error
    )
  })

  it.each([
    new Set([menge.elemente[0]]),
    new Set([menge.elemente[0], menge.elemente[2]]),
  ])('menge selected auswahl %p does not render error message', (auswahl) => {
    const itemWithSelection = {
      ...item,
      beziehungen: {
        ...item.beziehungen,
        auswahl,
      },
    }
    render(
      <TestContext>
        <MehrfachAuswahl
          api={api}
          dispatch={dispatch}
          item={itemWithSelection}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('renders checkboxes', () => {
    render(
      <TestContext>
        <MehrfachAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    const checkboxes = screen.queryAllByRole('checkbox')
    expect(checkboxes).not.toHaveLength(0)
  })

  it.each(menge.elemente)(
    'selecting item %s dispatches toggleBeziehungsAuswahl Action',
    async (id) => {
      const dispatch = jest.fn()
      render(
        <TestContext>
          <MehrfachAuswahl
            api={api}
            dispatch={dispatch}
            item={item}
            begriffsMenge={menge}
          />
        </TestContext>
      )
      const checkboxes = screen.queryAllByRole('checkbox')
      const index = menge.elemente.indexOf(id)
      await userEvent.click(checkboxes[index])
      expect(dispatch).toHaveBeenCalledWith({
        type: 'toggleBeziehungsAuswahl',
        payload: { item, id },
      })
    }
  )
})
