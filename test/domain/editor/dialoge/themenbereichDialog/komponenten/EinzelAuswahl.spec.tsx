import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { EinzelAuswahl } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/EinzelAuswahlMenge'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('EinzelAuswahl', () => {
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
    einzelAuswahlMengen: [menge],
  })
  const dispatch = jest.fn()

  it('empty menge does not render', () => {
    render(
      <TestContext>
        <EinzelAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={{ id: 'empty', elemente: [] }}
        />
      </TestContext>
    )
    expect(screen.queryByRole('radiogroup')).toBeNull()
  })

  it('item with beziehungen renders radiogroup', () => {
    render(
      <TestContext>
        <EinzelAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    expect(
      screen.getByRole('radiogroup', {
        name: de.subject_area_dialog.single_concept_select,
      })
    ).toBeVisible()
  })

  it('menge without selection renders error message as status', () => {
    render(
      <TestContext>
        <EinzelAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      de.subject_area_dialog.single_concept_select_error
    )
  })

  it('menge with one selected element does not render status', () => {
    const itemWithSelection = {
      ...item,
      beziehungen: {
        ...item.beziehungen,
        auswahl: new Set([menge.elemente[0]]),
      },
    }
    render(
      <TestContext>
        <EinzelAuswahl
          api={api}
          dispatch={dispatch}
          item={itemWithSelection}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('renders radio buttons', () => {
    render(
      <TestContext>
        <EinzelAuswahl
          api={api}
          dispatch={dispatch}
          item={item}
          begriffsMenge={menge}
        />
      </TestContext>
    )
    const radioButtons = screen.queryAllByRole('radio')
    expect(radioButtons).not.toHaveLength(0)
  })

  it.each(menge.elemente)(
    'selecting item %s dispatches selectFromMenge Action',
    async (id) => {
      const dispatch = jest.fn()
      render(
        <TestContext>
          <EinzelAuswahl
            api={api}
            dispatch={dispatch}
            item={item}
            begriffsMenge={menge}
          />
        </TestContext>
      )
      const radioButtons = screen.queryAllByRole('radio')
      const index = menge.elemente.indexOf(id)
      await userEvent.click(radioButtons[index])
      expect(dispatch).toHaveBeenCalledWith({
        type: 'selectFromMenge',
        payload: { item, menge, value: id },
      })
    }
  )
})
