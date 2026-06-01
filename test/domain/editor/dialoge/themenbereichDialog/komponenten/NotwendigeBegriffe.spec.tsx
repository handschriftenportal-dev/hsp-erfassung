import { render, screen } from '@testing-library/react'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import { NotwendigeBegriffe } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotwendigeBegriffe'
import { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'
import de from 'src/infrastructure/i18n/translation_de.json'
import subjectArea from 'test/infrastructure/normdaten/fixtures/einband.json'
import { TestContext } from 'test/TestContext'

describe('Notwendige Begriffe', () => {
  const einband = subjectArea.data.findSubjectArea
  const api = ThemenbereicheAPI.new('de')
  api.addSubjectArea(einband)
  const notwendig = ['1', '2', '3']
  const item = AuswahlItem.newFachbegriffItem('xxx', { notwendig })
  const dispatch = jest.fn()

  it('item with empty notwendige beziehungen renders no list', () => {
    render(
      <TestContext>
        <NotwendigeBegriffe
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
        <NotwendigeBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.getByRole('list')).toBeVisible()
  })

  it('item with notwendige begriffe renders heading as first listitem', () => {
    render(
      <TestContext>
        <NotwendigeBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    const [heading] = screen.queryAllByRole('listitem')!
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent(de.subject_area_dialog.necessary_concepts)
  })

  it('item with notwendige begriffe renders listitems', () => {
    render(
      <TestContext>
        <NotwendigeBegriffe api={api} dispatch={dispatch} item={item} />
      </TestContext>
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(notwendig.length + 1)
  })
})
