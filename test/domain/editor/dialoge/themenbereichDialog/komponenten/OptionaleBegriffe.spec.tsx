import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { OptionaleBegriffe } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/OptionaleBegriffe'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Optionale Begriffe', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const optional = ['1', '2', '3']
  const item = AuswahlItem.newFachbegriffItem('xxx', { optional })
  const dispatch = jest.fn()

  it('item with empty optionale begriffe renders no list', () => {
    render(
      <TestContext>
        <OptionaleBegriffe
          api={api}
          dispatch={dispatch}
          item={AuswahlItem.newFachbegriffItem('xxx')}
        />
      </TestContext>
    )
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('item with notwendige begriffe renders list', () => {
    render(
      <TestContext>
        <OptionaleBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('item with optionale begriffe renders heading as first listitem', () => {
    render(
      <TestContext>
        <OptionaleBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    const [heading] = screen.queryAllByRole('listitem')!
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent(de.subject_area_dialog.optional_concepts)
  })

  it('item with optionale begriffe renders listitems', () => {
    render(
      <TestContext>
        <OptionaleBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(optional.length + 1)
  })

  it('clicking option begriffe dispatches event', async () => {
    const dispatch = jest.fn()
    render(
      <TestContext>
        <OptionaleBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    const checkboxes = screen.queryAllByRole('checkbox')
    await userEvent.click(checkboxes[0])
    expect(dispatch).toHaveBeenCalledWith({
      type: 'toggleBeziehungsAuswahl',
      payload: {
        id: '1',
        item,
      },
    })
  })
})
